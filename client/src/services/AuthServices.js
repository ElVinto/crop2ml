import axios from 'axios';

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class AuthServices {

    static register(userRegistrationDetails) {
        console.log("START AuthServices.register");
        console.log(userRegistrationDetails);
        
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "auth/register", userRegistrationDetails).then(res => {
                    
                    console.log("AuthServices.END register");
                    
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }

    static updateProfile(profileDetails) {
        console.log("START AuthServices.updateProfile");
        console.log(profileDetails);
        
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "auth/updateProfile", profileDetails).then(res => {
                    
                    console.log("AuthServices.END updateProfile");
                    
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }



    static signIn(email, password) {
        
        let body = { email, password}
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "auth/signIn", body).then(res => {
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }

    static forgotPassword(email) {
        
        return new Promise((resolve, reject) => {
            try {
                let body = { email}
                axios.post(url + "auth/forgotPassword", body).then(res => {
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }

    static resetPassword(resetPasswordDetails) {
        
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "auth/resetPassword", resetPasswordDetails).then(res => {
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }




}
export default AuthServices;