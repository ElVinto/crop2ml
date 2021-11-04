const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OutputValueSchema = new Schema({
    Attributs:{
        name: {type: String, required: true}, // CADTA #REQUIRED
        description: {type: String, required: false}, // CADTA #REQUIRED
        precision: {type: String, required: false} // CADTA #REQUIRED
    },
    _: {type: String, required: true} // CADTA #REQUIRED
})

const InputValueSchema = new Schema({
    Attributs:{
        name: {type: String, required: true} // CADTA #REQUIRED
    },
    _: {type: String, required: true} // CADTA #REQUIRED
})

const TestSchema = new Schema({
    Attributs:{
        name: {type: String, required: true}, // CADTA #REQUIRED
        description: {type: String, required: false}, // CDATA #IMPLIED
        uri: {type: String, required: false} // CDATA #IMPLIED
    },
    InputValue:{type:[InputValueSchema], required: false},
    OutputValue:{type:[OutputValueSchema], required: false},
})

const TestsetSchema = new Schema({
    Attributs:{
        name: {type: String, required: true}, // CDATA #REQUIRED
        description: {type: String, required: true}, // CDATA #REQUIRED
        parameterset: {type: String, required: true}, // NMTOKEN #REQUIRED
        uri: {type: String, required: false} // CDATA #IMPLIED
    },
    Test :{type: [TestSchema], required: false }
})

const ParamSchema = new Schema({
    Attributs:{
        name: {type: String, required: true}, // NMTOKEN #REQUIRED
    },
    _: {type: String, required: true}, // NMTOKEN #REQUIRED
})

const ParametersetSchema = new Schema({
    Attributs:{
        description: {type: String, required: true}, // CDATA #REQUIRED
        name: {type: String, required: true}, // NMTOKEN #REQUIRED
        uri: {type: String, required: false} // CDATA #IMPLIED
    },
    Param :{type: [ParamSchema], required: false }
});

const AlgorithmSchema = new Schema(
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

const FunctionSchema = new Schema(
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

const OutputSchema = new Schema(
    {
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
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options
);

const InputSchema = new Schema(
    {
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
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options
);

const DescriptionSchema = new Schema(
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

const InputLinkSchema = new Schema(
    {
        Attributs:{
            target: {type: String, required:true}, // TODO NMTOKEN #REQUIRED
            source: {type: String, required:true}, // CDATA #REQUIRED
        }
    }
)

const InternalLinkSchema = new Schema(
    {
        Attributs:{
            target: {type: String, required:true}, // TODO NMTOKEN #REQUIRED
            source: {type: String, required:true}, // CDATA #REQUIRED
        }
    }
)

const OutputLinkSchema = new Schema(
    {
        Attributs:{
            target: {type: String, required:true}, // TODO NMTOKEN #REQUIRED
            source: {type: String, required:true}, // CDATA #REQUIRED
        }
    }
)

const CompositionSchema = new Schema(
    {
        Model: [{
            Attributs:{
                name: {type: String, required:true}, // TODO NMTOKEN #REQUIRED
                id: {type: String, required:true}, // CDATA #REQUIRED
                filename: {type: String, required:true},
            }
        }],
        Links: {
            InputLink: {type: [InputLinkSchema], required: false},
            InternalLink: {type: [InternalLinkSchema], required: false},
            OutputLink: {type: [OutputLinkSchema], required: false},
        },
    }
)

const ModelSchema = new Schema(
    {
        Attributs: {
            name: {type: String, required:[true,'a model name is required']},
            id: { type:String, required:[false,'an id is required']},
            modelid: { type:String, required:[false,'a modelid is required']},
            /*id: { type:String, required: function() {
                console.log("valid id : " + (typeof this.modelid) === null)
                return (typeof this.modelid) === null}},
            modelid: { type:String, required: function() {
                console.log("valid modelid : " + (typeof this.id) === null)
                return (typeof this.id) === null}},*/
            timestep: { type:String, required:[false,'a model timestep is required']},
            version:{String, required:[false,'a model version is required']}
        },
        Composition: {type: CompositionSchema, required: false},
        Description: {type: DescriptionSchema, require:[true,'a model description is required ']},
        Inputs: {
            Input: {type: [InputSchema], required:false},
        },
        Outputs: {
            Output: {type: [OutputSchema], required:false},
        },
        Function:{type: FunctionSchema, require: false},
        Algorithm:{type: AlgorithmSchema, require: false},
        Parametersets:{
            Parameterset: {type: [ParametersetSchema], require: true},
        },
        Testsets:{
            Testset: {type: [TestsetSchema], require: true},
        },
        metaData : {
            dirPath: {type: String, required: false},
            xmlFName: { type:String, required: false},
            idProperty: {type: String, required: false},
            idValue: {type: String, required: false},
            keywords: {type: [String], required: false},
            zipFileName: {type: String, required: false},
            packageName: {type: String, required: false},
            modelType: {type: String, required: false},
            largerModelPackageNames: {type: [String], required: false},
            linkedCommunity: {type: String, required: false},
            uploaderMail: {type: String, required: false},
            administratorMails: {type: [String], required: false},
            editorsMails: {type: [String], required: false},
            maintainerMails: {type: [String], required: false},
            tags: {type: [String], required: false},
            pictures: {type: [String], required: false},
        }
  },
  {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} // options
);

module.exports = mongoose.model('Model', ModelSchema, 'models')