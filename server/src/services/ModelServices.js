let Model = require('../models/ModelSchema')

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
        return new Promise(async (resolve, reject) => {
            try{
                var result = await Model.findOne({'Model.Attributs.modelid': modelid },{'_id':0, '__v':0}) //TODO CMZ : modelid ou id ?
                resolve(result)
            }catch (err) { 
                reject(err); 
            }
        })
    }

    static async deleteModelById (modelid){
        return new Promise(async (resolve, reject) => {
            try{
                var result = await Model.findOneAndDelete({'Attributs.modelid': modelid}).exec() //TODO CMZ : modelid ou id ?
                resolve(result)
            }catch (err) {
                console.log(err.message)
                reject(err); 
            }
        })   
    }
}

module.exports = ModelServices