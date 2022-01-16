import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { getProfile } from '../../businessLogic/profile'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('getProfile')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing getProfile event', { event })

  const userId = getUserId(event)

  const item = await getProfile(userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item
    })
  }
}
