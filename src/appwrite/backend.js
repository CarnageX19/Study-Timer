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

        this.databases = new Databases(this.client)
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

    async doesAccountExist(email) {
    try {
      const documents = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [`email=${email}`]
      );
      return documents.total > 0 ? documents.documents[0] : null; // Return document if exists
    } catch (error) {
      console.log(`Unable to list documents ${error}`);
      throw error;
    }
  }

    async authenticateUser(email,password)
    {
        const user = await this.doesAccountExist(email)
        if(user)
        {
            if(user.password === password)
            {
                return true
            }
            else
            {
                throw new Error("incorrect password")
            }
        }
        else
        {
            throw new Error("user doesnt exists")
        }
    }
}

const appwriteService = new Service()
export default appwriteService