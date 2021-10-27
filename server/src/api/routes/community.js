var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var mv = require('mv')

CommunityServices = require('../../services/communityServices.js');

router.post('/createCommunity',  async function(req, res, next) {

    console.log('START post /createCommunity')

    const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, async function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    console.log('fields')
    console.log(fields)

    console.log('files received')
    console.log(JSON.parse(JSON.stringify(files)))


    // log first file name
    const [firstFileName] = Object.keys(files);

    console.log('filename')
    console.log({ filename: firstFileName })

    const firstFile = files[firstFileName]

    
    const oldpath = path.resolve(firstFile.path);
    console.log(oldpath)

    const new_relative_path = 'server/data/community_images/' + firstFileName
    const newpath = path.resolve(new_relative_path);
    console.log(newpath)

    mv(oldpath, newpath, async function(err) {  
        if (err)
            throw err;

        try {

            fields['image_path']= JSON.stringify(new_relative_path)

            const result = await CommunityServices.saveCommunity(fields)

            console.log(result);

            console.log('END post /createCommunity');

            res.send(JSON.parse(JSON.stringify(result)));

        } catch (error) {
            console.log(error)
            res.send(error.message);
        }

      });

  });
     
});


router.get('/getAllCommunities',async function(req, res, next){

    try{
        let communities = await CommunityServices.getAllCommunities()
        if(communities){
            res.send(communities)
        }else{
            res.send(`No communities has been found`)
        }
        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

module.exports = router;