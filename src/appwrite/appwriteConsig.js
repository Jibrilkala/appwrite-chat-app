import { Client, Account, Databases } from 'appwrite';

const client = new Client()

client.setEndpoint('http://localhost/v1').setProject('PROJECT ID') // Set your Appwrite project ID and endpoint

export const account = new Account(client)

export const databases = new Databases(client, 'Database ID') // Set your Appwrite database ID