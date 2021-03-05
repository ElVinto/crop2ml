import axios from 'axios'

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class JsonModelData{

    static getModelUnits = async () =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                // let body ={
                //     modelType: 'modelUnits',
                // }
                // axios.post(url + "mongodb-services/findAllJsonModelUnits", body).then(res => {
                //     resolve(res.data) ;
                // })
                axios.get(url + "mongodb-services/findAllJsonModelUnits").then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }


    static async getModelUnitById (modelid){
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    modelid: modelid,
                }
                axios.post(url + "mongodb-services/findJsonModelUnitById", body).then(res => {
                    resolve(res.data) ;
                })
                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }


    static async saveModelUnit (modelUnit){
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    modelUnit: modelUnit,
                }
                axios.post(url + "mongodb-services/saveJsonModelUnit", body).then(res => {
                    resolve(res.data) ;
                })
                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }

    static async deleteModelUnitById (modelid){
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    modelid: modelid,
                }
                axios.post(url + "mongodb-services/deleteJsonModelUnitById", body).then(res => {
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
