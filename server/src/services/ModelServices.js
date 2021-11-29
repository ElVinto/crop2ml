let { Model } = require('../models/ModelSchema')

class ModelServices{

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
    /*static async saveModel (model){
        return new Promise(async (resolve, reject) => {
            try{
                const filter = {'Attributs.id': model.Attributs.id, 'Attributs.version': model.Attributs.version}
                const update = model
                const options = { upsert: true, returnNewDocument: true}
                var result = await Model.updateOne(filter,update,options)
                //result = JSON.parse(JSON.stringify(result))
                resolve(result)
                    
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }*/

    static async saveModel (model){
        return new Promise(async (resolve, reject) => {
            try{
                const filter = {'id': model.id}
                const update = model
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

    //OK
    /*static async checkModelAndVersionExists (model){
        return new Promise(async (resolve, reject) => {
            try{
                let filter = {'Attributs.id': model.Attributs.id, 'Attributs.version': model.Attributs.version}
                modelAndVersionAlreadyExists = await Model.exists(filter)
                resolve(modelAlreadyExists)
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }*/

    static async checkModelAndVersionExists (model){
        return new Promise(async (resolve, reject) => {
            try{
                let filter = {'id': model.Attributs.id, 'versions': model.Attributs.version}
                modelAndVersionAlreadyExists = await Model.exists(filter)
                resolve(modelAlreadyExists)
            }catch(error){
                console.log(error)
                reject(error);
            }
        })
    }

    static async getModelById (modelid){
        return new Promise(async (resolve, reject) => {
            try{
                var result = await Model.findOne({'Attributs.id': modelid },{'_id':0, '__v':0})
                resolve(result)
            }catch (err) { 
                reject(err); 
            }
        })
    }

    static async deleteModelById (modelid){
        return new Promise(async (resolve, reject) => {
            try{
                var result = await Model.findOneAndDelete({'Attributs.id': modelid}).exec()
                resolve(result)
            }catch (err) {
                console.log(err.message)
                reject(err); 
            }
        })   
    }
}

module.exports = ModelServices