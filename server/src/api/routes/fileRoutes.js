var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var mv = require('mv')
var fs = require('fs');

FileServices = require('../../services/FileServices.js');

router.get('/data',async function(req,res,next){
    // const foldername = req.query.folder;
    var filePath = path.resolve(req.body.serverFilePath);
    res = await FileServices.zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')
    console.log(res)
})

//OK
router.post('/uploadZip', async function(req, res, next) {

    const form = new formidable.IncomingForm();
    // Parse `req` and upload all associated files
    form.parse(req, async function(err, fields, files) {
        if (err) {
        return res.status(400).json({ error: err.message });
        }

        // TODO parse fields
        /*{
            tags: 'tag_cmz',
            fileName: 'zip_test.zip',
            packageName: 'zip_test',
            uploaderMail: 'charles.moszkowicz@gmail.com'
        }*/
        console.log(fields)
        console.log('files received')
        console.log(files)

        const [firstFileName] = Object.keys(files);
        const firstFile = files[firstFileName]
        const oldpath = path.resolve(firstFile.path);
        const zippath = path.resolve('data/zip/' + firstFileName);

        await mv(oldpath, zippath, async function(err) {  
            if (err)
                throw err;

            try {
                const packageName =  firstFileName.replace('.zip','')
                const packagesPath = 'data/packages/'
                const extractionMsg = await FileServices.extractZip(zippath,packagesPath)
                console.log(extractionMsg)
                //const newPackageNames =fs.readdirSync(packagesPath)
                //console.log('newPackageNames')
                //console.log(newPackageNames)

                const [savedJsonModels,extractedKeywords] = await FileServices.computeExtractedData('data/packages/'+packageName,fields)

                let tree = FileServices.getDirTree('data/packages/'+packageName)
                tree.name = fields.packageName

                const result = {
                    tree,
                    extractedKeywords
                }
                console.log('END post /upload');
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


router.get('/zipFolder',async function(req,res,next){
    // const foldername = req.query.folder;
     res = await FileServices.zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')
     console.log(res)
})

router.post('/zipFolder',async function(req,res,next){
    const foldername = req.body.folder;
    res = await FileServices.zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')
    console.log(res)
})

//OK
router.post('/downloadFile',async function(req,res,next){
    var filePath = path.resolve(req.body.serverFilePath);
    res.sendFile(filePath)
})

module.exports = router;