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
        const uniqueID = ID.unique()
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                {
                    userID: uniqueID,
                    records:{}
                }
            )
        } catch (error) {
            console.log(`Unable to create account ${error}`)
            throw(error)
        }
    }

}