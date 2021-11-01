var express = require('express');
var router = express.Router();

UserServices = require('../../services/UserServices.js');

//OK
router.get('/getRegisteredEmails',async function(req, res, next){
    try{
        let registeredEmails = await UserServices.getRegisteredEmails()
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