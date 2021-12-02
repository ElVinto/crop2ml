var mailer = require("nodemailer");
var generator = require('generate-password');
const bcrypt = require('bcryptjs');
const saltRounds =10;
let config = require('../config');
let User = require('../models/UserSchema')

class AuthServices{

    //OK
    static async register(data){
        return new Promise(async (resolve, reject) => {
            try{
                // TODO CMZ : hash in client before sending to server ?
                // hash password
                const hash = bcrypt.hashSync(data.password, saltRounds)
                data.password = hash
                
                // check if user exists
                const filter = { email: data.email };
                let userAlreadyRegistered = await User.exists(filter)
                let continueRegistration = true

                if(userAlreadyRegistered){
                    let user = await User.findOne(filter)
                    if (user.verified) {
                        continueRegistration = false
                        resolve({alreadyRegistered: true, verified: true})
                    }
                }
                
                if (continueRegistration) {
                    data.verified = false
                    var authCode = generator.generate( {
                        length: 10,
                        numbers: true,
                        uppercase: false
                    });
                    data['authCode'] = authCode
                    let newUser = new User(data)
                    let res = await newUser.save()
                    delete res.password
                    
                    var smtpTransport = mailer.createTransport({
                        service: "gmail",
                        auth: {
                          user: `${config.email.sender}`,
                          pass: `${config.email.password}`,
                        },
                      });
                      
                    var mail = {
                        from: `${config.email.sender}`,
                        to: data.email,
                        subject: 'Crop2ML : Validate your account',
                        // HTML body
                        html: `<p> Hi, </p>
                        <p> If you asked to create an account to Crop2ML platform, please follow this link <a target='_blank' href='http://${config.client.host}:${config.client.port}/#/ValidateRegistration?authCode=${authCode}&email=${data.email}'> validate account </a> </p>
                        <p> If you do not ask to create an account ignore this message.</p>
                        <p> This message has been automatically generated, please do not answer.</p>
                        <p> Best regards, </p>
                        <p> Crop2ML Team</p>`,
                    }
                
                    smtpTransport.sendMail(mail, function(error, response){
                        if(error){
                            console.log(error);
                            smtpTransport.close();
                            reject(error);
                        }else{
                            console.log("Mail sent succesfully!")
                            smtpTransport.close();
                            resolve({registrationInProgress: true})
                            //resolve("Validate account message has been sent")
                        }
                    });
                }
            } catch(error){
                console.log(error)
                resolve({errorMsg: error})
            }
        })
    }

    //OK
    static async updateProfile(data){
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof data.password !== 'undefined') {
                    const hash = bcrypt.hashSync(data.password,saltRounds)
                    data.password = hash
                }
                const filter = {email: data.email};
                const update = {$set: data};
                const options = {upsert:true}
                await User.updateOne(filter,update,options)
                resolve()
            } catch(error) {
                console.log(error)
                resolve({errorMsg: error})
            }
        }) 
    }

    //OK
    static async signIn(data){
        return new Promise(async (resolve, reject) => {
            try{
                const filter = {email: data.email}
                let storedUserInfo = await User.findOne(filter)
                if(storedUserInfo !== null){
                    // const signInPasswordHash = bcrypt.hashSync(data.password,saltRounds)
                    if(bcrypt.compareSync(data.password, storedUserInfo.password)){
                        delete storedUserInfo.password;
                        delete storedUserInfo._id;
                        resolve(storedUserInfo)
                    }else{
                        resolve({errorMsg:"Password check failed"})
                    }
                }else{
                    resolve({errorMsg:"Email not registered"})
                }
            } catch(error){
                console.log(error)
                resolve({errorMsg: "Error while signing in"});
            }
        }) 
    }

    //OK
    static async forgotPassword(data){
        return new Promise(async (resolve, reject) => {
            try{
                // Generate a code
                var authCode = generator.generate( {
                    length: 10,
                    numbers: true,
                    uppercase: false
                });
                data['authCode'] = authCode

                const filter = {email: data.email};
                const update = {$set: data};
                const options = {upsert:false}
                const res = await User.updateOne(filter,update,options)

                if (res.ok == 1 && res.nModified == 1){
                    // var smtpTransport = mailer.createTransport("smtps://devinfo.digitag%40gmail.com:"+encodeURIComponent('#01INRAE10#')+"@smtp.gmail.com:465"); 
                    //var smtpTransport = mailer.createTransport("smtps://noreply.crop2ml%40gmail.com:"+encodeURIComponent('#01NOREPLY10#')+"@smtp.gmail.com:465");
                    var smtpTransport = mailer.createTransport({
                        service: "gmail",
                        auth: {
                            user: `${config.email.sender}`,
                            pass: `${config.email.password}`,
                        },
                    });
                    
                    var mail = {
                        from: `${config.email.sender}`,
                        to: data.email,
                        subject: 'Crop2ML : Reset password',
                        // HTML body
                        html: `<p> Hi, </p>
                        <p> If you asked to reset your password from Crop2ML platform, please follow this link <a target='_blank' href='http://${config.client.host}:${config.client.port}/#/ResetPassword?authCode=${authCode}&email=${data.email}'> reset password </a> </p>
                        <p> If you do not ask to reset your password ignore this message.</p>
                        <p> This message has been automatically generated, please do not answer.</p>
                        <p> Best regards, </p>
                        <p> Crop2ML Team</p>`,
                    }
                
                    smtpTransport.sendMail(mail, function(error, response){
                        if(error){
                            console.log(error);
                            smtpTransport.close();
                            reject(error);
                        }else{
                            console.log("Mail sent succesfully!")
                            smtpTransport.close();
                            resolve("Reset password message has been sent")
                        }
                    });
                } else {
                    resolve("User unknown")
                }
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    //OK
    static async resetPassword(data){
        return new Promise(async (resolve, reject) => {
            try{

                const hash =bcrypt.hashSync(data.password,saltRounds)
                data.password = hash

                const authCode = data.authCode;
                delete data.authCode 

                const filter = {authCode: authCode};
                const update = {$set: data, $unset: {authCode:""}};
                const options = {upsert:false, returnOriginal:false}

                const res = await User.updateOne(filter,update,options)

                if(res.ok == 1 && res.nModified == 1){
                    resolve({resetDone: true})
                }else{
                    resolve({errorMsg:"Error: Reset Password failed"})
                }
        
            }catch(error){
                console.log(error.errorMsg)
                resolve({errorMsg: error});
            }
        }) 
    }

    //OK
    static async validateRegistration(data){
        return new Promise(async (resolve, reject) => {
            try{
                const authCode = data.authCode;
                const email = data.email;
                const filter = {email: email, authCode: authCode};
                const update = {$set: {verified: true}, $unset: {authCode:""}};
                const options = {upsert:false, returnOriginal:false}
                const res = await User.updateOne(filter,update,options)

                if (res.ok == 1 && res.nModified == 1){
                    resolve({registrationDone: true})
                }else{
                    resolve({errorMsg:"Error: User unknown"})
                }
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }
}

module.exports = AuthServices