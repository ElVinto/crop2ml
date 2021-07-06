var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var unzipper = require('unzipper')
var archiver = require('archiver');

const directoryTree = require("directory-tree");


var mangodb = require('mongodb')
// const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority"
var uri = "mongodb://localhost:27017"
var MONGODB_HOST = 'mongodb://localhost/test'

var eyes = require('eyes');
var https = require('https');




const lineReader = require('line-reader');

var StringBuffer = require("stringbuffer");


var xml2js = require('xml2js');
dirTree = require('../../services/DirTree.js');



router.post('/upload',  async function(req, res, next) {

    console.log('START post /upload')

    const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    console.log('files received')
    console.log(JSON.parse(JSON.stringify(files)))

    // log first file name
    const [firstFileName] = Object.keys(files);
    console.log({ filename: firstFileName })

    const firstFile = files[firstFileName]

    const oldpath = firstFile.path;
    const zippath = './server/data/xml/' + firstFileName;
    fs.rename(oldpath, zippath, function (err) {
        if (err) throw err;

        try{

            console.log('saveXMLModelUnit')
            // let xmlurl =  req.query.xmlurl;
            // console.log(req.query)
            
            // Parse xml url
            const xmlString = fs.readFileSync (zippath)
            // console.log('parsed xmlString')
            // console.log(xmlString)
    
            // Tranform to JSON object
            
            xmlString2jsonObj(xmlString).then(jsonModel => {

                console.log('jsonModel')
                console.log(jsonModel)
    
                // Save or update JSON object
                // result = await saveJsonModelUnit(jsonModel)
                saveJsonModelUnit(jsonModel)
                .then((result) =>{
    
                    // res.send(jsonObj2xmlString(jsonModel))
                    res.send(result)

                    // res.write("File "+firstFileName+' uploaded and moved!');
                    // res.end();
                })
                .catch( (error) => {
                    console.log(error)
                    
                    res.send(error.message)
                })
    
            

            })
    
            
    
        }catch(error){
            res.send(error.message)
        }
        
    });



    console.log('END post /upload')

    // res.json({ filename: firstFileName });

  });
     
});


router.post('/uploadZip',  async function(req, res, next) {

    console.log('START post /uploadZip')

    const form = new formidable.IncomingForm();
  // Parse `req` and upload all associated files
  form.parse(req, async function(err, fields, files) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    console.log('files received')
    console.log(JSON.parse(JSON.stringify(files)))

    // log first file name
    const [firstFileName] = Object.keys(files);

    console.log('filename')
    console.log({ filename: firstFileName })

    const firstFile = files[firstFileName]

    const oldpath = firstFile.path;
    const zippath = './server/data/zip/' + firstFileName;
    await fs.rename(oldpath, zippath, async function (err) {
          if (err)
              throw err;

          try {
              console.log('zip fil saved');
              console.log(zippath);

              const zipPackageName = firstFileName.replace('.zip','')

              const packagesPath = './server/data/packages/'
              

              const extractionMsg = await extractZip(zippath,packagesPath)
              console.log(extractionMsg)


              const newPackageNames =fs.readdirSync(packagesPath)
              console.log('newPackageNames')
              console.log(newPackageNames)

                // get most recent folder does not work
                //   const mostRecentDir = getMostRecentDir(packagesPath).dirName
                //   console.log('mostRecentDir');
                //   let tree = directoryTree('./server/data/packages/'+mostRecentDir);

            
              // 
              // get Package Tree
              let tree = dirTree.getDirTree('server/data/packages/'+zipPackageName)
              console.log('tree: ')
              console.log(tree)

              // Add all model units

              
              

              console.log('END post /upload');

              res.send(JSON.parse(JSON.stringify(tree)));

              // TODO the package in json DB.

          } catch (error) {
              console.log(error)
              res.send(error.message);
          }

      });

    

    // res.json({ filename: firstFileName });

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


function getMostRecentDir (dir) {
    const files = orderReccentFiles(dir);

    return files.length ? files[0] : undefined;
};

function orderReccentFiles (dir) {
                  fs.readdirSync(dir)
                      .filter(fName => fs.lstatSync(dir+'/'+fName).isDirectory())
                      .map(dirName => ({ dirName, atime: fs.lstatSync(dir+'/'+dirName).atime }))
                      .sort((a, b) => b.atime.getTime() - a.atime.getTime());
}


function extractZip(source, dest){

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


router.get('/zipFolder',async function(req,res,next){
    
    // const foldername = req.query.folder;

     res = await zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')

     console.log(res)
    

})

router.post('/zipFolder',async function(req,res,next){
    
    const foldername = req.body.folder;

     res = await zipDirectory('./server/data/xml','./server/data/zipped/xml.zip')

     console.log(res)
    

})



/**
 * @param {String} source
 * @param {String} out 
 * @returns {Promise}
 */
function zipDirectory(source, out) {
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



async function xmlString2jsonObj(xmlString){
    const parser = new xml2js.Parser({
        attrkey: "Attributs",
        explicitRoot: true,
        rootName:'ModelUnit',
        explicitArray:false,
        cdata: true
    })
    result = await parser.parseStringPromise(xmlString)

    return result
}

async function saveJsonModelUnit (jsonModelUnit){

    return new Promise((resolve, reject) => {
        console.log('saveJsonModelUnit')
        try{
            const mongoose = require('mongoose')
            mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
            const db = mongoose.connection;
            
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function(){

                try{
                    console.log(`succesful connection to ${MONGODB_HOST}` )

                    const ModelUnit = buildMongooseModelUnit(mongoose)

                    const receivedModelUnit = new ModelUnit(jsonModelUnit)

                    await  receivedModelUnit.validate();

                    model_name = jsonModelUnit.ModelUnit.Attributs.name

                    console.log(`insert or update : {'ModelUnit.Attributs.name': ${model_name} } `)
                    result = await ModelUnit.findOneAndUpdate(
                            {'ModelUnit.Attributs.name': model_name},
                            {ModelUnit: jsonModelUnit.ModelUnit},
                            {new:true, upsert: true, useFindAndModify: false}
                        ).exec()
                    
                    // console.log(result)

                    result = JSON.parse(JSON.stringify(result))
                    
                    db.close();
                    resolve(result)

                }catch(error){
                    db.close();
                    reject(error)
                }
            });
            
        }catch (err) { 
            resolve(err.message)
            // reject(err); 
        }
    })   
}

function buildMongooseModelUnit(mongoose){

    if(mongoose.modelNames().find(e => e==='ModelUnit')){
        return mongoose.model('ModelUnit')
    }

    const OutputValueSchema = new mongoose.Schema({
        Attributs:{
            name: {type: String, required: true}, // CADTA #REQUIRED
            description: {type: String, required: false}, // CADTA #REQUIRED
            precision: {type: String, required: false} // CADTA #REQUIRED
        },
        _: {type: String, required: true} // CADTA #REQUIRED
    })

    const InputValueSchema = new mongoose.Schema({
        Attributs:{
            name: {type: String, required: true} // CADTA #REQUIRED
        },
        _: {type: String, required: true} // CADTA #REQUIRED
    })

    const TestSchema = new mongoose.Schema({
        Attributs:{
            name: {type: String, required: true}, // CADTA #REQUIRED
            description: {type: String, required: false}, // CDATA #IMPLIED
            uri: {type: String, required: false} // CDATA #IMPLIED
        },
        InputValue:{type:[InputValueSchema], required: false},
        OutputValue:{type:[OutputValueSchema], required: false},
    })

    const TestsetSchema = new mongoose.Schema({
        Testset:[{
            Attributs:{
                name: {type: String, required: true}, // CDATA #REQUIRED
                description: {type: String, required: true}, // CDATA #REQUIRED
                parameterset: {type: String, required: true}, // NMTOKEN #REQUIRED
                uri: {type: String, required: false} // CDATA #IMPLIED
            },
            Test :{type: [TestSchema], required: false }
        }]
    })

    const ParamSchema = new mongoose.Schema({
        Attributs:{
            name: {type: String, required: true}, // NMTOKEN #REQUIRED
        },
        _: {type: String, required: true}, // NMTOKEN #REQUIRED
    })

    const ParametersetSchema = new mongoose.Schema({
        Parameterset:[{
            Attributs:{
                description: {type: String, required: true}, // CDATA #REQUIRED
                name: {type: String, required: true}, // NMTOKEN #REQUIRED
                uri: {type: String, required: false} // CDATA #IMPLIED
            },
            Param :{type: [ParamSchema], required: false }
        }]
    }
        
    );

    const AlgorithmSchema = new mongoose.Schema(
        {  
            Attributs:{
                language: {type: String, required: true}, // CDATA #REQUIRED
                platform: {type: String, required: false}, // CDATA #IMPLIED
                filename: {type: String, required: false}, //  CDATA #IMPLIED
                function: {type: String, required: false} // CDATA #IMPLIED
            }
        },
        {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options
    );

    const FunctionSchema = new mongoose.Schema(
        {
            name: {type: String, required: true}, // CDATA #REQUIRED
	        language: {type: String, required: true}, // CDATA #REQUIRED
	        filename: {type: String, required: false}, // CDATA #IMPLIED
	        type: {
                type: String,
                required: false,
                enum:['internal','external'] //  (internal|external) #REQUIRED
            }, 
	        description: {type: String, required: false}, // CDATA #IMPLIED>

        },
        {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options

    );


    const OutputSchema = new mongoose.Schema(
        {
            Output:[{ 
                Attributs:{
                    name: {type: String, required: true}, //  NMTOKEN #REQUIRED
                    datatype: {
                        type: String,
                        required: [true,`datatype  required for path Attributs.datatype `],
                        enum: ['STRING', 'STRINGARRAY', 'STRINGLIST', 'DATE','DATEARRAY','DATELIST','DOUBLE','DOUBLEARRAY','DOUBLELIST','INT','INTARRAY','INTLIST','BOOLEAN']
                        
                    }, 
                    description: {type: String, required: false}, // CDATA #REQUIRED
                    max: {type: String, required: false}, // TODO CDATA #IMPLIED
                    min: {type: String, required: false}, // TODO CDATA #IMPLIED
                    variablecategory: {
                        type: String,
                        required: false,
                        enum: ['state', 'rate', 'auxiliary']
                    }, 
                    unit: {type: String, required: true}, //CDATA #REQUIRED
                    uri: {type: String, required: false}, //CDATA #IMPLIED
                }
            }]
        },
        {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options
    );


    const InputSchema = new mongoose.Schema(
        {
            Input: [{
                Attributs:{
                    name: {type: String, required:true}, // TODO NMTOKEN #REQUIRED
                    datatype: {
                        type: String,
                        required: true,
                        enum: ['STRING','STRINGARRAY','STRINGLIST','DATE','DATEARRAY','DATELIST','DOUBLE','DOUBLEARRAY','DOUBLELIST','INT','INTARRAY','INTLIST','BOOLEAN']
                    }, 
                    description: {type: String, required:true}, // CDATA #REQUIRED
                    default: {type: String, required: false}, // TODO CDATA #IMPLIED
                    max: {type: String, required: false}, // TODO CDATA #IMPLIED
                    min: {type: String, required: false}, // TODO CDATA #IMPLIED
                    inputtype: {type: String, required: true}, // (variable|parameter) #REQUIRED
                    parametercategory : {
                        type: String,
                        required: false,
                        enum: ['constant','species','genotypic','soil','private']
                    }, // TODO (constant|species|genotypic|soil|private) #IMPLIED
                    variablecategory : {
                        type: String,
                        required: false,
                        enum: ['state','rate','auxiliary']
                    }, 
                    unit: {type: String, required: true}, //  CDATA #REQUIRED
                    uri : {type: String, required: false}, // CDATA #IMPLIED>
                }
            }]
        },
        {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options
    );


    const DescriptionSchema = new mongoose.Schema(
        {
            Title: {type: String, required: true},
            Authors:{type: String, required: true},
            Institution: {type: String, required: true},
            URI:{trype: String, required: false},
            Reference: {type: String, required: false},
            Abstract: {type: String, required: true}
        },
        {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options
    );

    const ModelUnitSchema = new mongoose.Schema(
        {
            ModelUnit:{
                Attributs: {
                        name: {type: String, required:[true,'a model name is required']},
                        modelid: { type:String, required:[true,'a modelid is required']},
                        timestep: { type:String, required:[false,'a model timestep is required']},
                        version:{String, required:[false,'a model version is required']}
                    },

                Description: {type: DescriptionSchema, require:[true,'a model description is required ']},
                Inputs: {type: [InputSchema], required:false },
                Outputs: {type:[OutputSchema], required:false},
                Function:{type: FunctionSchema, require: false},
                Algorithm:{type: AlgorithmSchema, require: false},
                Parametersets:{type: [ParametersetSchema], require: true},
                Testsets:{type: [TestsetSchema], require: true},
            }
      },
      {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options
    );

    return mongoose.model('ModelUnit', ModelUnitSchema,'modelunits')
      
}




module.exports = router;