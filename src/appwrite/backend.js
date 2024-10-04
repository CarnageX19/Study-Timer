import { Client, Databases, ID } from "appwrite";
import conf from "../global-configs/conf";

export class Service{
    client = new Client()
    databases

    constructor()
    {
        this.client
        .setEndpoint(conf.appwriteEndpoint)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(client)
    }

    async createAccount(email,password)
    {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                email,//email is document key
                {
                    email,
                    password:password,
                    records:{}
                }
            )
        } catch (error) {
            console.log(`Unable to create account ${error}`)
            throw(error)
        }
    }

    async doesAccountExist(email)
    {
        try {
            const documents = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    // Filter to check if the email matches
                    `email=${email}`
                ]
            )
            return documents.total > 0 //return true if account exists
        } catch (error) {
            console.log(`Unable to list documents ${error}`)
            throw error
        }
    }
}

const appwriteService = new Service()
export default appwriteService