var express = require('express');
var router = express.Router();

ModelServices = require('../../services/ModelServices.js');

//TODO reuse for more complex search with or condition
/*
router.post('/findJsonModelsBySearchWords',async function(req, res, next){
    try {
        jsonModelIds = await ModelServices.findJsonModelsBySearchWords(req.body.searchWords)
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
router.post('/getModelById',async function(req, res, next){
    try{
        const modelid =  req.body.modelid;
        const jsonModel = await getModelById(modelid)
        if(jsonModel){
            res.send(jsonModel)
        }else{
            res.send(`Model ${modelid} NOT FOUND, the model has to be recorded first.`)
        }
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }
});

//OK
router.get('/getAllModelsPackageNames',async function(req, res, next){
    try{
        const modelPackageNames = await ModelServices.getAllModelsPackageNames()
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

//OK
router.post('/getModelsTree',  async function(req, res, next) {
    const modelsMetaData = await ModelServices.getAllModelsMetaData();
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

router.post('/deleteModelById',async function(req, res, next){
    try{
        const modelid =  req.body.modelid;
        result = await ModelServices.deleteModelById(modelid)
        res.send(result)
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }
});

/*router.post('/findAllKeywords',async function(req, res, next){

    try{
        jsonModels = await ModelServices.getAllModels()
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

module.exports = router;