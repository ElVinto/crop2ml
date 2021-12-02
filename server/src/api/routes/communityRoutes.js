var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

CommunityServices = require('../../services/CommunityServices.js');

//OK
router.post('/createCommunity',  async function(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
        if (err) {
        return res.status(400).json({ error: err.message });
        }

        try {
            let file = files["picture"]
            if (file != null) {
                const oldpath = path.resolve(file.path);
                const new_relative_path = 'data/community_images/' + JSON.parse(fields.picture)
                const newpath = path.resolve(new_relative_path);
                fs.rename(oldpath, newpath, function (err) {
                    if (err) throw err
                    console.log('Successfully renamed - AKA moved!')
                })
            }
        } catch(error){
            console.log(error)
        } finally {
            try {
                const result = await CommunityServices.saveCommunity(fields)
                res.send(result);
            } catch (error) {
                console.log(error)
                res.send(error.message);
            }
        }
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