const axios = require('axios');

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class ModelServices{

    // TODO reuse for more complex search with or condition
    /*static findJsonModelsBySearchWords = async (searchWords) =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    searchWords: searchWords,
                }
                
                axios.post(url + "cropmodels/findJsonModelsBySearchWords",body).then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }*/

    //OK
    static getAllModels = async () =>{
        return new Promise((resolve, reject) => {
            try { 
                axios.post(url + "models/getAllModels").then(res => {
                    resolve(res.data) ;
                })
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }

    //OK
    static getAllModelsPackageNames = async () =>{
        return new Promise((resolve, reject) => {
            try { 
                axios.get(url + "models/getAllModelsPackageNames").then(res => {
                    resolve(res.data) ;
                })
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }

    /*static findAllKeywords = async () =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                // let body ={
                //     modelType: 'modelUnits',
                // }
                // axios.post(url + "models/getAllModels", body).then(res => {
                //     resolve(res.data) ;
                // })
                axios.post(url + "cropmodels/findAllKeywords").then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }*/

    //OK
    static getModelsTree (){
        return new Promise((resolve,reject)=>{
            try{
                axios.post(url + "models/getModelsTree").then(res => {
                    resolve(res.data) ;
                })
            }catch(err){
                console.log(' modelTree FAILURE!!');
                console.error(err);
                reject(err);
            }
        })
    }

    static async getModelById (modelid){
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    modelid: modelid,
                }
                axios.post(url + "models/getModelById", body).then(res => {
                    resolve(res.data) ;
                })
                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }

    static async saveModel (modelUnit){
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    modelUnit: modelUnit,
                }
                axios.post(url + "models/saveModel", body).then(res => {
                    resolve(res.data) ;
                })
                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }

    static async deleteModelById (modelid){
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    modelid: modelid,
                }
                axios.post(url + "models/deleteModelById", body).then(res => {
                    resolve(res.data) ;
                })
                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }
}

export default ModelServices