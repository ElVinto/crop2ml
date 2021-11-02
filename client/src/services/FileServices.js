const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}


class FileServices {

    //OK
    static sendZip = async (file, modelMetaDataPart) =>{
        
        return new Promise( (resolve, reject) => {
            
            try { 

                const formData = new FormData();
                formData.append(file.name, file );
                formData.append('tags', modelMetaDataPart.tags);
                formData.append('fileName', modelMetaDataPart.zipFileName);
                formData.append('packageName', modelMetaDataPart.packageName);
                formData.append('uploaderMail', modelMetaDataPart.uploaderMail);
                // const res = await axios.post('fileSystem-services/upload', formData, {
                //     headers: formData.getHeaders()
                // });

                axios.post(url+'files/uploadZip', formData, {
                    // headers: formData.getHeaders()
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( res =>{
                    console.log(' sendZip SUCCESS!!');

                    console.log(' receive ');
                    console.log(res.data);

                    resolve(res.data)
                })

            } catch (err) { 
                console.log(' sendZip FAILURE!!');
                console.error(err);
                reject(err);
            }
        })
    }

    /*static requestPackageTree (){
        return new Promise((resolve,reject)=>{
            try{
                axios.post(url + "files/packageTree").then(res => {
                    resolve(res.data) ;
                })
            }catch(err){
                console.log(' packageTree FAILURE!!');
                console.error(err);
                reject(err);
            }
        })

    }*/

    static dowloadZip(packageName){
        return new Promise(  (resolve, reject) => {
            console.log('START DOwnlod zip: '+packageName)

            // const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
            

            axios({
                method: 'post',
                url: url+'files/downloadZip',
                data: {packageName},
                responseType: 'stream'
            }).then( response => {
                const newpath = path.resolve(__dirname, 'packages', packageName+'.zip')
                console.log('download path: '+newpath )
                const writer = fs.createWriteStream(newpath)
                response.data.pipe(writer)
            
                
                writer.on('finish', resolve)
                writer.on('error', reject)
            })
          
            
        })
    }

    static downloadFile(serverFilePath){
        return new Promise(  (resolve, reject) => {
            try{
                axios({
                    method: 'post',
                    url: url+'files/downloadFile',
                    data: {serverFilePath},
                    responseType: 'blob'
                }).then( response => {

                    console.log(response)
                    console.log('END downloadFile: '+serverFilePath)

                    resolve(response.data)
                })
            }catch(err){
                console.log(' packageTree FAILURE!!');
                console.error(err);
                reject(err);
            }
        })
    }
    static downloadLargeFile(serverFilePath){
        return new Promise(  (resolve, reject) => {
            console.log('START Downloading file: '+serverFilePath)

            // const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
            

            
            axios({
                method: 'post',
                url: url+'files/downloadFile',
                data: {serverFilePath},
                responseType: 'stream'
            }).then( response => {
                
                let idxLastSeparator = serverFilePath.lastIndexOf("/")
                let folder = serverFilePath.slice(0,idxLastSeparator)
                let fileName = serverFilePath.slice(idxLastSeparator)

                const path = path.resolve(__dirname, folder, fileName )
                console.log('download path: '+path )
                const writer = fs.createWriteStream(path)
                response.data.pipe(writer)
            
                
                writer.on('finish', resolve)
                writer.on('error', reject)
            })
          
            
        })
    }
}


export default FileServices;
