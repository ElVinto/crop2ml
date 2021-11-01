let User = require('../models/user')

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
}

module.exports = UserServices