import axios from 'axios';
import config from '../config'

var url = `http://${config.server.host}:${config.server.port}/`;

class AuthServices {

    static register(body) {
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "auth/register", body).then(res => {
                    resolve(res.data);
                })
            } catch (err) { reject(err); }
        })
    }

    static validateRegistration(body) {
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "auth/validateRegistration", body).then(res => {
                    resolve(res.data);
                })
            } catch (err) { reject(err); }
        })
    }

    static updateProfile(body) {
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "auth/updateProfile", body).then(res => {
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

    static resetPassword(body) {
        return new Promise((resolve, reject) => {
            try {
                axios.post(url + "auth/resetPassword", body).then(res => {
                    resolve(res.data);
                })

            } catch (err) { reject(err); }
        })
    }
}
export default AuthServices;