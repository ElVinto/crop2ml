var mongodb = require('mongodb')
var mailer = require("nodemailer");
var generator = require('generate-password');

const bcrypt = require('bcryptjs');
const saltRounds =10;

require('dotenv').config()
var MONGODB_URI = process.env.MONGODB_URI
if(process.env.NODE_ENV==="development"){
    MONGODB_URI = process.env.MONGODB_DEV_URI
}

class AuthServices{

    static async register(userRegistrationDetails){
        console.log('START register')
        return new Promise(async (resolve, reject) => {
            try{
                console.log(userRegistrationDetails)
                
                const hash =bcrypt.hashSync(userRegistrationDetails.password,saltRounds)
                userRegistrationDetails.password = hash
                console.log("hash pwd: "+userRegistrationDetails.password)

                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const filter = {email: userRegistrationDetails.email};

                const collection = client.db("crop2ml").collection("users");
                
                const userAlreadyRegistered = await collection.findOne(filter)

                console.log('userAlreadyRegistered')
                console.log(userAlreadyRegistered)

                if(userAlreadyRegistered !== null){
                    await client.close()
                    console.log('END register')
                    resolve({errorMsg: "Email already registered"})
                }else{
                    const insertResult = await collection.insertOne(userRegistrationDetails)
                    let newRegisteredUser = userRegistrationDetails
                    console.log('newRegisteredUser')
                    console.log(newRegisteredUser)
                    
                    delete newRegisteredUser.password
                    
                    
                    await client.close()
                    console.log('END register')
                    resolve(newRegisteredUser)
                }

            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined'){
                    await client.close()
                }
                
                console.log('END register')
                resolve({errorMsg: error})
                
            }
        }) 
      
    }

    static async updateProfile(profileDetails){
        console.log('START updateProfile')
        return new Promise(async (resolve, reject) => {
            try{
                console.log(profileDetails)
                
                if(typeof profileDetails.password !== 'undefined'){
                    const hash =bcrypt.hashSync(profileDetails.password,saltRounds)
                    profileDetails.password = hash
                    console.log("hash pwd: "+profileDetails.password)
                }

                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                // console.log(`succesful connection to ${MONGODB_URI}` )
    
                const filter = {email: profileDetails.email};
                const update = {$set: profileDetails};
                const options = {upsert:true}

                console.log('update statement')
                console.log(update)
                

                const collection = client.db("crop2ml").collection("users");
                const result = await collection.findOneAndUpdate(filter,update,options)

                console.log('result')
                console.log(result)
    
                await client.close()
                console.log('END updateProfile')
                resolve(result.ok===1)
                       
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined'){
                    await client.close()
                }
                
                console.log('END updateProfile')
                resolve({errorMsg: error})
                
            }
        }) 
      
    }

    static async signIn(userSignInDetails){
        console.log('signIn')
        return new Promise(async (resolve, reject) => {
            try{
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("users");
                

                let filter = {email: userSignInDetails.email}
    
                let storedUserInfo = await collection.findOne(filter)

                console.log(storedUserInfo)

                if(storedUserInfo !== null){
                    // const signInPasswordHash =bcrypt.hashSync(userSignInDetails.password,saltRounds)
                    if(bcrypt.compareSync(userSignInDetails.password, storedUserInfo.password)){
                        delete storedUserInfo.password;
                        delete storedUserInfo._id;
                        await client.close()
                        resolve(storedUserInfo)
                    }else{
                        await client.close()
                        resolve({errorMsg:"Password check failed"})
                    }
                }else{
                    await client.close()
                    resolve({errorMsg:"Email not registered"})
                }
                       
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined')
                    await client.close()
                reject(error);
            }
        }) 
    }

    static async forgotPassword(forgotPasswordDetails){
        console.log('START forgotPassword')
        console.log('forgotPasswordDetails')
        console.log(forgotPasswordDetails)

        return new Promise(async (resolve, reject) => {
            try{

                // Generate a new code

                var authCode = generator.generate( {
                    length: 10,
                    numbers: true,
                    uppercase: false
                });
                forgotPasswordDetails['authCode']=authCode

                // 

                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
    
                const filter = {email: forgotPasswordDetails.email};
                const update = {$set: forgotPasswordDetails};
                const options = {upsert:false}

                const collection = client.db("crop2ml").collection("users");
                const result = await collection.findOneAndUpdate(filter,update,options)

                console.log('result')
                console.log(result)
    
                await client.close()
                // 

                // var smtpTransport = mailer.createTransport("smtps://devinfo.digitag%40gmail.com:"+encodeURIComponent('#01INRAE10#')+"@smtp.gmail.com:465"); 
                var smtpTransport = mailer.createTransport("smtps://noreply.crop2ml%40gmail.com:"+encodeURIComponent('#01NOREPLY10#')+"@smtp.gmail.com:465");
                var mail = {
            
                from: 'devinfo.digitag@gmail.com',
                to: forgotPasswordDetails.email,
                subject: 'Reset password (crop2ml)',
                // HTML body
                html: `<p> Hi, </p>
                <p> If you asked to reset your password from Crop2ML platform, please follow this link <a href='http://localhost:8080/#/ResetPassword?authCode=${authCode}'> reset password </a> </p>
                <p> If you do not ask to reset your password ignore this message.</p>
                <p> This message has been automatically generated, please do not answer.</p>
                <p> Best regards, </p>
                <p> Crop2ML Team</p>`,

                }
            
                smtpTransport.sendMail(mail, function(error, response){
                    if(error){
                        console.log("Error while sending mail!");
                        console.log(error);
                        smtpTransport.close();
                        reject(error);
                    }else{
                        console.log("Mail sent succesfully!")
                        smtpTransport.close();
                        resolve("Reset password message has been sent")
                    }
                    
                });

                console.log('END forgotPassword')

            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 

    }

    static async resetPassword(resetPasswordDetails){
        console.log('resetPassword')
        console.log(resetPasswordDetails)
        return new Promise(async (resolve, reject) => {
            try{

                const hash =bcrypt.hashSync(resetPasswordDetails.password,saltRounds)
                resetPasswordDetails.password = hash
                console.log("hash pwd: "+resetPasswordDetails.password)

                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()

                
                const authCode =resetPasswordDetails.authCode;
                delete resetPasswordDetails.authCode 

                const filter = {authCode: authCode};
                const update = {$set: resetPasswordDetails, $unset: {authCode:""}};
                const options = {upsert:false, returnOriginal:false}

                console.log('update statement')
                console.log(update)
                

                const collection = client.db("crop2ml").collection("users");
                const storedUserInfo = await collection.findOneAndUpdate(filter,update,options)

                console.log('DB result')
                console.log(storedUserInfo)

                if(typeof storedUserInfo.value !== null){
                    delete storedUserInfo.value.password;
                    delete storedUserInfo.value._id;
                    delete storedUserInfo.value.authCode;
                    await client.close()
                    resolve(storedUserInfo.value)
                }else{
                    await client.close()
                    resolve({errorMsg:"Error: Reset Password failed"})
                }
                       
            }catch(error){
                console.log(error.errorMsg)
                if( typeof client !== 'undefined'){
                    await client.close()
                }
                resolve({errorMsg: error});
            }
        }) 
    }
}

module.exports = AuthServices