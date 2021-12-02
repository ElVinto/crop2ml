var express = require('express');
var router = express.Router();

ModelServices = require('../../services/ModelServices.js');

//OK
router.post('/getAllModels',async function(req, res, next){
    try {
        const jsonModels = await ModelServices.getAllModels()
        if(jsonModels){
            res.send(jsonModels)
        }else{
            res.send(`No model has been found`)
        }
    } catch(error){
        console.log(error)
        res.send(error.toString())
    }
});

//OK
router.post('/deleteModelById',async function(req, res, next){
    try{
        const modelid =  req.body.modelid;
        const version =  req.body.version;
        const user = req.body.user;
        result = await ModelServices.deleteModelById(modelid, version, user)
        res.send(result)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }
});

//OK
router.post('/saveModel',async function(req, res, next){
    try{
        let model =  req.body.model;
        let user = req.body.user;
        result = await ModelServices.saveModel(model, user)
        res.send(result)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }
});

module.exports = router;