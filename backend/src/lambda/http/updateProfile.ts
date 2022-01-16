import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { updateProfile } from '../../businessLogic/profile'
import { UpdateProfileRequest } from '../../requests/UpdateProfileRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('updateProfile')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing updateProfile event', { event })

  const userId = getUserId(event)
  const profileId = event.pathParameters.profileId
  const updatedProfile: UpdateProfileRequest = JSON.parse(event.body)

  await updateProfile(userId, profileId, updatedProfile)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: ''
  }
}
