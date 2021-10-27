var mongodb = require('mongodb')

var path = require('path');
var fs = require('fs');
var unzipper = require('unzipper')
var archiver = require('archiver');
var fs = require('fs');
var xml2js = require('xml2js');
dirTree = require('../services/DirTree.js');

require('dotenv').config()
var MONGODB_URI = process.env.MONGODB_URI
if(process.env.NODE_ENV==="development"){
    MONGODB_URI = process.env.MONGODB_DEV_URI
}

class FilesServices {

    /**
     * @param {String} source
     * @param {String} out 
     * @returns {Promise}
     */
    zipDirectory(source, out) {
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
    extractZip(source, dest){
    
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

    async addModelsFrom(dirPath,modelMetaDataPart){

        return new Promise(async (resolve,reject)=>{
            try {
                let xmlFNames =fs.readdirSync(dirPath).filter(fName => fName.includes('.xml'))
                let savedJsonModels =[]
                let extractedKeywords =[]
                for(let xmlFName of xmlFNames ){
                    let jsonModel = await xmlFile2jsonModel(dirPath+'/'+xmlFName)
    
                    let idProperty = typeof jsonModel.Attributs.modelid === 'undefined'? "id" : "modelid"
                    let idValue =  typeof jsonModel.Attributs.modelid === 'undefined'? jsonModel.Attributs.id : jsonModel.Attributs.modelid
    
                    let keywords = []
                    keywords = keywords.concat(jsonModel.Description.Authors.split(' ').filter(s => s.length))
                    keywords = keywords.concat(jsonModel.Description.Institution.split(' ').filter(s => s.length && !keywords.includes(s) ))
                    keywords = keywords.concat(idValue.split('.').filter(s => s.length>0  && !keywords.includes(s)))
    
                    jsonModel["metaData"]={
                        dirPath,
                        xmlFName,
                        idProperty,
                        idValue,
                        keywords,
                        tags: modelMetaDataPart.tags.split(','),
                        packageName: modelMetaDataPart.packageName,
                        uploaderMail: modelMetaDataPart.uploaderMail
                    }
    
                    let savedJsonModel = await saveJsonModel(jsonModel)
                    savedJsonModels.push(savedJsonModel)
    
                    await saveJsonKeywords(jsonModel.metaData)
    
                    for(keyword of jsonModel.metaData.keywords){
                        if(extractedKeywords.indexOf(keyword)===-1){
                            extractedKeywords.push(keyword)
                        }
                    }
    
                    // console.log(savedJsonModel.value.Attributs)
    
                    
                }
                resolve([savedJsonModels,extractedKeywords])
                
            } catch (error) {
                reject(error)
            }
        })
    }
    
    async xmlFile2jsonModel(xmlFPath){
        
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
    
    async saveJsonModel (jsonModel){
        console.log('saveJsonModel')
        return new Promise(async (resolve, reject) => {
            try{
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
    
                // console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("models");
                
                // const modelidProperty = typeof jsonModel.Attributs.modelid === 'undefined'? "id" : "modelid"
                // const modelid =  typeof jsonModel.Attributs.modelid === 'undefined'? jsonModel.Attributs.id : jsonModel.Attributs.modelid
    
    
                let filter ={}
                filter[`Attributs.${jsonModel.metaData.idProperty}`]= jsonModel.metaData.idValue
    
                const replacement = jsonModel
                const options = { upsert: true, returnNewDocument: true}
    
                console.log("insert or replace :  ")
                console.log(filter)
    
                var result = await collection.findOneAndReplace(filter,replacement,options)
    
                if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                    result.value = jsonModel;
                }
                
                result = JSON.parse(JSON.stringify(result))
    
                // console.log('result')
                // console.log(result)
    
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
    
    async saveJsonKeywords (modelMetaData){
        console.log('saveJsonKeywords')
        console.log(modelMetaData)
    
        return new Promise(async (resolve, reject) => {
            try{
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                // console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("keywords");
                
                for(k of modelMetaData.keywords){
                    const filter = {keyword: k, modelIdValue: modelMetaData.idValue }
                    const replacement = {keyword: k, modelIdValue: modelMetaData.idValue }
                    const options = { upsert: true, returnNewDocument: true}
                    var result = await collection.findOneAndReplace(filter,replacement,options)
                    if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                        result.value = replacement;
                    }
                    console.log('insert : ')
                    console.log(replacement)
                    // console.log(result)
                }
    
                await client.close()
                resolve()
                       
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined')
                    await client.close()
                reject(error);
            }
        }) 
      
    }
    
    async getAllModels(){
        
        return new Promise(async (resolve, reject) => {
            try{
    
                console.log(' START getAllModels')
    
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("models");
                
    
                const result = await collection.find({}).toArray()
                
    
                console.log('result')
                console.log(result)
    
                await client.close()
                resolve(result)
                       
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined')
                    await client.close()
                reject(error);
            }finally{
                console.log('END getAllModels')
            }
        }) 
    }
    
    async getAllModelsMetaData(){
        
        return new Promise(async (resolve, reject) => {
            try{
    
                console.log(' START getAllModelsMetaData')
    
                const MongoClient = require('mongodb').MongoClient;
                const uri = MONGODB_URI;
                const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
                await client.connect()
                console.log(`succesful connection to ${MONGODB_URI}` )
    
                const collection = client.db("crop2ml").collection("models");
                
    
                const result = await collection.find({}).project({metaData:1}).toArray()
                
    
                console.log('result')
                console.log(result)
    
                await client.close()
                resolve(result)
                       
            }catch(error){
                console.log(error)
                if( typeof client !== 'undefined')
                    await client.close()
                reject(error);
            }finally{
                console.log('END getAllModelsMetaData')
            }
        }) 
    }

}

module.exports = FilesServices