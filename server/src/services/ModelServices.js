let Model = require('../models/ModelSchema')

class ModelServices{

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
    static async getAllModels(){
        return new Promise(async (resolve, reject) => {
            try{
                const result = await Model.find({})
                resolve(result)
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    //OK
    static async getAllModelsPackageNames(){
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
    
    //OK
    static async getAllModelsMetaData(){
        return new Promise(async (resolve, reject) => {
            try{
                const result = await Model.find({}, {metaData: 1, _id: 0})
                resolve(result)
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    //OK
    static async saveModel (jsonModel){
        return new Promise(async (resolve, reject) => {
            try{
                //const filter = {'Attributs.modelid': jsonModel.metaData.idValue}
                let filter = {}
                filter[`Attributs.${jsonModel.metaData.idProperty}`]= jsonModel.metaData.idValue
                const update = jsonModel
                const options = { upsert: true, returnNewDocument: true}
                var result = await Model.updateOne(filter,update,options)
                //CMZ comment
                /*if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                    result.value = jsonModel;
                }*/
                //result = JSON.parse(JSON.stringify(result))
                resolve(result)
                    
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    static async getModelById (modelid){
        return new Promise((resolve, reject) => {
            try{
                result = await Model.findOne({'Model.Attributs.modelid': modelid },{'_id':0, '__v':0}) //TODO CMZ : modelid ou id ?
                resolve(result)
            }catch (err) { 
                reject(err); 
            }
        })
    }

    static async deleteModelById (modelid){
        return new Promise((resolve, reject) => {
            try{
                result = await Model.findOneAndDelete({'Attributs.modelid': modelid}).exec() //TODO CMZ : modelid ou id ?
                resolve(result)
            }catch (err) {
                console.log(err.message)
                reject(err); 
            }
        })   
    }

    //OK. But saved keywords in keywords collection are never retrieved for now, so useless.
    static async saveKeywords (modelMetaData){
        return new Promise(async (resolve, reject) => {
            try{
                modelMetaData.keywords.forEach(async(k) => {
                    const filter = {keyword: k, modelIdValue: modelMetaData.idValue }
                    const update = {keyword: k, modelIdValue: modelMetaData.idValue }
                    const options = { upsert: true, returnNewDocument: true}
                    
                    await Keyword.updateOne(filter,update,options)
                    //CMZ comment
                    /*if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                        result.value = replacement;
                    }*/
                })
                resolve()    
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }
}

module.exports = ModelServices