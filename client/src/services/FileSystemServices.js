const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}



class FileSystemServices{

    static sendFile = async (file) =>{
        
        return new Promise((resolve, reject) => {
            
            try { 

                const formData = new FormData();
                formData.append(file.name, file);
                // const res = await axios.post('fileSystem-services/upload', formData, {
                //     headers: formData.getHeaders()
                // });

                axios.post(url+'fileSystem-services/upload', formData, {
                    // headers: formData.getHeaders()
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( res =>{
                    console.log(' sendFile SUCCESS!!');
                    resolve(res)
                })

            } catch (err) { 
                console.log(' sendFile FAILURE!!');
                console.error(err);
                reject(err);
            }
        })

    }

    static sendZip = async (file) =>{
        
        return new Promise((resolve, reject) => {
            
            try { 

                const formData = new FormData();
                formData.append(file.name, file);
                // const res = await axios.post('fileSystem-services/upload', formData, {
                //     headers: formData.getHeaders()
                // });

                axios.post(url+'fileSystem-services/uploadZip', formData, {
                    // headers: formData.getHeaders()
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( res =>{
                    console.log(' sendZip SUCCESS!!');
                    resolve(res.data)
                })

            } catch (err) { 
                console.log(' sendZip FAILURE!!');
                console.error(err);
                reject(err);
            }
        })

    }

    static getPackageTree (){
        return new Promise((resolve,reject)=>{
            try{
                axios.post(url + "fileSystem-services/packageTree").then(res => {
                    resolve(res.data) ;
                })
            }catch(err){
                console.log(' packageTree FAILURE!!');
                console.error(err);
                reject(err);
            }
        })

    }
    static dowloadZip(packageName){
        return new Promise(  (resolve, reject) => {
            console.log('START DOwnlod zip: '+packageName)

            // const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
            

            axios({
                method: 'post',
                url: url+'fileSystem-services/downloadZip',
                data: {packageName},
                responseType: 'stream'
            }).then( response => {
                const path = path.resolve(__dirname, 'packages', packageName+'.zip')
                console.log('download path: '+path )
                const writer = fs.createWriteStream(path)
                response.data.pipe(writer)
            
                
                writer.on('finish', resolve)
                writer.on('error', reject)
            })
          
            
            
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
export default FileSystemServices;
