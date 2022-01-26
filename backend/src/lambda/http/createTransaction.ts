import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { createTransaction } from '../../businessLogic/transactions'
import { CreateTransactionRequest } from '../../requests/CreateTransactionRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('createTransaction')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing createTransaction event', { event })

  const userId = getUserId(event)
  const newTransaction: CreateTransactionRequest = JSON.parse(event.body)

  const newItem = await createTransaction(userId, newTransaction)

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      item: newItem
    })
  }
}