var mongodb = require('mongodb')
require('dotenv').config()
var MONGODB_URI = process.env.MONGODB_URI
if(process.env.NODE_ENV==="development"){
    MONGODB_URI = process.env.MONGODB_DEV_URI
}

class UserServices{

    static async getRegisteredEmails(){
       
        return new Promise(async (resolve, reject) => {
            try{
    
                console.log(' START getRegisteredEmails')
    
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("users");
                
    
                let users = await collection.find().toArray()

                const result = users.map( u => u.email)
                
    
                // console.log('result')
                // console.log(result)
    
                await client.close()
                resolve(result)
                       
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined')
                    await client.close()
                reject(error);
            }finally{
                console.log('END getRegisteredEmails')
            }
        }) 
    }
}

module.exports = UserServices