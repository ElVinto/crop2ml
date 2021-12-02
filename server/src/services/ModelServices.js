let { Model } = require('../models/ModelSchema')
FileServices = require('./FileServices')
var path = require('path');

class ModelServices{

    //OK
    static async getAllModels(){
        return new Promise(async (resolve, reject) => {
            try{
                const result = await Model.find({}, {_id: 0})
                resolve(result)
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    //OK
    static async saveModel (model, usermail){
        return new Promise(async (resolve, reject) => {
            try{
                const filter = {'id': model.id}
                var oldModel = await Model.findOne(filter)
                let oldContributors = []
                let canSave = false
                if(!oldModel){
                    canSave = true
                } else {
                    oldContributors = oldModel.administratorsMails.concat(oldModel.editorsMails)
                    canSave = oldContributors.includes(usermail)
                }

                if (canSave){
                    const update = model
                    const options = { upsert: true, new: true, rawResult: true, useFindAndModify: false}
                    var res = await Model.findOneAndUpdate(filter,update,options)
                    if (res.ok == 1){
                        let newModel = res.value
                        this.updateRoles(oldModel, newModel, usermail)
                        resolve({success: true, model: newModel})
                    } else {
                        resolve({success: false})
                    }
                } else {
                    resolve({success: false})
                }
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    static async updateRoles(oldModel, newModel){
        let addedEditors = []
        let removedEditors = []
        let addedAdmin = []
        let removedAdmin = []
        if (!oldModel){
            addedEditors = newModel.editorsMails
            addedAdmin = newModel.administratorsMails
        } else {
            for (let u of newModel.editorsMails){
                if (!oldModel.editorsMails.includes(u)){
                    addedEditors.push(u)
                }
            }
            for (let u of oldModel.editorsMails){
                if (!newModel.editorsMails.includes(u)){
                    removedEditors.push(u)
                }
            }
            for (let u of newModel.administratorsMails){
                if (!oldModel.administratorsMails.includes(u)){
                    addedAdmin.push(u)
                }
            }
            for (let u of oldModel.administratorsMails){
                if (!newModel.administratorsMails.includes(u)){
                    removedAdmin.push(u)
                }
            }

            for (let u of removedEditors) {
                await UserServices.deleteRole(u, newModel.id,)
            }
            for (let u of removedAdmin) {
                await UserServices.deleteRole(u, newModel.id,)
            }
            for (let u of addedEditors) {
                await UserServices.addRole(u, newModel.id, "editor")
            }
            for (let u of addedAdmin) {
                await UserServices.addRole(u, newModel.id, "administrator")
            }
        }

        // Notif users by mail
        let addedContributors = addedAdmin.concat(addedEditors)
        addedContributors=[...new Set(addedContributors)] //to remove duplicates
        addedContributors.forEach (async(contrib) => {
            await UserServices.notifyContributor(contrib, newModel.id)
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