const axios = require('axios');

require('dotenv').config()
// prod
var url = '/';
if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    // dev 
    url = 'http://localhost:5000/';
}

class CommunityRequests{

    static createCommunity = async (file, communityInfo) =>{
        
        return new Promise((resolve, reject) => {
            
            try { 

                const formData = new FormData();
                formData.append(file.name, file );

                console.log(communityInfo)

                for( const k in communityInfo){
                    formData.append(k, JSON.stringify(communityInfo[k]))
                }

                axios.post(url+'CommunityDBRoutes/createCommunity', formData, {
                    // headers: formData.getHeaders()
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then( res =>{
                    console.log(' sendCommunity SUCCESS!!');

                    console.log(' receive ');
                    console.log(res.data);

                    resolve(res.data.value)
                })

            } catch (err) { 
                console.log(' sendCommunity FAILURE!!');
                console.error(err);
                reject(err);
            }
        })
    }


    static getAllCommunities = () =>{
        
        return new Promise((resolve, reject) => {
            
            try { 
                
                
                axios.get(url + "CommunityDBRoutes/getAllCommunities").then(res => {
                    resolve(res.data) ;
                })

                
            } catch (err) { 
                console.error(err);
                reject(err);
            }
        })

    }

}


export default CommunityRequests