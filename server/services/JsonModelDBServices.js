var mongodb = require('mongodb')
require('dotenv').config()
var MONGODB_URI = process.env.MONGODB_URI
if(process.env.NODE_ENV==="development"){
    MONGODB_URI = process.env.MONGODB_DEV_URI
}

class JsonModelDBServices{

    static async saveModel (jsonModel){
        console.log('saveJsonModel')
        return new Promise(async (resolve, reject) => {
            try{
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("models");
                
                // const modelidProperty = typeof jsonModel.Attributs.modelid === 'undefined'? "id" : "modelid"
                // const modelid =  typeof jsonModel.Attributs.modelid === 'undefined'? jsonModel.Attributs.id : jsonModel.Attributs.modelid
    
    
                let filter ={}
                filter[`Attributs.${jsonModel.metaData.idProperty}`]= jsonModel.metaData.idValue
    
                const replacement = jsonModel
                const options = { upsert: true, returnNewDocument: true}
    
                console.log("insert or replace :  ")
                console.log(filter)
    
                var result = await collection.findOneAndReplace(filter,replacement,options)
    
                if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                    result.value = jsonModel;
                }
                
                result = JSON.parse(JSON.stringify(result))
    
                console.log('result')
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
    static async saveKeywords (modelMetaData){
        console.log('saveJsonKeywords')
        console.log(modelMetaData)
    
        return new Promise(async (resolve, reject) => {
            try{
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                // console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("keywords");
                
                for(k of modelMetaData.keywords){
                    const filter = {keyword: k, modelIdValue: modelMetaData.idValue }
                    const replacement = {keyword: k, modelIdValue: modelMetaData.idValue }
                    const options = { upsert: true, returnNewDocument: true}
                    var result = await collection.findOneAndReplace(filter,replacement,options)
                    if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                        result.value = replacement;
                    }
                    console.log('insert : ')
                    console.log(replacement)
                    // console.log(result)
                }
    
                await client.close()
                resolve()
                       
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined')
                    await client.close()
                reject(error);
            }
        }) 
      
    }
    
    static async findJsonModelsBySearchWords(searchWords){
        
        return new Promise(async (resolve, reject) => {
            try{
    
                console.log(' START findJsonModelsBySearchWords')
    
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const modelsCollection = client.db("crop2ml").collection("models");
                
                const orConditions = searchWords.map( searchWord => { return {'metaData.keywords' : searchWord } })
                
                const filterExpr = {'$or':  orConditions }

                // console.log('filterExpr')
                // console.log(filterExpr)

                const cursorArray = await modelsCollection.find(filterExpr).project({'metaData.idValue':1}).toArray()
                const result = cursorArray.map( obj => obj.metaData.idValue)

    

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
                console.log('END findJsonModelsBySearchWords')
            }
        }) 
    }

    static async findAllModels(){
        
        return new Promise(async (resolve, reject) => {
            try{
    
                console.log(' START getAllModels')
    
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("models");
                
    
                const result = await collection.find({}).toArray()
                
    
                console.log('result')
                console.log(result)
    
                await client.close()
                resolve(result)
                       
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined')
                    await client.close()
                reject(error);
            }finally{
                console.log('END getAllModels')
            }
        }) 
    }
    
    static async getAllModelsMetaData(){
        
        return new Promise(async (resolve, reject) => {
            try{
    
                console.log(' START getAllModelsMetaData')
    
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("models");
                
    
                const result = await collection.find({}).project({metaData:1}).toArray()
                
    
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
                console.log('END getAllModelsMetaData')
            }
        }) 
    }
}
module.exports = JsonModelDBServices