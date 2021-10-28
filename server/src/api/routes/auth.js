var express = require('express');
var router = express.Router();

AuthServices = require('../../services/authServices.js');

router.post('/register',async function(req, res, next){

    try{
        userInfo = await AuthServices.register(req.body)        
        res.send(userInfo)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.post('/updateProfile',async function(req, res, next){

    try{
        userInfo = await AuthServices.updateProfile(req.body)        
        res.send(userInfo)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.post('/signIn',async function(req, res, next){

    try{
        userInfo = await AuthServices.signIn(req.body)        
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
        userInfo = await AuthServices.forgotPassword(req.body)     
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
        userInfo = await AuthServices.resetPassword(req.body)        
        res.send(userInfo)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }
});

module.exports = router;