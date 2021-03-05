var express = require('express');
var router = express.Router();

AuthentificationDBServices = require('../../services/AuthentificationDBServices.js');

router.post('/register',async function(req, res, next){

    try{
        userInfo = await AuthentificationDBServices.register(req.body)        
        res.send(userInfo)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.post('/updateProfile',async function(req, res, next){

    try{
        userInfo = await AuthentificationDBServices.updateProfile(req.body)        
        res.send(userInfo)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.post('/singIn',async function(req, res, next){

    try{
        userInfo = await AuthentificationDBServices.signIn(req.body)        
        res.send(userInfo)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.post('/forgotPassword', async function(req, res, next) {
    console.log('START POST forgotPassword')
    try{
        console.log('req.body')
        console.log(req.body)
        userInfo = await AuthentificationDBServices.forgotPassword(req.body)     
        console.log('END POST forgotPassword')
        res.send(userInfo)
    }catch(error){
        console.log(error)
        console.log('END POST forgotPassword')
        res.send(error.toString())
    }
});
    
router.post('/resetPassword', async function(req, res, next) {

    try{
        userInfo = await AuthentificationDBServices.resetPassword(req.body)        
        res.send(userInfo)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }
});



module.exports = router;