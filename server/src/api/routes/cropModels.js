var express = require('express');
var router = express.Router();

CropModelsServices = require('../../services/CropModelsServices.js');

//TODO reuse for more complex search with or condition
/*
router.post('/findJsonModelsBySearchWords',async function(req, res, next){
    try {
        jsonModelIds = await CropModelsServices.findJsonModelsBySearchWords(req.body.searchWords)
        if(jsonModelIds){
            res.send(jsonModelIds)
        }else{
            res.send(`No model has been found`)
        }
    } catch(error){
        console.log(error)
        res.send(error.toString())
    }
});*/

//OK
router.post('/findAllJsonModels',async function(req, res, next){
    try {
        const jsonModels = await CropModelsServices.findAllModels()
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
router.get('/findAllModelPackageNames',async function(req, res, next){
    try{
        const modelPackageNames = await CropModelsServices.findAllModelPackageNames()
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

/*router.post('/findAllKeywords',async function(req, res, next){

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

});*/


//OK
router.post('/modelTree',  async function(req, res, next) {

    const modelsMetaData = await CropModelsServices.getAllModelsMetaData();
    let tree = {
        name: 'models',
        children:[]
    }

    for(m of modelsMetaData){
        let curTree = tree
        let modelPath = m.metaData.idValue.split('.')

        for(let i=0;i<modelPath.length; i++){
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
        }
    }
    res.send(tree);
})


module.exports = router;