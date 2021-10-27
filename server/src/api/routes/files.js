var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var mv = require('mv')
var fs = require('fs');
dirTree = require('../../services/DirTree.js');

FilesServices = require('../../services/filesServices.js');

router.post('/uploadZip',  async function(req, res, next) {

    console.log('START post /uploadZip')

    const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, async function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    // TODO parse fields
    // {
    //     tags: 't,r,e,tag2,tag3,tag5',
    //     fileName: 'SQ_Energy_Balance-master.zip',
    //     repositoryName: 'SQ_Energy_Balance-master'
    //   }

    console.log('files received')
    console.log(JSON.parse(JSON.stringify(files)))

    const [firstFileName] = Object.keys(files);
    const firstFile = files[firstFileName]
    const oldpath = path.resolve(firstFile.path);
    const zippath = path.resolve('./server/data/zip/' + firstFileName);

    // mv(oldpath, zippath, function(err) {
    //     // done. it tried fs.rename first, and then falls back to
    //     // piping the source file to the dest file and then unlinking
    //     // the source file.

    //     console.log(firstFile.path)
    //     console.log(oldpath)
    //     console.log(zippath)

    //     if(err){
    //         throw err 
    //     }

    //     console.log("file copied")
    //   });

    // await fs.rename(oldpath, zippath, async function (err) {
    await mv(oldpath, zippath, async function(err) {  
        if (err)
            throw err;

        try {
            const zipPackageName =  firstFileName.replace('.zip','')
            const packagesPath = './server/data/packages/'
            const extractionMsg = await FilesServices.extractZip(zippath,packagesPath)
            console.log(extractionMsg)
            const newPackageNames =fs.readdirSync(packagesPath)
            console.log('newPackageNames')
            console.log(newPackageNames)

            const [savedJsonModels,extractedKeywords] = await FilesServices.addModelsFrom('server/data/packages/'+zipPackageName+'/crop2ml',fields)

            // 
            // get Package Tree
            let tree = dirTree.getDirTree('server/data/packages/'+zipPackageName)
            tree.name = fields.packageName
            //   console.log('tree: ')
            //   console.log(tree)

            // Add all model 

            const result = {
                tree,
                extractedKeywords
            }

            console.log('END post /upload');

            res.send(JSON.parse(JSON.stringify(result)));

        } catch (error) {
            console.log(error)
            res.send(error.message);
        }

      });
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


router.get('/zipFolder',async function(req,res,next){
    // const foldername = req.query.folder;
     res = await FilesServices.zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')
     console.log(res)
})

router.post('/zipFolder',async function(req,res,next){
    const foldername = req.body.folder;
    res = await FilesServices.zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')
    console.log(res)
})

router.post('/downloadFile',async function(req,res,next){

    console.log( 'START /downloadFile ')
    
     var filePath = path.resolve(req.body.serverFilePath);

     console.log(filePath)

     console.log( 'END /downloadFile ')

     res.sendFile(filePath)

})

module.exports = router;