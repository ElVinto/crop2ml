import axios from 'axios';

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class Authentification {

    static register(userRegistrationDetails) {
        console.log("START Authentification.register");
        console.log(userRegistrationDetails);
        
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "AuthentificationDBRoutes/register", userRegistrationDetails).then(res => {
                    
                    console.log("Authentification.END register");
                    
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }

    static updateProfile(profileDetails) {
        console.log("START Authentification.updateProfile");
        console.log(profileDetails);
        
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "AuthentificationDBRoutes/updateProfile", profileDetails).then(res => {
                    
                    console.log("Authentification.END updateProfile");
                    
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }



    static signIn(email, password) {
        
        let body = { email, password}
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "AuthentificationDBRoutes/singIn", body).then(res => {
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }

    static forgotPassword(email) {
        
        return new Promise((resolve, reject) => {
            try {
                let body = { email}
                axios.post(url + "AuthentificationDBRoutes/forgotPassword", body).then(res => {
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }

    static resetPassword(resetPasswordDetails) {
        
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "AuthentificationDBRoutes/resetPassword", resetPasswordDetails).then(res => {
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }




}
export default Authentification;