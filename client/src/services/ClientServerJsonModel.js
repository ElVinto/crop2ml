const axios = require('axios');

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class ClientServerJsonModel{


    static findJsonModelsBySearchWords = async (searchWords) =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                let body ={
                    searchWords: searchWords,
                }
                
                axios.post(url + "JsonModelDBRoutes/findJsonModelsBySearchWords",body).then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }

    static findAllJsonModels = async () =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                axios.post(url + "JsonModelDBRoutes/findAllJsonModels").then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }

    static findAllKeywords = async () =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                // let body ={
                //     modelType: 'modelUnits',
                // }
                // axios.post(url + "mongodb-services/findAllJsonModels", body).then(res => {
                //     resolve(res.data) ;
                // })
                axios.post(url + "JsonModelDBRoutes/findAllKeywords").then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }

    static requestModelTree (){
        return new Promise((resolve,reject)=>{
            try{
                axios.post(url + "JsonModelDBRoutes/modelTree").then(res => {
                    resolve(res.data) ;
                })
            }catch(err){
                console.log(' modelTree FAILURE!!');
                console.error(err);
                reject(err);
            }
        })

    }
}

export default ClientServerJsonModel