import { Client, Databases } from 'appwrite'

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('68f0b93e003404ce2e31')

export const databases = new Databases(client)

export { client }
