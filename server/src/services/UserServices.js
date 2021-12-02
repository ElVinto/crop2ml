let User = require('../models/UserSchema')
var mailer = require("nodemailer");
let config = require('../config');

class UserServices{

    static async getRegisteredEmails(){
        return new Promise(async (resolve, reject) => {
            try{
                console.log(' START findAllUserEmail')
                User.find({}, function(err, users){
                    if(err){
                        console.log(err)
                        resolve(err)
                    } else {
                        // remove duplicate packqge Names
                        let result = []
                        users.forEach(u =>{
                            if(!result.includes(u.email)){
                                result.push(u.email)
                            }
                        })
                        resolve(result)
                    }
                })     
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    //OK
    static async addRole(email, modelId, role){
        try{
            let associatedModel = {
                modelId: modelId,
                role: role
            }
            const filter = {email: email};
            let user = await User.findOne(filter)
            if (user == null){
                let newUser = new User({email: email, verified: false, associatedModels: [associatedModel]})
                await newUser.save()
            } else {
                let index = user.associatedModels.findIndex(m => m.modelId == modelId);
                if (index != -1){
                    user.associatedModels[index] = associatedModel;
                    await user.save();
                } else {
                    user.associatedModels.push(associatedModel)
                    await user.save();
                }
            }
        } catch(error){
            console.log(error)
            reject(error);
        }
    }

    //OK
    static async deleteRole(email, modelId){
        try{
            const filter = {email: email};
            let user = await User.findOne(filter)
            if (user != null){
                let index = user.associatedModels.findIndex(m => m.modelId == modelId);
                if (index != -1){
                    user.associatedModels.splice(index,1);
                    await user.save();
                }
            }
        } catch(error){
            console.log(error)
            reject(error);
        }
    }

    //OK
    static async notifyContributor(email, packageName){
        return new Promise(async (resolve, reject) => {
            try{
                var smtpTransport = mailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: `${config.email.sender}`,
                        pass: `${config.email.password}`,
                    },
                    });
                    
                var mail = {
                    from: `${config.email.sender}`,
                    to: email,
                    subject: 'Crop2ML : Invitation to contribute',
                    // HTML body
                    html: `<p> Hi, </p>
                    <p> The administrator of the model ${packageName} added you as a contributor to it on Crop2ML platform.</p>
                    <p> If you don't have an account please follow this link to <a target='_blank' href='http://${config.client.host}:${config.client.port}/#/Register'> create account. </a> </p>
                    <p> Otherwise you can <a target='_blank' href='http://${config.client.host}:${config.client.port}/#/SignIn'> sign in. </a> </p>
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
            } catch(error){
                console.log(error)
                resolve({errorMsg: error})
            }
        })
    }
}

module.exports = UserServices