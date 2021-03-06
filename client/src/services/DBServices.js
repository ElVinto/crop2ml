import axios from 'axios'

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class JsonModelData{

    static findAllJsonModels = async () =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                // let body ={
                //     modelType: 'modelUnits',
                // }
                // axios.post(url + "mongodb-services/findAllJsonModels", body).then(res => {
                //     resolve(res.data) ;
                // })
                axios.post(url + "JsonModelDBRoutes/findAllJsonModels").then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
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
                axios.post(url + "mongodb-services/findJsonModelById", body).then(res => {
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
                axios.post(url + "mongodb-services/saveJsonModel", body).then(res => {
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
                axios.post(url + "mongodb-services/deleteJsonModelById", body).then(res => {
                    resolve(res.data) ;
                })
                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }

    

}
export default JsonModelData;
