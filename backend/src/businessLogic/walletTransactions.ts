import 'source-map-support/register'

import * as uuid from 'uuid'

import { WalletTransactionsAccess } from '../dataLayer/WalletTransactionsAccess'
import { WalletTransactionItem } from '../models/WalletTransactionItem'
import { CreateWalletTransactionRequest } from '../requests/CreateWalletTransactionRequest'
import { createLogger } from '../utils/logger'


const logger = createLogger('walletTransactions')

const walletTransactionsAccess = new WalletTransactionsAccess()

export async function getWalletTransactions(userId: string): Promise<WalletTransactionItem[]> {
  logger.info(`Retrieving all wallet transactions for user ${userId}`, { userId })

  return await walletTransactionsAccess.getWalletTransactionItems(userId)
}

export async function createWalletTransaction(userId: string, createWalletTransactionRequest: CreateWalletTransactionRequest): Promise<WalletTransactionItem> {
  const walletTransactionId = uuid.v4()

  const newItem: WalletTransactionItem = {
    userId,
    walletTransactionId,
    createdAt: new Date().toISOString(),
    ...createWalletTransactionRequest
  }

  logger.info(`Creating wallet transaction ${walletTransactionId} for user ${userId}`, { userId, walletTransactionId, walletTransactionItem: newItem })

  await walletTransactionsAccess.createWalletTransactionItem(newItem)

  return newItem
}