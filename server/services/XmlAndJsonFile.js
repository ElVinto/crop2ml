var uri = "mongodb://localhost:27017"
var MONGODB_HOST = 'mongodb://localhost/test'

var eyes = require('eyes');
var https = require('https');

var fs = require('fs');
var path = require('path');

const lineReader = require('line-reader');

var StringBuffer = require("stringbuffer");


var xml2js = require('xml2js');

class XmlAndJsonFile{
    
    static async  parseXMLFromFile(fPath){
    
        // const fPath = "server/data/xml/melting.xml"
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

}
module.exports = XmlAndJsonFile