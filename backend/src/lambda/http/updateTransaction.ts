import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { updateTransaction } from '../../businessLogic/transactions'
import { UpdateTransactionRequest } from '../../requests/UpdateTransactionRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('updateTransaction')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing updateTransaction event', { event })

  const userId = getUserId(event)
  const transactionId = event.pathParameters.transactionId
  const updatedTransaction: UpdateTransactionRequest = JSON.parse(event.body)

  await updateTransaction(userId, transactionId, updatedTransaction)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}