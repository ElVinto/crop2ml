var express = require('express');
var router = express.Router();


var mangodb = require('mongodb')
require('dotenv').config()
// const { URL } = require('url')
// const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority"
var MONGODB_URI = process.env('MONGODB_URI')
var MONGODB_REMOTE_HOST = 'mongodb://localhost/test'


var MONGODB_HOST = 'mongodb://localhost/test'



var eyes = require('eyes');
var https = require('https');

var fs = require('fs');
var path = require('path');

const lineReader = require('line-reader');

var StringBuffer = require("stringbuffer");


var xml2js = require('xml2js');

// Get Items /  references /mongodb-services set in index.js
router.get('/',  async function(req, res, next) {

    const items = await loadALlItems();
    res.send(items);
     
});

async function loadALlItems(){

    const client = await mangodb.MongoClient.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true});
    const itemsDriver =  client.db("test").collection("inventory");
    const items =  await itemsDriver.find({}).toArray();

    client.close()

    return items;
}


router.get('/url2json',async function(req, res, next){

    

    res.send(await parseXMLFromHTTP());

});

const defaultUrl = 'https://raw.githubusercontent.com/AgriculturalModelExchangeInitiative/STICS_SNOW/master/crop2ml/unit.Melting.xml'
// https://raw.githubusercontent.com/AgriculturalModelExchangeInitiative/STICS_SNOW/master/crop2ml/unit.Preciprec.xml

function parseXMLFromHTTP(url){
    const parser = new xml2js.Parser({
        attrkey: "Attributs",
        explicitRoot: false,
        // rootName:'ModelUnit',
        explicitArray:false,
        cdata: true
    })
    return new Promise((resolve, reject) => {
    try{
        https.get(url, function(res) {
            var response_data = '';
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                response_data += chunk;
            });
            res.on('end', function() {
                
                parser.parseString(response_data, function(err, result) {
                    if (err) {
                        console.log('Got error: ' + err.message);
                    } else {
                        eyes.inspect(result);
                        console.log('Done.');
                        resolve(result)
                    }
                });
            });
            res.on('error', function(err) {
                console.log('Got error: ' + err.message);
            });
        });

    } catch (err) { 
        reject(err); 
    }})
}

async function getFileFromUrl(url){
    return new Promise((resolve, reject) => {
        try{
            https.get(url, function(res) {
                var response_data = '';
                res.setEncoding('utf8');
                res.on('data', function(chunk) {
                    response_data += chunk;
                });
                res.on('end', function() {
                    resolve(response_data)
                });
                res.on('error', function(err) {
                    console.log('Got error: ' + err.message);
                });
            });
    
        } catch (err) { 
            reject(err); 
        }})
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

function jsonObj2xmlString(jsonObj){
    console.log('jsonObj2xmlString')
    console.log('jsonObj')
    console.log(jsonObj)

    
    builder = new xml2js.Builder({
        attrkey: "Attributs"
        // , headless: true
        , explicitRoot: true
        , rootName:'ModelUnit'
        , explicitArray: false
        , cdata:true
        , xmldec:{ 'version': '1.0', 'encoding': 'UTF-8' }
        , doctype: {'sysID': 'https://raw.githubusercontent.com/AgriculturalModelExchangeInitiative/crop2ml/master/ModelUnit.dtd'}
        })
    
    xmlString =   builder.buildObject(jsonObj).toString();
    
    console.log('xmlString')
    console.log(xmlString)
    
    result = formatXml( xmlString , ['_id'])
    return result

}

router.get('/json',async function(req, res, next){
    

    
    console.log('GET JSON')

    console.log(req.query)

    res.send(await parseXMLFromFile());
});


// TODO

// findXMLModelUnit
 



router.get('/saveXMLModelUnit',async function(req, res, next){

    try{
        console.log('/saveXMLModelUnit')
        let xmlurl =  req.query.xmlurl;
        console.log(req.query)
        
        // Parse xml url
        xmlString = await getFileFromUrl(xmlurl)
        // console.log('parsed xmlString')
        // console.log(xmlString)

        // Tranform to JSON object
        jsonModel = await xmlString2jsonObj(xmlString)

        console.log('jsonModel')
        console.log(jsonModel)

        // Save or update JSON object
        // result = await saveJsonModelUnit(jsonModel)
        saveJsonModelUnit(jsonModel)
            .then((result) =>{

                // res.send(jsonObj2xmlString(jsonModel))
                res.send(result)
            })
            .catch( (error) => {
                console.log(error)
                
                res.send(error.message)
            })

        

    }catch(error){
        res.send(error.message)
    }

});


router.get('/saveJsonModelUnit',async function(req, res, next){

    try{
        console.log('/saveJsonModelUnit')
        let model_name =  req.query.name;

        jsonTestModel = await createTestModelUnit(model_name)

        console.log('jsonTestModel')
        console.log(jsonTestModel)

        result = await saveJsonModelUnit(jsonTestModel)
        res.send(result)

    }catch(error){
        console.log(error)
        res.send(error.message)
    }

});

router.post('/saveJsonModelUnit',async function(req, res, next){

    try{
        console.log('Post /saveJsonModelUnit')

        let modelUnit =  req.body.modelUnit;

        console.log(modelUnit)

        result = await saveJsonModelUnit(modelUnit)
        res.send(result)

    }catch(error){
        console.log(error)
        res.send(error.message)
    }

});


router.get('/findXMLModelUnit',async function(req, res, next){

    try{
        let model_name =  req.query.name;
        jsonModelUnit = await findJsonModelUnit(model_name)
        if(jsonModelUnit){
            xmlModelUnit = jsonObj2xmlString(jsonModelUnit)
            res.send(xmlModelUnit)
        }else{
            res.send(`ModelUnit ${model_name} NOT FOUND, the model has to be recorded first.`)
        }

        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

router.get('/findJsonModelUnit',async function(req, res, next){

    try{
        let model_name =  req.query.name;
        jsonModelUnit = await findJsonModelUnit(model_name)
        if(jsonModelUnit){
            res.send(jsonModelUnit)
        }else{
            res.send(`ModelUnit ${model_name} NOT FOUND, the model has to be recorded first.`)
        }

        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});


async function findJsonModelUnit (model_name){

    return new Promise((resolve, reject) => {
        try{
            const mongoose = require('mongoose')
            mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
            const db = mongoose.connection;
            
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function(){

                console.log(`succesful connection to ${MONGODB_HOST}` )

                const ModelUnit = buildMongooseModelUnit(mongoose)

                console.log(`findOne : {'ModelUnit.Attributs.name': '${model_name}' } `)
                result = await ModelUnit.findOne({'ModelUnit.Attributs.name': model_name },{'_id':0, '__v':0})
                
                db.close();

                // console.log('\n result: ')
                // console.log(result)

                // console.log('\n JSON.stringify(result)')
                // console.log(JSON.stringify(result))

                // console.log('\n JSON.parse(JSON.stringify(result))')
                // console.log(JSON.parse(JSON.stringify(result)))

                result = JSON.parse(JSON.stringify(result))

                resolve(result)
            });
            
        }catch (err) { 
            reject(err); 
        }
    })
    
}

router.post('/findJsonModelUnitById',async function(req, res, next){

    try{
        let modelid =  req.body.modelid;
        jsonModelUnit = await findJsonModelUnitById(modelid)
        if(jsonModelUnit){
            res.send(jsonModelUnit)
        }else{
            res.send(`ModelUnit ${modelid} NOT FOUND, the model has to be recorded first.`)
        }

        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});


async function findJsonModelUnitById (modelid){

    return new Promise((resolve, reject) => {
        try{
            const mongoose = require('mongoose')
            mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
            const db = mongoose.connection;
            
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function(){

                console.log(`succesful connection to ${MONGODB_HOST}` )

                const ModelUnit = buildMongooseModelUnit(mongoose)

                console.log(`findOne : {'ModelUnit.Attributs.modelid': '${modelid}' } `)
                result = await ModelUnit.findOne({'ModelUnit.Attributs.modelid': modelid },{'_id':0, '__v':0})
                
                db.close();

                // console.log('\n result: ')
                // console.log(result)

                // console.log('\n JSON.stringify(result)')
                // console.log(JSON.stringify(result))

                // console.log('\n JSON.parse(JSON.stringify(result))')
                // console.log(JSON.parse(JSON.stringify(result)))

                result = JSON.parse(JSON.stringify(result))

                resolve(result)
            });
            
        }catch (err) { 
            reject(err); 
        }
    })
    
}




router.get('/findAllJsonModelUnits',async function(req, res, next){

    try{
        jsonModelUnits = await findAllJsonModelUnits()
        if(jsonModelUnits){
            res.send(jsonModelUnits)
        }else{
            res.send(`No ModelUnit has been found`)
        }
        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});


async function findAllJsonModelUnits (){

    return new Promise((resolve, reject) => {
        try{
            const mongoose = require('mongoose')
            mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
            const db = mongoose.connection;
            
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function(){

                console.log(`succesful connection to ${MONGODB_HOST}` )

                const ModelUnit = buildMongooseModelUnit(mongoose)

                console.log(`find : {} `)
                // result = await ModelUnit.find({},{'ModelUnit.Attributs.name': 1, 'ModelUnit.Attributs.modelid':1})
                result = await ModelUnit.find({})
                
                db.close();

                // console.log('\n result: ')
                // console.log(result)

                // console.log('\n JSON.stringify(result)')
                // console.log(JSON.stringify(result))

                // console.log('\n JSON.parse(JSON.stringify(result))')
                // console.log(JSON.parse(JSON.stringify(result)))

                result = JSON.parse(JSON.stringify(result))

                resolve(result)
            });
            
        }catch (err) { 
            reject(err); 
        }
    })
    
}



router.get('/findAllJsonModelUnitSummaries',async function(req, res, next){

    try{
        jsonModelUnits = await findAllJsonModelUnitSummaries()
        if(jsonModelUnits){
            res.send(jsonModelUnits)
        }else{
            res.send(`No ModelUnit has been found`)
        }
        
    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});


async function findAllJsonModelUnitSummaries (){

    return new Promise((resolve, reject) => {
        try{
            const mongoose = require('mongoose')
            mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
            const db = mongoose.connection;
            
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function(){

                console.log(`succesful connection to ${MONGODB_HOST}` )

                const ModelUnit = buildMongooseModelUnit(mongoose)

                console.log(`find : {} `)
                result = await ModelUnit.find({},{'ModelUnit.Attributs.name': 1, 'ModelUnit.Attributs.modelid':1})
                
                db.close();

                // console.log('\n result: ')
                // console.log(result)

                // console.log('\n JSON.stringify(result)')
                // console.log(JSON.stringify(result))

                // console.log('\n JSON.parse(JSON.stringify(result))')
                // console.log(JSON.parse(JSON.stringify(result)))

                result = JSON.parse(JSON.stringify(result))

                resolve(result)
            });
            
        }catch (err) { 
            reject(err); 
        }
    })
    
}



router.get('/deleteJsonModelUnit',async function(req, res, next){

    try{

        let model_name =  req.query.name;
        result = await deleteJsonModelUnit(model_name)
        res.send(result)

    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});

async function deleteJsonModelUnit (model_name){

    return new Promise((resolve, reject) => {
        try{
            const mongoose = require('mongoose')
            mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
            const db = mongoose.connection;
            
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function(){

                console.log(`succesful connection to ${MONGODB_HOST}` )

                const ModelUnit = buildMongooseModelUnit(mongoose)

                console.log(`delete : {'ModelUnit.Attributs.name': ${model_name} } `)
                result = await ModelUnit.findOneAndDelete({'ModelUnit.Attributs.name': model_name}).exec()
                

                result = JSON.parse(JSON.stringify(result))
                
                db.close();

                console.log(`succesful end connection to ${MONGODB_HOST}` )

                resolve(result)
            });
            
        }catch (err) {
            console.log(err.message)
            reject(err); 
        }
    })   
}


router.post('/deleteJsonModelUnitById',async function(req, res, next){

    try{

        console.log("START post deleteJsonModelUnitById")

        let modelid =  req.body.modelid;
        result = await deleteJsonModelUnitById(modelid)


        console.log("END post deleteJsonModelUnitById")

        res.send(result)

        

    }catch(error){
        console.log(error)
        res.send(error.toString())
    }

});


async function deleteJsonModelUnitById (modelid){

    return new Promise((resolve, reject) => {
        try{
            const mongoose = require('mongoose')
            mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
            const db = mongoose.connection;
            
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function(){

                console.log(`succesful connection to ${MONGODB_HOST}` )

                const ModelUnit = buildMongooseModelUnit(mongoose)

                console.log(`delete : {'ModelUnit.Attributs.modelid': ${modelid} } `)
                result = await ModelUnit.findOneAndDelete({'ModelUnit.Attributs.modelid': modelid}).exec()

                result = JSON.parse(JSON.stringify(result))
                
                db.close();

                console.log(`succesful end connection to ${MONGODB_HOST}` )

                resolve(result)
            });
            
        }catch (err) {
            console.log(err.message)
            reject(err); 
        }
    })   
}


// TODO update to post querry


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

async function createTestModelUnit(model_name){

    return new Promise( async (resolve, reject) => {
        console.log('createTestModelUnit')
        try{
            const mongoose = require('mongoose')
            mongoose.connect(MONGODB_HOST,{useNewUrlParser:true , useUnifiedTopology: true});
            const db = mongoose.connection;
            
            db.on('error', console.error.bind(console, 'connection error:'));

            db.once('open', async function(){

                console.log(`succesful connection to ${MONGODB_HOST}` )

                const ModelUnit = buildMongooseModelUnit(mongoose)

                const m = new  ModelUnit({
                        ModelUnit:{
                            Attributs :{ name: model_name ,modelid: `${model_name} X` },
                            Description :{Attributs:{Title: "test model", Authors: "A1 A2"}},
                            Inputs: [ {Input: {Attributs: {name: model_name+".i1"}}}, {Input: {Attributs: {name: model_name+".i2"}}}  ],
                        }
                    }
                )
                
                db.close();

                console.log('TestModelUnit')
                console.log(m)

                resolve(m)
            });
            
        }catch (err) { 
            
            reject(err); 
        }
    })
    
}

async function createTestModelUnitAndSave(model_name){
    return new Promise(async (resolve, reject) => {
        try{
            const ModelUnit = buildMongooseModelUnit(mongoose)


            m = await createTestModelUnit(model_name)
            m.save()

            saved_m = await ModelUnit.find({ 'ModelUnit.Attributs.name': 'm1'})

            resolve(saved_m);
        }catch(err){
            reject(err)
        }
    })
}







// Temporary structure for test purpose
const _xmlModelUrls={
    'Snow':'https://raw.githubusercontent.com/AgriculturalModelExchangeInitiative/STICS_SNOW/master/crop2ml/composition.snow.xml',
    'Melting':'https://raw.githubusercontent.com/AgriculturalModelExchangeInitiative/STICS_SNOW/master/crop2ml/unit.Melting.xml',
    'Preciprec': 'https://raw.githubusercontent.com/AgriculturalModelExchangeInitiative/STICS_SNOW/master/crop2ml/unit.Preciprec.xml',
}

router.get('/model',async function(req, res, next){
    
    console.log('GET model req.query: ')
    console.log(req.query)
    
    let modelName =  req.query.name;
    result = ''
    if(modelName in _xmlModelUrls){

        console.log(`parsing ${_xmlModelUrls[modelName]}`)
        xmlUrl = _xmlModelUrls[modelName]

        // check if model exists in DB

        xmlString =  await getFileFromUrl(xmlUrl)
        
        // Tranform to JSON object
        jsonModel = await xmlString2jsonObj(xmlString)
        // console.log(jsonModel)
        
        // Transform to XML
        xmlString =jsonObj2xmlString(jsonModel)
        console.log(xmlString)
        
        // jsonModel = await parseXMLFromHTTP(_xmlModelUrls[req.query.name])

        result = xmlString

    }
    res.send(result)
    
    // res.send(await parseXMLFromFile());
});












/*
    Todo
    
    + saveXmlModelUnit(urlXml)

        + xml2json(xmlString)

        + saveJsonModelUnit(jsonObj)
            check if exists in DB
            if not validate and save

        + 

    + saveJsonModelUnit(json)

    + getJsonModelUnit(Modelnames)

    + getXmlModelUnit(Modelnames)

        + json2xml()


*/


async function  parseXMLFromFile(){
    
    const fPath = "./server/data/xml/melting.xml"
    let fileData = fs.readFileSync(path.resolve(fPath))

    parser = new xml2js.Parser({
        attrkey: "Attributs",
        explicitRoot: false,
        rootName:'ModelUnit',
        explicitArray:false,
        cdata:true,
    });

    let modelUnitJsonObj = await parser.parseStringPromise(fileData)

    // formatParsedArray(modelUnitJsonObj.ModelUnit,'Inputs','Input')
    // formatParsedArray(modelUnitJsonObj.ModelUnit,'Outputs','Output')
    
    // formatParsedArray(modelUnitJsonObj.ModelUnit,'Parametersets','Parameterset')
    // modelUnitJsonObj.ModelUnit.Parametersets.forEach( e =>{
    //     formatParsedArray(e,'Parameterset','Param')
    // })

    // formatParsedArray(modelUnitJsonObj.ModelUnit,'Testsets','Testset')
    // modelUnitJsonObj.ModelUnit.Testsets.forEach( e =>{
    //     formatParsedArray(e,'Testset','Test')
    // })

    // modelUnitJsonObj.ModelUnit.Testsets.forEach( testSet =>{
    //     testSet.forEach( test => {
    //         test.forEach( )
    //     })
    // }
    // modelUnitJsonObj.ModelUnit.Outputs.Output = [modelUnitJsonObj.ModelUnit.Outputs.Output]


    await insertModelUnitInMongoDb(modelUnitJsonObj);
    fs.writeFileSync("./server/data/melting.json", JSON.stringify(modelUnitJsonObj));



    objRead = await JSON.parse(fs.readFileSync("./server/data/melting.json"))
    

    builder = new xml2js.Builder({
        attrkey: "Attributs"
        // , headless: true
        , explicitRoot: true
        , rootName:'ModelUnit'
        , explicitArray: false
        , cdata:true
        , xmldec:{ 'version': '1.0', 'encoding': 'UTF-8' }
        , doctype: {'sysID': 'https://raw.githubusercontent.com/AgriculturalModelExchangeInitiative/crop2ml/master/ModelUnit.dtd'}
        })

    
    xmlString =  builder.buildObject(objRead).toString();
    

    res = formatXml(
        xmlString =xmlString,
        tagsToRem =['_id'])
    

    console.log(res)

    // fs.writeFileSync("./server/data/m1.xml", builder.buildObject(objRead));

    // sb = new StringBuffer();
    
    // fs.writeFileSync('./server/data/m2.xml',sb.toString())
 
    return new Promise((resolve, reject) => {
        try{
            resolve(res)
        }catch (err) { 
            reject(err); 
        }})
}

function formatXml(xmlString,tagsToRem=[]) {
    sb = new StringBuffer('');
    for(line of xmlString.split('\n')){
        let ignoreLine = false
        for (const tag of tagsToRem) {
            if (!ignoreLine && line.includes(tag))
                ignoreLine = true
        }

        if (!ignoreLine) {
            if(line.includes('SYSTEM')){
                line = line.replace('SYSTEM','PUBLIC')
            }
            sb.append(line + '\n')
        }
    }
    return sb.toString()
}

async function insertModelUnitInMongoDb(model){
    
        const client = await mangodb.MongoClient.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true});
        const itemsDriver =  client.db("crop2ml").collection("models");
        const items =  await itemsDriver.insertOne(model);
        client.close()
        

}

router.get('/schema',async function(req, res, next){
    
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true , useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', async function(){

        console.log("connection succesful")

        const result = await cleanAndAddDocs(mongoose);

        res.send(result)

        db.close();
    });

    

});


async function cleanAndAddDocs(mongoose){

    const ModelUnit = buildMongooseModelUnit(mongoose)

    console.log(` nb docs before  cleanAndAddDocs ${await ModelUnit.find({}).countDocuments() } `)

    await ModelUnit.deleteMany({});


    m1 = new  ModelUnit({
            ModelUnit:{
                Attributs :{ name: "m1" },
                Description :{Attributs:{Title: "T1", Authors: "A1 A2"}},
                Inputs: [ {Input: {Attributs: {name:"m1.i1"}}}, {Input: {Attributs: {name:"m1.i2"}}}  ],
            }
        }
    )
    
    await m1.save()






    m2 = new  ModelUnit({
            ModelUnit:{
                Attributs :{ name: "m2" },
                Description :{Attributs:{Title: "T2", Authors: "A1 A2"}},
                Inputs: [ {Input: {Attributs: {name:"m2.i1"}}}, {Input: {Attributs: {name:"m2.i2"}}}  ],
            }
        }
    )
    
    await m2.save()

    console.log(` nb docs after cleanAndAddDocs ${await ModelUnit.find({}).countDocuments()}`)

    result =[]

    

    
    result.push({q1: {'ModelUnit.Attributs.name': 'm1'}})
    result.push({result_q1: await ModelUnit.find({ 'ModelUnit.Attributs.name': 'm1'})})

    console.log(` q2: {'ModelUnit.Inputs.Input.Attributs.name': 'm2.i1'} `)
    console.log(` result : ${await ModelUnit.find({ 'ModelUnit.Inputs.Input.Attributs.name': /i1/} )} `)

    

    // const result = await ModelUnit.find({})

    return result
}

async function testQuery(mongoose){

    
    const ModelUnit = buildMongooseModelUnit(mongoose)

    const nb = await ModelUnit.find({'Attributs.name': /^m/}).countDocuments()
    console.log(` nb docs ${nb}`)

    // await ModelUnit.deleteMany({});

    console.log(` nb docs  ${await ModelUnit.find({}).countDocuments()}`)

    m1 = new  ModelUnit( 
        {
            Attribut :{
                name: "m1"
            },

            Elements : {
                description:{
                    Attributs: {
                        Title: "t1",
                        Authors: "a1 a2"
                    }
                }
            },

            Inputs: {
                Input: [
                    {
                        Attributs: {
                            name : "Jul",
                            inputtype : "variable",
                        }
                    }, 
                    {
                        Attributs: {
                            name : "Jul",
                            inputtype : "variable",
                        }
                    }
                ]
            },

            Ouputs: {
                Ouput: [
                    {
                        Attributs: {
                            name : "Jul",
                            inputtype : "variable",
                        }
                    }, 
                    {
                        Attributs: {
                            name : "Jul",
                            inputtype : "variable",
                        }
                    }
                ]
            }

            

        }
    );


    await m1.save()


    const result = " test query done"

    return JSON.stringify(result)


}

async function createSchema(mongoose){


    const Inputs = new mongoose.Schema({
        Attributs:{

        }
    })

    const DescriptionSchema = new mongoose.Schema({
        Attributs:{
            Title: String,
            Authors: String,
            // Institution: String,
            // Reference: String,
            // Abstract: String
        },

        Elements:{
            name: String
        }
        
    
    });

    const ModelUnitSchema = new mongoose.Schema({
       Attributs: {
            name: String,
            // modelid: String,
            // timestep: String,
            // version: String,
        },

        Elements: {
            description: DescriptionSchema,
        }
      },{_id:false});


    const ModelUnit = mongoose.model('ModelUnit', ModelUnitSchema)
    

    m1 = new  ModelUnit( 
        {
            Attributs :{
                name: "m1"
            },

            Elements : {
                description:{
                    Attributs: {
                        Title: "t1",
                        Authors: "a1 a2"
                    }
                }
            },

            Inputs: {
                Input: [
                    {
                        Attributs: {
                            name : "Jul",
                            inputtype : "variable",
                        }
                    }, 
                    {
                        Attributs: {
                            name : "Jul",
                            inputtype : "variable",
                        }
                    }
                ]
            }

            

        }
    );

    await m1.save()

    m2 = new  ModelUnit( 
        {
            Attributs :{
                name: "m2"
            },

            Description : {
                description:{
                    Attributs: {
                        Title: "t2",
                        Authors: "a1 a2"
                    }
                }
            }

        }
    );

    await m2.save()

    const result = await ModelUnit.find({})

    return JSON.stringify(result)

}



/*
    Unused
    Ex.
        transform Input[{att: , v: }{att: , v: }] to [{Input:{att: , v: }}, {Input:{att: , v: }}]
        formatParsedArray(modelUnitJsonObj.ModelUnit,'Inputs','Input')
 */
function formatParsedArray(parsedObj,arrayKey,elmtKey){
    if(Array.isArray(parsedObj[arrayKey]))
        return;

    const nvArray =[]
    if(Array.isArray(parsedObj[arrayKey][elmtKey])){
        parsedObj[arrayKey][elmtKey].forEach( e => {
            const nvObj = {}
            nvObj[elmtKey] = e;
            nvArray.push(nvObj)
        });
    }else{
        const nvObj = {}
        nvObj[elmtKey] = parsedObj[arrayKey][elmtKey];
        nvArray.push(nvObj)
    }
    parsedObj[arrayKey]=nvArray
}





module.exports = router;
