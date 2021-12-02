var path = require('path');
var fs = require('fs');
var unzipper = require('unzipper')
var archiver = require('archiver');
var mv = require('mv')
var xml2js = require('xml2js');
const UserServices = require('./UserServices.js');
const ModelServices = require('./ModelServices.js');

class FileServices {

    /**
     * @param {String} source
     * @param {String} out 
     * @returns {Promise}
     */
    /*static async zipDirectory(source, out) {
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
    }*/
    
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
    static async computeExtractedData(tempDir, fileName, fields){
        return new Promise(async (resolve,reject)=>{
            try {
                let tempZipPath = path.resolve(path.join(tempDir,'zip',fileName));
                let tempUnzippedDir = path.resolve(path.join(tempDir,'unzipped'));
                const getDirectories = fs.readdirSync(tempUnzippedDir, { withFileTypes: true })
                        .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith("__MACOSX"))
                        .map(dirent => dirent.name)
                let tempPackageName = getDirectories[0]
                let tempPackagePath = path.join(tempUnzippedDir, tempPackageName)
                let crop2mlFolder = path.join(tempPackagePath, 'crop2ml')
                let picturesFolder = path.join(tempPackagePath, 'doc', 'images')
                let pictures = fs.readdirSync(picturesFolder)
                let xmlFiles = fs.readdirSync(crop2mlFolder).filter(name => name.includes('.xml'))
                let xmlComposition = xmlFiles.filter(name => name.startsWith("composition."))
                let xmlUnits = xmlFiles.filter(name => name.startsWith("unit."))
                let metaData = JSON.parse(fields.metaData)
                let administratorsMails = metaData.administratorsMails
                administratorsMails.push(metaData.uploaderMail)
                let editorsMails = metaData.editorsMails
                let keywords = []
                
                // Compute composition model
                if (xmlComposition.length == 0){
                    resolve()
                    return
                }
                else {
                    let modelCompo = await this.xmlFile2jsonModel(crop2mlFolder +'/'+ xmlComposition[0])
                    
                    // check if model and version exists and if so, delete zip and unzipped folder
                    let model  = await ModelServices.getModelById(modelCompo.Attributs.id)
                    if (model != null){
                        let versionExists = model.versionsList.includes(modelCompo.Attributs.version)
                        if (versionExists){
                            try {
                                this.deleteDir(tempDir)
                            } catch (error) {
                                console.log(error)
                            }
                            resolve([false, modelCompo.Attributs.id, keywords, model])
                            return
                        } else if(!model.administratorsMails.includes(metaData.uploaderMail)) {
                            resolve([false, modelCompo.Attributs.id, keywords, model])
                            return
                        }
                    } else {
                        model = {
                            id: modelCompo.Attributs.id,
                            versionsList: [],
                            versions: []
                        }
                    }

                    // Compute and add unit models into modelCompo
                    for(let xmlFile of xmlUnits ){
                        let unitModel = await this.xmlFile2jsonModel(crop2mlFolder +'/'+ xmlFile)
                        let index = modelCompo.Composition.Model.findIndex(m => m.Attributs.id == unitModel.Attributs.id)
                        modelCompo.Composition.Model[index].ModelContent = unitModel
                    }

                    // Move zip and package folder
                    let packagesDir = "data/packages"
                    let zipDir = "data/zip"
                    //let oldPackageName = packageName
                    //let oldZipName = packageName + ".zip"
                    let packageName = modelCompo.Attributs.id + "_" + modelCompo.Attributs.version
                    let zipName = packageName + ".zip"
                    let packagePath = path.resolve(path.join(packagesDir, packageName))
                    let zipPath = path.resolve(path.join(zipDir, zipName))
                    await mv(tempZipPath, zipPath, async function(err) {})
                    await mv(tempPackagePath, packagePath, async function(err) {})
                    this.deleteDir(tempDir)

                    // Add keywords and others metaData to modelCompo
                    keywords = keywords.concat(modelCompo.Description.Authors.split(' ').filter(s => s.length))
                    keywords = keywords.concat(modelCompo.Description.Institution.split(' ').filter(s => s.length && !keywords.includes(s) ))
                    keywords = keywords.concat(modelCompo.Attributs.id.split('.').filter(s => s.length>0  && !keywords.includes(s)))
                    modelCompo["metaData"]={uploaderMail:metaData.uploaderMail, packageName, zipName, keywords, pictures} //TODO CMZ : check metaData

                    // Add metaData and model compo to model
                    model.versionsList.push(modelCompo.Attributs.version)
                    model.versions.push(modelCompo)
                    let addedFields={administratorsMails, editorsMails, linkedCommunity:metaData.linkedCommunity, modelType:metaData.modelType, largerModelPackageNames:metaData.largerModelPackageNames}
                    Object.assign(model, addedFields);

                    //save model
                    await ModelServices.saveModel(model)

                    //manage contributors
                    for (let i in editorsMails) {
                        await UserServices.addRole(editorsMails[i], model.id, "editor")
                    }
                    for (let i in administratorsMails) {
                        await UserServices.addRole(administratorsMails[i], model.id, "administrator")
                    }
                    // Notif users by mail
                    let contributors = administratorsMails.concat(editorsMails)
                    contributors=[...new Set(contributors)] //to remove duplicates
                    contributors.forEach (async(contrib) => {
                        if (contrib != metaData.uploaderMail)
                            await UserServices.notifyContributor(contrib, metaData.packageName)
                    })
                    
                    resolve([true, packageName, keywords, model]) //TODO also resolve admin and editors to update after save (instead of before)
                    
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    //OK
    static deleteFile(filePath){
        try{
            fs.unlinkSync(path.resolve(filePath))
        }catch(error) {
            console.log(error);
        }
    }

    //OK
    static deleteDir(dir){
        try{
            fs.rmdirSync(path.resolve(dir), { recursive: true });
        }catch(error) {
            console.log(error);
        }
    }
    
    //OK
    static async xmlFile2jsonModel(xmlFPath){
        
        return new Promise((resolve,reject)=>{
            try {

                function setIdAttribute(name){
                    if (name == "modelid")
                        return "id"
                    else
                        return name
                }
                let fileData = fs.readFileSync(path.resolve(xmlFPath))
                let parser = new xml2js.Parser({
                    attrkey: "Attributs",
                    explicitRoot: false,
                    explicitArray: false,
                    attrNameProcessors: [setIdAttribute]
                });
                parser.parseStringPromise(fileData).then(
                    result => {
                        resolve( result)
                    }
                )
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = FileServices