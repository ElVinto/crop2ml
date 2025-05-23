let Community = require('../models/CommunitySchema')

class CommunityServices{

    //OK
    static async saveCommunity (community){

        for(const k in community){
            community[k] = JSON.parse(community[k])
        }
        
        return new Promise(async (resolve, reject) => {
            try{
                const filter = {name: community.name }
                const update = community
                const options = { upsert: true, returnNewDocument: true}
                var result = await Community.updateOne(filter,update,options)
                /*if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===true ){
                    result.value = replacement;
                }*/
                resolve(result)
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }

    //OK
    static async getAllCommunities(){
        return new Promise(async (resolve, reject) => {
            try{
                Community.find({}, function(err, community){
                    if(err){
                        console.log(err)
                        resolve(err)
                    } else {
                        resolve(community)
                    }
                })     
            } catch(error){
                console.log(error)
                reject(error);
            }
        }) 
    }
}

module.exports = CommunityServices