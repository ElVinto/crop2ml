const axios = require('axios');
import config from '../config'

var url = `http://${config.server.host}:${config.server.port}/`;

class UserServices{

    //OK
    static getRegisteredEmails = async () =>{
        return new Promise((resolve, reject) => {
            try { 
                axios.get(url+'user/getRegisteredEmails').then( res =>{
                    console.log(' getRegisteredEmails SUCCESS!!');
                    resolve(res.data)
                })
            } catch (err) { 
                console.log(' getRegisteredEmails FAILURE!!');
                console.error(err);
                reject(err);
            }
        })
    }
}


export default UserServices