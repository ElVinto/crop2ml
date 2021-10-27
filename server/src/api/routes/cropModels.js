var express = require('express');
var router = express.Router();

CropModelsServices = require('../../services/CropModelsServices.js');

router.post('/findJsonModelsBySearchWords',async function(req, res, next){

    try{
        jsonModelIds = await CropModelsServices.findJsonModelsBySearchWords(req.body.searchWords)
        if(jsonModelIds){
            res.send(jsonModelIds)
        }else{
            res.send(`No model has been found`)
        }
        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.post('/findAllJsonModels',async function(req, res, next){

    try{
        jsonModels = await CropModelsServices.findAllModels()
        if(jsonModels){
            res.send(jsonModels)
        }else{
            res.send(`No model has been found`)
        }
        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.get('/findAllModelPackageNames',async function(req, res, next){

    try{
        modelPackageNames = await CropModelsServices.findAllModelPackageNames()
        if(modelPackageNames){
            res.send(modelPackageNames)
        }else{
            res.send(`No model has been found`)
        }
        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.post('/findAllKeywords',async function(req, res, next){

    try{
        jsonModels = await CropModelsServices.findAllModels()
        if(jsonModels){
            res.send(jsonModels)
        }else{
            res.send(`No model has been found`)
        }
        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});



router.post('/modelTree',  async function(req, res, next) {

    console.log('START post /modelTree')

    // get all modelids from crop2ml models collection

    let modelsMetaData = await CropModelsServices.getAllModelsMetaData();

    let tree = {
        name: 'models',
        children:[]
    }

    for(m of modelsMetaData){
        let curTree = tree
        let modelPath = m.metaData.idValue.split('.')
        console.log('\n modelPath')
        console.log(modelPath)
        for(let i=0;i<modelPath.length; i++){
            console.log(`modelPath[${i}]: ${modelPath[i]}`)
            
            if(curTree.children.map(n => n.name).includes(modelPath[i])){
                curTree = curTree.children.find(n => n.name === modelPath[i])
            }else{
                let nvTree = {
                    name :modelPath[i],
                    children:[]
                }
                if(i==modelPath.length-1){
                    nvTree['idValue'] = m.metaData.idValue
                }
                curTree.children.push(nvTree)
                curTree = nvTree
            }
            console.log('curTree')
            console.log(curTree)
        }
    }

    console.log('tree: ')
    console.log(tree)
    console.log('END post /modelTree');
    res.send(JSON.parse(JSON.stringify(tree)));

})


module.exports = router;