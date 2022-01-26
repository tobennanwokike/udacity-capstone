import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { getWalletTransactions } from '../../businessLogic/walletTransactions'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('getWalletTransactions')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing getWalletTransactions event', { event })

  const userId = getUserId(event)

  const items = await getWalletTransactions(userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      items
    })
  }
}