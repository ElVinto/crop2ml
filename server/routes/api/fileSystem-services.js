var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var unzipper = require('unzipper')
var archiver = require('archiver');

const directoryTree = require("directory-tree");



var mongodb = require('mongodb')
require('dotenv').config()
var MONGODB_URI = process.env.MONGODB_URI

var eyes = require('eyes');
var https = require('https');

var fs = require('fs');


const lineReader = require('line-reader');

var StringBuffer = require("stringbuffer");


var xml2js = require('xml2js');
const { resolve } = require('path');
dirTree = require('../../services/DirTree.js');



router.post('/upload',  async function(req, res, next) {

    console.log('START post /upload')

    const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    console.log('files received')
    console.log(JSON.parse(JSON.stringify(files)))

    // log first file name
    const [firstFileName] = Object.keys(files);
    console.log({ filename: firstFileName })

    const firstFile = files[firstFileName]

    const oldpath = firstFile.path;
    const zippath = './server/data/xml/' + firstFileName;
    fs.rename(oldpath, zippath, function (err) {
        if (err) throw err;

        try{

            console.log('saveXMLModel')
            // let xmlurl =  req.query.xmlurl;
            // console.log(req.query)
            
            // Parse xml url
            const xmlString = fs.readFileSync (zippath)
            // console.log('parsed xmlString')
            // console.log(xmlString)
    
            // Tranform to JSON object
            
            xmlString2jsonModel(xmlString).then(jsonModel => {

                console.log('jsonModel')
                console.log(jsonModel)
    
                // Save or update JSON object
                // result = await saveJsonModelUnit(jsonModel)
                saveJsonModel(jsonModel).then((result) =>{
    
                    // res.send(jsonObj2xmlString(jsonModel))
                    res.send(result)

                    // res.write("File "+firstFileName+' uploaded and moved!');
                    // res.end();
                })
                .catch( (error) => {
                    console.log(error)
                    res.send(error.message)
                })
            })    
        }catch(error){
            res.send(error.message)
        }
        
    });



    console.log('END post /upload')

    // res.json({ filename: firstFileName });

  });
     
});


router.post('/uploadZip',  async function(req, res, next) {

    console.log('START post /uploadZip')

    const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, async function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    console.log('files received')
    console.log(JSON.parse(JSON.stringify(files)))

    // log first file name
    const [firstFileName] = Object.keys(files);

    console.log('filename')
    console.log({ filename: firstFileName })

    const firstFile = files[firstFileName]

    const oldpath = firstFile.path;
    const zippath = './server/data/zip/' + firstFileName;
    await fs.rename(oldpath, zippath, async function (err) {
          if (err)
              throw err;

          try {
              console.log('zip fil saved');
              console.log(zippath);

              const zipPackageName = firstFileName.replace('.zip','')

              const packagesPath = './server/data/packages/'
              

              const extractionMsg = await extractZip(zippath,packagesPath)
              console.log(extractionMsg)


              const newPackageNames =fs.readdirSync(packagesPath)
              console.log('newPackageNames')
              console.log(newPackageNames)

              
             await addModels('server/data/packages/'+zipPackageName+'/crop2ml')

            
              // 
              // get Package Tree
              let tree = dirTree.getDirTree('server/data/packages/'+zipPackageName)
            //   console.log('tree: ')
            //   console.log(tree)

              // Add all model 

              
              

              console.log('END post /upload');

              res.send(JSON.parse(JSON.stringify(tree)));

              // TODO the package in json DB.

          } catch (error) {
              console.log(error)
              res.send(error.message);
          }

      });

    

    // res.json({ filename: firstFileName });

  });
     
});


router.post('/packageTree',  function(req, res, next) {

    console.log('START post /packageTree')

    const packagesPath = './server/data/packages/'
    
    // Log packageNames
    // const packageNames =fs.readdirSync(packagesPath)
    // console.log('packageNames')
    // console.log(packageNames)

    let tree = dirTree.getDisplayedDirTree(packagesPath)
    console.log('tree: ')
    console.log(tree)
    console.log('END post /packageTree');
    res.send(JSON.parse(JSON.stringify(tree)));

})

router.post('/modelTree',  async function(req, res, next) {

    console.log('START post /modelTree')


    
    // get all modelids from crop2ml models collection

    let modelMetaDatas = await getAllModelMetaData();

    let modelIds = []
    let tree = {
        name: 'models',
        children:[]
    }

    for(modelMetaData of modelMetaDatas){
        let modelId = modelMetaData.id
        let modelPath = modelId.split('.')
        let curTree = tree; 
        for(let i=0;i<modelPath.length; i++){
            if(curTree.children.includes(modelPath[i])){
                curTree =children[modelPath[i]]
            }else{
                let nvTree = {name :modelPath[i], children:[] }
                curTree.children.push(nvTree)
                curTree = nvTree
            }
        }
    }

    console.log('tree: ')
    console.log(tree)
    console.log('END post /packageTree');
    res.send(JSON.parse(JSON.stringify(tree)));

})





router.get('/zipFolder',async function(req,res,next){
    
    // const foldername = req.query.folder;

     res = await zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')

     console.log(res)
    

})

router.post('/zipFolder',async function(req,res,next){
    
    const foldername = req.body.folder;

     res = await zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')

     console.log(res)
    

})


/**
 * @param {String} source
 * @param {String} out 
 * @returns {Promise}
 */
function zipDirectory(source, out) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve('zip successful '));
    archive.finalize();
  });
}

/**
 * 
 * @param {String} source 
 * @param {String} dest 
 */
function extractZip(source, dest){

    return new Promise((resolve,reject)=>{
        
        try{
            let file = fs.createReadStream(source).pipe(unzipper.Extract({ path: dest }))
            file.on('finish', ()=>{
                // console.log('extracted zip:')
                // console.log(file)
                resolve('extraction: successful')
            })
        }catch(error) {
            reject(error.message);
        }

    })
    
}


async function addModels(dirPath){

    return new Promise(async (resolve,reject)=>{
        try {
            let xmlFNames =fs.readdirSync(dirPath).filter(fName => fName.includes('.xml'))
            let savedJsonModels =[]
            for(let xmlFName of xmlFNames ){
                let jsonModel = await xmlFile2jsonModel(dirPath+'/'+xmlFName)

                let idProp = typeof jsonModel.Attributs.modelid === 'undefined'? "id" : "modelid"
                let idVal =  typeof jsonModel.Attributs.modelid === 'undefined'? jsonModel.Attributs.id : jsonModel.Attributs.modelid

                let keywords = []
                keywords = keywords.concat(jsonModel.Description.Authors.split(' ').filter(s => s.length))
                keywords = keywords.concat(jsonModel.Description.Institution.split(' ').filter(s => s.length))
                keywords = keywords.concat(idVal.split('.').filter(s => s.length>0))


                jsonModel["meta"]={
                    dirPath,
                    xmlFName,
                    idProp,
                    idVal,
                    keywords
                }

                let savedJsonModel = await saveJsonModel(jsonModel)

                console.log(savedJsonModel.value.Attributs)                
                savedJsonModels.push(savedJsonModel)
            }
            resolve(true)
            
        } catch (error) {
            reject(error)
        }
    })
}

async function xmlFile2jsonModel(xmlFPath){
    
    return new Promise((resolve,reject)=>{
        try {
            let fileData = fs.readFileSync(path.resolve(xmlFPath))
            parser = new xml2js.Parser({
                attrkey: "Attributs",
                explicitRoot: false,
                rootName: 'Model',
                explicitArray: false,
                cdata: true,
            });
            parser.parseStringPromise(fileData).then(
                result => {
                    // console.log(xmlFPath)
                    // console.log(result.Attributs)
                    resolve( result)
                }
            )
        } catch (error) {
            reject(error)
        }
    })

}


async function saveJsonModel (jsonModel){
    console.log('saveJsonModel')
    return new Promise(async (resolve, reject) => {
        try{
            const MongoClient = require('mongodb').MongoClient;
            const uri = MONGODB_URI;
            const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
            await client.connect()
            console.log(`succesful connection to ${MONGODB_URI}` )

            const collection = client.db("crop2ml").collection("models");
            
            const modelidProperty = typeof jsonModel.Attributs.modelid === 'undefined'? "id" : "modelid"
            const modelid =  typeof jsonModel.Attributs.modelid === 'undefined'? jsonModel.Attributs.id : jsonModel.Attributs.modelid

            

            const filterKey = `Attributs.${modelidProperty}`
            
            const filter = { filterKey: modelid}
            const replacement = jsonModel
            const options = { upsert: true, returnNewDocument: true}

            console.log("insert or replace :  ")
            console.log(filtder)

            var result = await collection.findOneAndReplace(filter,replacement,options)

            if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                result.value = jsonModel;
            }
            
            result = JSON.parse(JSON.stringify(result))

            console.log('result')
            console.log(result)

            await client.close()
            resolve(result)
                   
        }catch(error){
            console.log(error)
            if( typeof client !== 'undefined')
                await client.close()
            reject(error);
        }
    }) 
  
}

async function getAllModelMetaData(){
    console.log('getAllModelMetaData')
    return new Promise(async (resolve, reject) => {
        try{
            const MongoClient = require('mongodb').MongoClient;
            const uri = MONGODB_URI;
            const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
            await client.connect()
            console.log(`succesful connection to ${MONGODB_URI}` )

            const collection = client.db("crop2ml").collection("models");
            
            const filter = {}

            var result = await collection.find(filter)
            
            result = JSON.parse(JSON.stringify(result))

            console.log('result')
            console.log(result)

            await client.close()
            resolve(result)
                   
        }catch(error){
            console.log(error)
            if( typeof client !== 'undefined')
                await client.close()
            reject(error);
        }
    }) 
}

module.exports = router;