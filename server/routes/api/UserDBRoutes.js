var express = require('express');
var router = express.Router();

UserDBServices = require('../../services/UserDBServices.js');



router.get('/getRegisteredEmails',async function(req, res, next){

    try{
        let registeredEmails = await UserDBServices.getRegisteredEmails()
        if(registeredEmails){
            res.send(registeredEmails)
        }else{
            res.send(`No registered emails has been found`)
        }
        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});




module.exports = router;