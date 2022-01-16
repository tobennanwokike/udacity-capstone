import 'source-map-support/register'

import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { ProfileItem } from '../models/ProfileItem'
import { ProfileUpdate } from '../models/ProfileUpdate'
import { createLogger } from '../utils/logger'

const logger = createLogger('profileAccess')

const AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

export class ProfileAccess {

  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly profileTable = process.env.PROFILE_TABLE,
    private readonly profileByUserIndex = process.env.PROFILE_BY_USER_INDEX
  ) {}

  async profileItemExists(profileId: string): Promise<boolean> {
    const item = await this.getProfileItem(profileId)
    return !!item
  }

  async getProfileByUser(userId: string): Promise<ProfileItem> {
    logger.info(`Getting the profile for user ${userId} from ${this.profileTable}`)

    const result = await this.docClient.query({
      TableName: this.profileTable,
      IndexName: this.profileByUserIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    const item = result.Items[0]

    logger.info(`Found ${item.length} profile for user ${userId} in ${this.profileTable}`)

    return item as ProfileItem
  }

  async getProfileItem(profileId: string): Promise<ProfileItem> {
    logger.info(`Getting profile ${profileId} from ${this.profileTable}`)

    const result = await this.docClient.get({
      TableName: this.profileTable,
      Key: {
        profileId
      }
    }).promise()

    const item = result.Item

    return item as ProfileItem
  }

  async createProfileItem(profileItem: ProfileItem) {
    logger.info(`Putting profile ${profileItem.profileId} into ${this.profileTable}`)


    await this.docClient.put({
      TableName: this.profileTable,
      Item: profileItem,
    }).promise()
  }

  async updateProfileItem(profileId: string, profileUpdate: ProfileUpdate) {
    logger.info(`Updating profile item ${profileId} in ${this.profileTable}`)

    await this.docClient.update({
      TableName: this.profileTable,
      Key: {
        profileId
      },
      UpdateExpression: 'set #walletBalance = :walletBalance, modifiedAt = :modifiedAt',
      ExpressionAttributeNames: {
        "#walletBalance": "walletBalance"
      },
      ExpressionAttributeValues: {
        ":walletBalance": profileUpdate.walletBalance,
        ":modifiedAt": profileUpdate.modifiedAt
      }
    }).promise()   
  }

  async deleteProfileItem(profileId: string) {
    logger.info(`Deleting profile item ${profileId} from ${this.profileTable}`)

    await this.docClient.delete({
      TableName: this.profileTable,
      Key: {
        profileId
      }
    }).promise()    
  }

  async updateAttachmentUrl(profileId: string, attachmentUrl: string) {
    logger.info(`Updating attachment URL for profile ${profileId} in ${this.profileTable}`)

    await this.docClient.update({
      TableName: this.profileTable,
      Key: {
        profileId
      },
      UpdateExpression: 'set imageUrl = :imageUrl',
      ExpressionAttributeValues: {
        ':imageUrl': attachmentUrl
      }
    }).promise()
  }

}
