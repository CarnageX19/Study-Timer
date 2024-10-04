import { Client, Databases, ID,Query } from "appwrite";
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

    getEmailKey = (email)=>{
        return email.replace(/[@.]/g, "-");
    }

    async createAccount(email,password)
    {
        const emailKey = this.getEmailKey(email)
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                emailKey,//email is document key
                {
                    email,
                    password,
                    records:""
                }
            )
            this.sync(emailKey)
        } catch (error) {
            console.log(`Unable to create account ${error}`)
            throw(error)
        }
    }

    async doesAccountExist(email) {
    
      const query = Query.equal("email",email)
      try {
      const documents = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [query]
      );
      return documents.total > 0 ? documents.documents[0] : null; // Return document if exists
    } catch (error) {
        console.log(`Unable to list documents ${error}`);
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
            throw new Error("User doesnt exists")
        }
    }

    async sync(emailKey)//writes record for the first time in database from local storage
    {
        const recordsString = JSON.stringify(localStorage.getItem("study-record"))
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                emailKey,
                {
                    records:recordsString
                }
            )
        } catch (error) {
            
        }
    }

    async addDuration(email,newRecord)
    {
        const emailKey = this.getEmailKey(email)
        console.log(`typeof newRecord: ${typeof newRecord}`)
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                emailKey,
                {
                    records:newRecord
                }
            )
        } catch (error) {
            console.log(`Unable to add new duration to the database ${error}`)
            throw error
        }
    }

    async syncLocalStorage(email) {
        const query = Query.equal("email", email);
        try {
          const documents = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [query]
          );
          
          const records = JSON.parse(documents.documents[0].records); // Parse the stringified JSON from the database
          const recordString = JSON.stringify(records); // Stringify the records object
      
          localStorage.setItem("study-record", recordString); // Store the stringified object in local storage
        } catch (error) {
          console.log(`Unable to list documents for local storage sync: ${error}`);
          throw error;
        }
      }
      
}

const appwriteService = new Service()
export default appwriteService