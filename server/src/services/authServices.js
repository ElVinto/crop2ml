var mailer = require("nodemailer");
var generator = require('generate-password');
const bcrypt = require('bcryptjs');
const saltRounds =10;

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
                    } else if (data.authCode != "") {
                        if (data.authCode == user.authCode) {
                            continueRegistration = true
                        }
                        else {
                            continueRegistration = false
                            resolve({alreadyRegistered: true, verified: false, verifError: true})
                        }
                    } else {
                        continueRegistration = false
                        resolve({alreadyRegistered: true, verified: false})
                    }
                }
                
                if (continueRegistration) {
                    data.verified = true
                    data.authCode = ""
                    let newUser = new User(data)
                    let res = await newUser.save()
                    delete res.password
                    resolve({registrationDone: true})
                    //resolve(newUser)
                }
            } catch(error){
                console.log(error)
                resolve({errorMsg: error})
            }
        })
    }

    //OK
    static async updateProfile(profileDetails){
        return new Promise(async (resolve, reject) => {
            try {
                if (typeof profileDetails.password !== 'undefined') {
                    const hash =bcrypt.hashSync(profileDetails.password,saltRounds)
                    profileDetails.password = hash
                }
                const filter = {email: profileDetails.email};
                const update = {$set: profileDetails};
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
    static async signIn(userSignInDetails){
        return new Promise(async (resolve, reject) => {
            try{
                const filter = {email: userSignInDetails.email}
                let storedUserInfo = await User.findOne(filter)
                if(storedUserInfo !== null){
                    // const signInPasswordHash = bcrypt.hashSync(userSignInDetails.password,saltRounds)
                    if(bcrypt.compareSync(userSignInDetails.password, storedUserInfo.password)){
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

    // TODO CMZ : changer mail
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
                await User.updateOne(filter,update,options)

                // var smtpTransport = mailer.createTransport("smtps://devinfo.digitag%40gmail.com:"+encodeURIComponent('#01INRAE10#')+"@smtp.gmail.com:465"); 
                //var smtpTransport = mailer.createTransport("smtps://noreply.crop2ml%40gmail.com:"+encodeURIComponent('#01NOREPLY10#')+"@smtp.gmail.com:465");
                var smtpTransport = mailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "youkilehusky@gmail.com",
                      pass: "Chest7-Frigidity-Cold",
                    },
                  });
                  
                var mail = {
                    from: 'youkilehusky@gmail.com',
                    to: data.email,
                    subject: 'Crop2ML : Reset password',
                    // HTML body
                    html: `<p> Hi, </p>
                    <p> If you asked to reset your password from Crop2ML platform, please follow this link <a target='_blank' href='http://localhost:8080/#/ResetPassword?authCode=${authCode}'> reset password </a> </p>
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
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    //OK
    static async resetPassword(resetPasswordDetails){
        return new Promise(async (resolve, reject) => {
            try{

                const hash =bcrypt.hashSync(resetPasswordDetails.password,saltRounds)
                resetPasswordDetails.password = hash

                const authCode = resetPasswordDetails.authCode;
                delete resetPasswordDetails.authCode 

                const filter = {authCode: authCode};
                const update = {$set: resetPasswordDetails, $unset: {authCode:""}};
                const options = {upsert:false, returnOriginal:false}

                await User.updateOne(filter,update,options)

                if(typeof storedUserInfo.value !== null){
                    delete storedUserInfo.value.password;
                    delete storedUserInfo.value._id;
                    delete storedUserInfo.value.authCode;
                    resolve(storedUserInfo.value)
                }else{
                    resolve({errorMsg:"Error: Reset Password failed"})
                }
        
            }catch(error){
                console.log(error.errorMsg)
                resolve({errorMsg: error});
            }
        }) 
    }

    // TODO CMZ : changer mail
    static async sendVerificationCode(data){
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
                var user = await User.updateOne(filter,update,options)

                // var smtpTransport = mailer.createTransport("smtps://devinfo.digitag%40gmail.com:"+encodeURIComponent('#01INRAE10#')+"@smtp.gmail.com:465"); 
                //var smtpTransport = mailer.createTransport("smtps://noreply.crop2ml%40gmail.com:"+encodeURIComponent('#01NOREPLY10#')+"@smtp.gmail.com:465");
                var smtpTransport = mailer.createTransport({
                    service: "gmail",
                    auth: {
                      user: "youkilehusky@gmail.com",
                      pass: "Chest7-Frigidity-Cold",
                    },
                  });
                  
                var mail = {
                    from: 'youkilehusky@gmail.com',
                    to: data.email,
                    subject: 'Crop2ML : verification code',
                    // HTML body
                    html: `<p> Hi, </p>
                    <p> If you asked to register into Crop2ML platform, please paste the code <b> ${authCode} </b> into the registration form. </p>
                    <p> If you do not ask to register ignore this message.</p>
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
                        resolve("Verification code message has been sent")
                    }
                });
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }
}

module.exports = AuthServices