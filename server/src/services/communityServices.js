var mongodb = require('mongodb')
require('dotenv').config()
var MONGODB_URI = process.env.MONGODB_URI
if(process.env.NODE_ENV==="development"){
    MONGODB_URI = process.env.MONGODB_DEV_URI
}

class CommunityServices{


    static async saveCommunity (community){
        console.log('saveCommunity')
        console.log(community)

        for(const k in community){
            // if (community[k].includes(',')){
            //     community[k] = community[k].split(',')
            //     community[k].splice(0,1)
            //     if(community[k].length == 1 && community[k][0] === "" ){
            //         community[k] =[];
            //     }
            // }
            community[k] = JSON.parse(community[k])
        }

        console.log(community)

        return new Promise(async (resolve, reject) => {
            try{
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                // console.log(`succesful connection to ${MONGODB_URI}` )

                const collection = client.db("crop2ml").collection("communities");
                
                const filter = {name: community.name }
                const replacement = community
                const options = { upsert: true, returnNewDocument: true}
                var result = await collection.findOneAndReplace(filter,replacement,options)
                if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===true ){
                    result.value = replacement;
                }
                console.log('inserted : ')
                console.log(result)

                await client.close()
                resolve(result)
                    
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined')
                    await client.close()
                reject(error);
            }
        }) 
    
    }

    static async getAllCommunities(){
       
        return new Promise(async (resolve, reject) => {
            try{
    
                console.log(' START getAllCommunities')
    
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("communities");
                
    
                const result = await collection.find({}).toArray()
                
    
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
                console.log('END getAllCommunities')
            }
        }) 
    }

    
    

}
module.exports = CommunityServices