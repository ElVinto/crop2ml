var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var mv = require('mv')
var fs = require('fs');

FileServices = require('../../services/FileServices.js');

/*router.get('/data', async function(req,res,next){
    // const foldername = req.query.folder;
    var filePath = path.resolve(req.body.serverFilePath);
    res = await FileServices.zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')
    console.log(res)
})*/

//OK
router.get('/downloadZip', async function(req,res,next){
    var filePath = path.resolve(path.join('data','zip',req.query.zipName))
    res.download(filePath);
})

/*
router.post('/downloadFile',async function(req,res,next){
    var filePath = path.resolve(req.body.serverFilePath);
    res.sendFile(filePath)
})*/

//OK
router.post('/uploadZip', async function(req, res, next) {

    const form = new formidable.IncomingForm();
    // Parse `req` and upload all associated files
    form.parse(req, async function(err, fields, files) {
        if (err) {
        return res.status(400).json({ error: err.message });
        }

        console.log(fields)
        console.log('files received')
        console.log(files)

        const [fileName] = Object.keys(files);
        const file = files[fileName]
        const oldpath = path.resolve(file.path);
        const tempDir = 'data/temp/' + Date.now()
        const tempZipDir = path.resolve(path.join(tempDir,'zip'));
        const tempZipPath = path.resolve(path.join(tempZipDir, fileName));
        const tempUnzippedDir = path.resolve(path.join(tempDir,'unzipped'));
        if (!fs.existsSync(tempZipDir)){
            fs.mkdirSync(tempZipDir, { recursive: true });
        }
        if (!fs.existsSync(tempUnzippedDir)){
            fs.mkdirSync(tempUnzippedDir, { recursive: true });
        }

        await mv(oldpath, tempZipPath, async function(err) {
            if (err)
                throw err;

            try {
                let packageName =  fileName.replace('.zip','')
                const packagesPath = 'data/packages/'
                const extractionMsg = await FileServices.extractZip(tempZipPath, tempUnzippedDir)
                console.log(extractionMsg)
                let extractedKeywords
                [success, packageName, extractedKeywords,model] = await FileServices.computeExtractedData(tempDir, fileName, fields)
                let tree = null
                if (success) {
                    tree = FileServices.getDirTree(path.join(packagesPath, packageName))
                    tree.name = packageName
                }
                const result = {
                    tree,
                    extractedKeywords,
                    success,
                    model,
                }
                res.send(result);
            } catch (error) {
                console.log(error)
                res.send(error.message);
            }
        });
    });
});


/*router.post('/packageTree',  function(req, res, next) {
    console.log('START post /packageTree')
    const packagesPath = './server/data/packages/'
    
    // Log packageNames
    // const packageNames =fs.readdirSync(packagesPath)
    // console.log('packageNames')
    // console.log(packageNames)

    let tree = FileServices.getDisplayedDirTree(packagesPath)
    console.log('tree: ')
    console.log(tree)
    console.log('END post /packageTree');
    res.send(JSON.parse(JSON.stringify(tree)));
})*/


/*router.get('/zipFolder',async function(req,res,next){
    // const foldername = req.query.folder;
     res = await FileServices.zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')
     console.log(res)
})

router.post('/zipFolder',async function(req,res,next){
    const foldername = req.body.folder;
    res = await FileServices.zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')
    console.log(res)
})*/

module.exports = router;