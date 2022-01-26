import 'source-map-support/register'

import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { WalletTransactionItem } from '../models/WalletTransactionItem'
import { createLogger } from '../utils/logger'

const logger = createLogger('transactionsAccess')

const AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

export class WalletTransactionsAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly walletTransactionsTable = process.env.WALLET_TRANSACTIONS_TABLE,
    private readonly walletTransactionsByUserIndex = process.env.WALLET_TRANSACTIONS_BY_USER_INDEX
  ) {}

  async walletTransactionItemExists(walletTransactionId: string): Promise<boolean> {
    const item = await this.getWalletTransactionItem(walletTransactionId)
    return !!item
  }

  async getWalletTransactionItems(userId: string): Promise<WalletTransactionItem[]> {
    logger.info(`Getting all wallet transactions for user ${userId} from ${this.walletTransactionsTable}`)

    const result = await this.docClient.query({
      TableName: this.walletTransactionsTable,
      IndexName: this.walletTransactionsByUserIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    const items = result.Items

    logger.info(`Found ${items.length} wallet transactions for user ${userId} in ${this.walletTransactionsTable}`)

    return items as WalletTransactionItem[]
  }

  async getWalletTransactionItem(walletTransactionId: string): Promise<WalletTransactionItem> {
    logger.info(`Getting transaction ${walletTransactionId} from ${this.walletTransactionsTable}`)

    const result = await this.docClient.get({
      TableName: this.walletTransactionsTable,
      Key: {
        walletTransactionId
      }
    }).promise()

    const item = result.Item

    return item as WalletTransactionItem
  }

  async createWalletTransactionItem(walletTransactionItem: WalletTransactionItem) {
    logger.info(`Putting transaction ${walletTransactionItem.walletTransactionId} into ${this.walletTransactionsTable}`)

    await this.docClient.put({
      TableName: this.walletTransactionsTable,
      Item: walletTransactionItem,
    }).promise()
  }

  

}