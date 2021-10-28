let ModelUnit = require('../models/modelUnit')

class CropModelsServices{

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
    
                console.log(' START getAllModels 1')
    
                /*const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    */
                //const collection = client.db("crop2ml").collection("models");

                ModelUnit.find({}, function(err, models){
                    if(err){
                        console.log(err)
                        resolve(err)
                    } else {
                        console.log(models)
                        resolve(models)
                    }
                })
                
    
                //const result = await collection.find({}).toArray()
                
    
                //await client.close()
                //resolve(result)
                       
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    static async findAllModelPackageNames(){
        
        return new Promise(async (resolve, reject) => {
            try{
    
                console.log(' START findAllModelPackageNames')
    
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("models");
                
                const metaDataPackageNames = await collection.find({}).project({"metaData.packageName":1 ,_id:0}).toArray()
                
 

                // remove duplicate packqge Names
                let result = []
                metaDataPackageNames.forEach(m =>{
                    if(!result.includes(m.metaData.packageName)){
                        result.push(m.metaData.packageName)
                    }
                })
                
    
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
                console.log('END findAllModelPackageNames')
            }
        }) 
    }
    
    static async getAllModelsMetaData(){
        return new Promise(async (resolve, reject) => {
            try{
                const result = await ModelUnit.find({}, {metaData:1})
                console.log(result)
                resolve(result)
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }
}
module.exports = CropModelsServices