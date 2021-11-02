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
    static async findAllModels(){
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

    static async deleteJsonModelById (modelid){

        return new Promise((resolve, reject) => {
            try{
                const mongoose = require('mongoose')
                mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
                const db = mongoose.connection;
                
                db.on('error', console.error.bind(console, 'connection error:'));
    
                db.once('open', async function(){
    
                    console.log(`succesful connection to ${MONGODB_HOST}` )
    
                    console.log(`delete : {'Model.Attributs.modelid': ${modelid} } `)
                    result = await Model.findOneAndDelete({'Model.Attributs.modelid': modelid}).exec()
    
                    result = JSON.parse(JSON.stringify(result))
                    
                    db.close();
    
                    console.log(`succesful end connection to ${MONGODB_HOST}` )
    
                    resolve(result)
                });
                
            }catch (err) {
                console.log(err.message)
                reject(err); 
            }
        })   
    }

    static async deleteJsonModel (model_name){

        return new Promise((resolve, reject) => {
            try{
                const mongoose = require('mongoose')
                mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
                const db = mongoose.connection;
                
                db.on('error', console.error.bind(console, 'connection error:'));
    
                db.once('open', async function(){
    
                    console.log(`succesful connection to ${MONGODB_HOST}` )
    
                    console.log(`delete : {'Model.Attributs.name': ${model_name} } `)
                    result = await Model.findOneAndDelete({'Model.Attributs.name': model_name}).exec()
                    
    
                    result = JSON.parse(JSON.stringify(result))
                    
                    db.close();
    
                    console.log(`succesful end connection to ${MONGODB_HOST}` )
    
                    resolve(result)
                });
                
            }catch (err) {
                console.log(err.message)
                reject(err); 
            }
        })   
    }
}

module.exports = ModelServices