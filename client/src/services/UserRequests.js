const axios = require('axios');

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class UserRequests{

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


export default UserRequests