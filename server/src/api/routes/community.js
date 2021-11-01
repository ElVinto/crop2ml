var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var mv = require('mv')

CommunityServices = require('../../services/communityServices.js');

//OK
router.post('/createCommunity',  async function(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
        if (err) {
        return res.status(400).json({ error: err.message });
        }

        const [firstFileName] = Object.keys(files);
        const firstFile = files[firstFileName]
        const oldpath = path.resolve(firstFile.path);
        const new_relative_path = 'data/community_images/' + firstFileName
        const newpath = path.resolve(new_relative_path);

        mv(oldpath, newpath, async function(err) {  
            if (err)
                throw err;
            try {
                fields['image_path']= JSON.stringify(new_relative_path)
                const result = await CommunityServices.saveCommunity(fields)
                res.send(result);
            } catch (error) {
                console.log(error)
                res.send(error.message);
            }
        });
  });
});

//OK
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