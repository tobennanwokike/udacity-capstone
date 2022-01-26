import 'source-map-support/register'

import * as uuid from 'uuid'

import { ProfileAccess } from '../dataLayer/ProfileAccess'
import { ProfileStorage } from '../dataLayer/ProfileStorage'
import { ProfileItem } from '../models/ProfileItem'
import { ProfileUpdate } from '../models/ProfileUpdate'
import { CreateProfileRequest } from '../requests/CreateProfileRequest'
import { UpdateProfileRequest } from '../requests/UpdateProfileRequest'
import { createLogger } from '../utils/logger'

const logger = createLogger('profile')

const profileAccess = new ProfileAccess()
const profileStorage = new ProfileStorage()

export async function getProfile(userId: string): Promise<ProfileItem> {
  logger.info(`Retrieving profile for ${userId}`, { userId })

  return await profileAccess.getProfileByUser(userId)
}

export async function createProfile(userId: string, createProfileRequest: CreateProfileRequest): Promise<ProfileItem> {
    //check if the user exists from their userId
    const user = await profileAccess.getProfileByUser(userId)
    if(user){
        return user
    }

  const profileId = uuid.v4()

  const newItem: ProfileItem = {
    userId,
    profileId,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    walletBalance: 100000,
    imageUrl: null,
    ...createProfileRequest
  }

  logger.info(`Creating profile ${profileId} for user ${userId}`, { userId,profileId, todoItem: newItem })

  await profileAccess.createProfileItem(newItem)

  return newItem
}

export async function updateProfile(userId: string, profileId: string, updateProfileRequest: UpdateProfileRequest) {
  logger.info(`Updating profile ${profileId} for user ${userId}`, { userId, profileId, profileUpdate: updateProfileRequest })

  const item = await profileAccess.getProfileItem(profileId)

  if (!item)
    throw new Error('Profile not found')  // FIXME: 404?

  if (item.userId !== userId) {
    logger.error(`User ${userId} does not have permission to update this profile ${profileId}`)
    throw new Error('User is not authorized to update item')  // FIXME: 403?
  }

  await profileAccess.updateProfileItem(profileId, updateProfileRequest as ProfileUpdate)
}

export async function deleteProfile(userId: string, profileId: string) {
  logger.info(`Deleting profile ${profileId} for user ${userId}`, { userId, profileId })

  const item = await profileAccess.getProfileItem(profileId)

  if (!item)
    throw new Error('Item not found')  // FIXME: 404?

  if (item.userId !== userId) {
    logger.error(`User ${userId} does not have permission to delete profile ${profileId}`)
    throw new Error('User is not authorized to delete item')  // FIXME: 403?
  }

  await profileAccess.deleteProfileItem(profileId)
}

export async function updateAttachmentUrl(userId: string, profileId: string, attachmentId: string) {
  logger.info(`Generating attachment URL for attachment ${attachmentId}`)

  const attachmentUrl = await profileStorage.getAttachmentUrl(attachmentId)

  logger.info(`Updating profile ${profileId} with attachment URL ${attachmentUrl}`, { userId, profileId })

  const item = await profileAccess.getProfileItem(profileId)

  if (!item)
    throw new Error('Item not found')  // FIXME: 404?

  if (item.userId !== userId) {
    logger.error(`User ${userId} does not have permission to update profile ${profileId}`)
    throw new Error('User is not authorized to update item')  // FIXME: 403?
  }

  await profileAccess.updateAttachmentUrl(profileId, attachmentUrl)
}

export async function generateUploadUrl(attachmentId: string): Promise<string> {
  logger.info(`Generating upload URL for attachment ${attachmentId}`)

  const uploadUrl = await profileStorage.getUploadUrl(attachmentId)

  return uploadUrl
}
