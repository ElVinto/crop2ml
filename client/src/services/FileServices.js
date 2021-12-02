const FormData = require('form-data');
const axios = require('axios');
import config from '../config'

var url = `http://${config.server.host}:${config.server.port}/`;


class FileServices {

    static async downloadZip(zipName){
        return new Promise((resolve, reject) => {
            try { 
                axios.get(url + "files/downloadZip", {params:{zipName: zipName}, responseType: 'blob'}).then(res => {
                    const downloadUrl = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.setAttribute('download', zipName); //any other extension
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    resolve();
                })
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }

    //OK
    static sendZip = async (file, modelMetaDataPart) =>{
        
        return new Promise( (resolve, reject) => {
            
            try { 

                const formData = new FormData();
                formData.append(file.name, file);
                formData.append('metaData', JSON.stringify(modelMetaDataPart));

                axios.post(url+'files/uploadZip', formData, {
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
}


export default FileServices;
