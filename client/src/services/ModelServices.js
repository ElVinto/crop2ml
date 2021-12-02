const axios = require('axios');
import config from '../config'

var url = `http://${config.server.host}:${config.server.port}/`;

class ModelServices{

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

    static async saveModel (model, user){
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    model: model,
                    user: user
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

    //OK
    static async deleteModelById (modelid, version, user){
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    modelid: modelid,
                    version: version,
                    user: user
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