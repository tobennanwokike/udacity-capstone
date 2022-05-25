import { CreateWalletTransactionRequest } from './../requests/CreateWalletTransactionRequest';
import { ProfileAccess } from './../dataLayer/ProfileAccess';
import { ProfileUpdate } from './../models/ProfileUpdate';
import { createWalletTransaction } from './walletTransactions';
import 'source-map-support/register'

import * as uuid from 'uuid'

import { TransactionsAccess } from '../dataLayer/TransactionsAccess'
import { TransactionItem } from '../models/TransactionItem'
import { TransactionUpdate } from '../models/TransactionUpdate'
import { CreateTransactionRequest } from '../requests/CreateTransactionRequest'
import { UpdateTransactionRequest } from '../requests/UpdateTransactionRequest'
import { createLogger } from '../utils/logger'


const logger = createLogger('transactions')

const transactionsAccess = new TransactionsAccess()
const profileAccess = new ProfileAccess()

export async function getTransactions(userId: string): Promise<TransactionItem[]> {
  logger.info(`Retrieving all transactions for user ${userId}`, { userId })

  return await transactionsAccess.getTransactionItems(userId)
}

export async function createTransaction(userId: string, createTransactionRequest: CreateTransactionRequest): Promise<TransactionItem> {
  const transactionId = uuid.v4()

  const newItem: TransactionItem = {
    userId,
    transactionId,
    createdAt: new Date().toISOString(),
    status: 'pending',
    accessToken: new Date().getTime(),
    remarks:'',
    ...createTransactionRequest
  }

  logger.info(`Creating transaction ${transactionId} for user ${userId}`, { userId, transactionId, transactionItem: newItem })

  await transactionsAccess.createTransactionItem(newItem)

  return newItem
}

export async function updateTransaction(userId: string, transactionId: string, updateTransactionRequest: UpdateTransactionRequest) {
  logger.info(`Updating transaction ${transactionId} for user ${userId}`, { userId, transactionId, transactionUpdate: updateTransactionRequest })

  const item = await transactionsAccess.getTransactionItem(transactionId)

  if (!item)
    throw new Error('Item not found')  // FIXME: 404?

  if (item.userId !== userId) {
    logger.error(`User ${userId} does not have permission to update transaction ${transactionId}`)
    throw new Error('User is not authorized to update item')  // FIXME: 403?
  }

  if (item.status !== "pending")
    throw new Error('Transaction has already been processed')  // FIXME: 400?

  //check if the user has enough funds in their wallet
  const user = await profileAccess.getProfileByUser(userId)
  if (user.walletBalance < item.amount)
    throw new Error('Insufficient balance to complete transaction')  // FIXME: 400?

  //debit the user's wallet balance
  const walletBalance = user.walletBalance - item.amount
  const updateProfile : ProfileUpdate = {
    walletBalance
  }
  await profileAccess.updateProfileItem(user.profileId, updateProfile)

  //save the transaction into the wallet transactions table
  const createWalletTransactionRequest :CreateWalletTransactionRequest = {
    amount: item.amount,
    walletBalance,
    category: 'debit',
    details: 'Payment for Airtime',
    transactionId: item.transactionId
  }
  await createWalletTransaction(userId, createWalletTransactionRequest)


  await transactionsAccess.updateTransactionItem(transactionId, updateTransactionRequest as TransactionUpdate, "Transaction was successful", "successful")
}
