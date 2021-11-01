var path = require('path');
var fs = require('fs');
var unzipper = require('unzipper')
var archiver = require('archiver');
var fs = require('fs');
var xml2js = require('xml2js');
dirTree = require('../services/DirTree.js');

let ModelUnit = require('../models/modelUnit')
let Keyword = require('../models/keyword')

class FilesServices {

    /**
     * @param {String} source
     * @param {String} out 
     * @returns {Promise}
     */
    static async zipDirectory(source, out) {
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
    //OK
    static async extractZip(source, dest){
        return new Promise((resolve,reject)=>{
            try{
                let file = fs.createReadStream(source).pipe(unzipper.Extract({ path: dest }))
                file.on('finish', ()=>{
                    resolve('extraction: successful')
                })
            }catch(error) {
                reject(error.message);
            }
        })
    }

    //OK
    static async addModelsFrom(dirPath, modelMetaDataPart){
        return new Promise(async (resolve,reject)=>{
            try {
                let xmlFNames =fs.readdirSync(dirPath).filter(fName => fName.includes('.xml'))
                let savedJsonModels =[]
                let extractedKeywords =[]
                for(let xmlFName of xmlFNames ){
                    let jsonModel = await this.xmlFile2jsonModel(dirPath+'/'+xmlFName)
    
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
                    console.log(jsonModel)
                    let savedJsonModel = await this.saveJsonModel(jsonModel)
                    savedJsonModels.push(savedJsonModel)
    
                    await this.saveJsonKeywords(jsonModel.metaData)
                    
                    jsonModel.metaData.keywords.forEach (k => {
                        if(extractedKeywords.indexOf(k)===-1){
                            extractedKeywords.push(k)
                        }
                    })
                }
                resolve([savedJsonModels,extractedKeywords])
                
            } catch (error) {
                reject(error)
            }
        })
    }
    
    //OK
    static async xmlFile2jsonModel(xmlFPath){
        
        return new Promise((resolve,reject)=>{
            try {
                let fileData = fs.readFileSync(path.resolve(xmlFPath))
                let parser = new xml2js.Parser({
                    attrkey: "Attributs",
                    explicitRoot: false,
                    //rootName: 'Model',
                    explicitArray: false,
                    //cdata: true,
                });
                parser.parseStringPromise(fileData).then(
                    result => {
                        // console.log(xmlFPath)
                        resolve( result)
                    }
                )
            } catch (error) {
                reject(error)
            }
        })
    
    }
    
    //OK
    static async saveJsonModel (jsonModel){
        return new Promise(async (resolve, reject) => {
            try{
                //const filter = {'Attributs.modelid': jsonModel.metaData.idValue}
                let filter = {}
                filter[`Attributs.${jsonModel.metaData.idProperty}`]= jsonModel.metaData.idValue
                const update = jsonModel
                const options = { upsert: true, returnNewDocument: true}
                var result = await ModelUnit.updateOne(filter,update,options)
                //CMZ comment
                /*if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                    result.value = jsonModel;
                }*/
                //result = JSON.parse(JSON.stringify(result))
                resolve(result)
                       
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
      
    }
    
    //OK
    static async saveJsonKeywords (modelMetaData){
        return new Promise(async (resolve, reject) => {
            try{
                modelMetaData.keywords.forEach(async(k) => {
                    const filter = {keyword: k, modelIdValue: modelMetaData.idValue }
                    const update = {keyword: k, modelIdValue: modelMetaData.idValue }
                    const options = { upsert: true, returnNewDocument: true}
                    
                    await Keyword.updateOne(filter,update,options)
                    //CMZ comment
                    /*if (result.lastErrorObject.n===1 && result.lastErrorObject.updatedExisting===false ){
                        result.value = replacement;
                    }*/
                })

                resolve()
                       
            }catch(error){
                console.log(error)
                reject(error);
            }
        }) 
      
    }
}

module.exports = FilesServices