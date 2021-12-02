let { Model } = require('../models/ModelSchema')
FileServices = require('./FileServices')
var path = require('path');

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
    static async getModelById (modelid){
        return new Promise(async (resolve, reject) => {
            try{
                var result = await Model.findOne({'id': modelid },{'_id':0, '__v':0})
                resolve(result)
            }catch (err) { 
                reject(err); 
            }
        })
    }

    //OK
    static async deleteModelById (modelid, version, user){
        return new Promise(async (resolve, reject) => {
            try{
                var model = await Model.findOne({'id': modelid})
                if (!model.administratorsMails.includes(user)){
                    resolve({success:false, model:model})
                    return
                }
                var indexVersion = model.versionsList.indexOf(version)
                if (indexVersion != -1){
                    let indexCompo = model.versions.findIndex(compo => compo.Attributs.version == version)
                    if (indexCompo != -1){
                        let compoModel = model.versions[indexCompo]
                        FileServices.deleteDir(path.join('data','packages',compoModel.metaData.packageName))
                        FileServices.deleteFile(path.join('data','zip',compoModel.metaData.zipName))
                        model.versions.splice(indexCompo,1)
                        model.versionsList.splice(indexVersion,1)
                    }
                    if(model.versionsList.length == 0){
                        await Model.deleteOne({'id': modelid}, function (err) {
                            if(err) console.log(err);
                            console.log("Successful deletion");
                            resolve({success:true, model:""})
                            return
                        });
                        
                    } else {
                        model.save()
                        resolve({success:true, model:model})
                        return
                    }
                } else {
                    resolve({success:false, model:model})
                    return
                }
            }catch (err) {
                console.log(err.message)
                reject(err); 
            }
        })   
    }
}

module.exports = ModelServices