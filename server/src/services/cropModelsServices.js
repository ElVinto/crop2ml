let ModelUnit = require('../models/modelUnit')

class CropModelsServices{

    //TODO reuse for more complex search with or condition
    /*
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
    }*/

    //OK
    static async findAllModels(){
        return new Promise(async (resolve, reject) => {
            try{
                const result = await ModelUnit.find({})
                resolve(result)
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    //OK
    static async findAllModelPackageNames(){
        return new Promise(async (resolve, reject) => {
            try{
                const models = await this.getAllModelsMetaData()
                let result = []
                models.forEach(m =>{
                    if(!result.includes(m.metaData.packageName)){
                        result.push(m.metaData.packageName)
                    }
                })
                resolve(result)
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }
    
    static async getAllModelsMetaData(){
        return new Promise(async (resolve, reject) => {
            try{
                const result = await ModelUnit.find({}, {metaData: 1, _id: 0})
                resolve(result)
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }
}

module.exports = CropModelsServices