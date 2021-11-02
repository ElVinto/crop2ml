var path = require('path');
var fs = require('fs');
var unzipper = require('unzipper')
var archiver = require('archiver');
var fs = require('fs');
var xml2js = require('xml2js');
const directoryTree = require("directory-tree");

ModelServices = require('./ModelServices.js');

class FileServices {

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
    static async computeExtractedData(dirPath, modelMetaDataPart){
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
                    let savedJsonModel = await ModelServices.saveModel(jsonModel)
                    savedJsonModels.push(savedJsonModel)
    
                    await ModelServices.saveKeywords(jsonModel.metaData)
                    
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

    /*
    dirTree: {
        name: "file or directory name"
        path: "path on server"
        size: number
        type: "directory"|"file"

        extension: "." (if file)
        children: array of dirTree (if directory)
    }
    */

    static createDirTree = (path) =>{
        return directoryTree(path)
    }
    
    static getDirTree(path){
        return this.createDirTree(path)
    }
    
    static getDisplayedDirTree(path){
        let pathDirTree = this.createDirTree(path)
        let displayedDirTree = {}
        // this.clean(pathDirTree,displayedDirTree)
        displayedDirTree = this.retainExtensions(pathDirTree,['.xml'])
        return displayedDirTree;
    }

    static retainExtensions(argDirTree, extensions ){
        if(argDirTree.type ==='file' ){
            if(extensions.includes(argDirTree.extension)){
                return {
                    name: argDirTree.name,
                    // id: `${argDirTree.name}_TestId`
                }
            }else{
                return null;
            }
        }else{
            let nvDirTreeChildren = [];
            for(let argDirTreeChild of argDirTree.children){
                let nvDirTreeChild = this.retainExtensions(argDirTreeChild, extensions)
                if(nvDirTreeChild!=null && nvDirTreeChild.hasOwnProperty('name')){
                    nvDirTreeChildren.push(nvDirTreeChild)
                }
            }
            if(nvDirTreeChildren.length>0){
                let newName = argDirTree.name==='packages'?'models':argDirTree.name;
                return {
                    name: newName,
                    // id: `${argDirTree.name}_TestId`,
                    children: nvDirTreeChildren
                } 
            }
            
        }
    }

     /*static clean (argDirTree, nvDirTree){
        nvDirTree['name']= argDirTree.name

        if(argDirTree.children){
            nvDirTree['children'] = []
            for(let argDirTreeChild of argDirTree.children ){

                // console.log(argDirTreeChild)
                let nvTreeNode = {};
                nvDirTree['children'].push(nvTreeNode)
                this.clean(argDirTreeChild,nvTreeNode)

                // nvDirTree['children'].push({})
                // this.clean(argDirTreeChild,nvDirTree['children'][nvDirTree['children'].length-1])
                
            }
            return 
        }
    }*/

}

module.exports = FileServices