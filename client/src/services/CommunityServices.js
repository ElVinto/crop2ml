const axios = require('axios');
import config from '../config'

var url = `http://${config.server.host}:${config.server.port}/`;

class CommunityServices{

    static createCommunity = async (file, communityInfo) =>{
        return new Promise((resolve, reject) => {
            try { 
                const formData = new FormData();
                formData.append("picture", file);

                for(const k in communityInfo){
                    formData.append(k, JSON.stringify(communityInfo[k]))
                }
                
                axios.post(url+'community/createCommunity', formData, {
                    // headers: formData.getHeaders()
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( res =>{
                    resolve(res.data.value)
                })
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }


    static getAllCommunities = () =>{
        return new Promise((resolve, reject) => {
            try { 
                axios.get(url + "community/getAllCommunities").then(res => {
                    resolve(res.data) ;
                })
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })
    }
}


export default CommunityServices