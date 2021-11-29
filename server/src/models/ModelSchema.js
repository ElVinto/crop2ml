const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OutputValueSchema = new Schema(
    {
        Attributs:{
            name: {type: String, required: true}, 
            description: {type: String, required: false}, 
            precision: {type: String, required: false} 
        },
        _: {type: String, required: true}
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const InputValueSchema = new Schema(
    {
        Attributs:{
            name: {type: String, required: true} 
        },
        _: {type: String, required: true} 
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const TestSchema = new Schema(
    {
        Attributs:{
            name: {type: String, required: true}, 
            description: {type: String, required: false},
            uri: {type: String, required: false} 
        },
        InputValue:{type:[InputValueSchema], required: false},
        OutputValue:{type:[OutputValueSchema], required: false},
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const TestsetSchema = new Schema(
    {
        Attributs:{
            name: {type: String, required: true}, 
            description: {type: String, required: true},
            parameterset: {type: String, required: true}, 
            uri: {type: String, required: false}
        },
        Test :{type: [TestSchema], required: false }
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const ParamSchema = new Schema(
    {
        Attributs:{
            name: {type: String, required: true},
        },
        _: {type: String, required: true}, 
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const ParametersetSchema = new Schema(
    {
        Attributs:{
            description: {type: String, required: true}, 
            name: {type: String, required: true}, 
            uri: {type: String, required: false} 
        },
        Param :{type: [ParamSchema], required: false }
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
);

const AlgorithmSchema = new Schema(
    {  
        Attributs:{
            language: {type: String, required: true}, 
            platform: {type: String, required: false},
            filename: {type: String, required: false}, 
            function: {type: String, required: false} 
        }
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} 
);

const FunctionSchema = new Schema(
    {
        name: {type: String, required: true},
        language: {type: String, required: true}, 
        filename: {type: String, required: false}, 
        type: {
            type: String,
            required: false,
            enum:['internal','external'] 
        }, 
        description: {type: String, required: false}, 

    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
);

const OutputSchema = new Schema(
    {
        Attributs:{
            name: {type: String, required: true}, 
            datatype: {
                type: String,
                required: [true,`datatype  required for path Attributs.datatype `],
                enum: ['STRING', 'STRINGARRAY', 'STRINGLIST', 'DATE','DATEARRAY','DATELIST','DOUBLE','DOUBLEARRAY','DOUBLELIST','INT','INTARRAY','INTLIST','BOOLEAN']
                
            }, 
            description: {type: String, required: false}, 
            max: {type: String, required: false}, 
            min: {type: String, required: false}, 
            variablecategory: {
                type: String,
                required: false,
                enum: ['state', 'rate', 'auxiliary']
            }, 
            unit: {type: String, required: true}, 
            uri: {type: String, required: false},
        }
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
);

const InputSchema = new Schema(
    {
        Attributs:{
            name: {type: String, required:true},
            datatype: {
                type: String,
                required: true,
                enum: ['STRING','STRINGARRAY','STRINGLIST','DATE','DATEARRAY','DATELIST','DOUBLE','DOUBLEARRAY','DOUBLELIST','INT','INTARRAY','INTLIST','BOOLEAN']
            }, 
            description: {type: String, required:true},
            default: {type: String, required: false},
            max: {type: String, required: false},
            min: {type: String, required: false},
            inputtype: {type: String, required: true}, // (variable|parameter) #REQUIRED
            parametercategory : {
                type: String,
                required: false,
                enum: ['constant','species','genotypic','soil','private']
            },
            variablecategory : {
                type: String,
                required: false,
                enum: ['state','rate','auxiliary']
            }, 
            unit: {type: String, required: true},
            uri : {type: String, required: false},
        }
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
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
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true} 
);

const InputLinkSchema = new Schema(
    {
        Attributs:{
            target: {type: String, required:true}, 
            source: {type: String, required:true}, 
        }
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const InternalLinkSchema = new Schema(
    {
        Attributs:{
            target: {type: String, required:true}, 
            source: {type: String, required:true}, 
        }
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const OutputLinkSchema = new Schema(
    {
        Attributs:{
            target: {type: String, required:true}, 
            source: {type: String, required:true}, 
        }
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const UnitModelSchema = new Schema(
    {
        Attributs: {
            name: {type: String, required:[true,'a model name is required']},
            id: { type:String, required:[false,'a modelid is required']},
            timestep: { type:String, required:[false,'a model timestep is required']},
            version:{String, required:[false,'a model version is required']}
        },
        Description: {type: DescriptionSchema, required:[true,'a model description is required ']},
        Inputs: {
            Input: {type: [InputSchema], required:false},
        },
        Outputs: {
            Output: {type: [OutputSchema], required:false},
        },
        Function:{type: FunctionSchema, required: false},
        Algorithm:{type: AlgorithmSchema, required: false},
        Parametersets:{
            Parameterset: {type: [ParametersetSchema], required: true},
        },
        Testsets:{
            Testset: {type: [TestsetSchema], required: true},
        },
        /*metaData : {
            dirPath: {type: String, required: false},
            xmlFName: { type:String, required: false},
            idProperty: {type: String, required: false},
            idValue: {type: String, required: false},
            keywords: {type: [String], required: false},
            zipFileName: {type: String, required: false},
            packageName: {type: String, required: false},
        }*/
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
);

const CompositionSchema = new Schema(
    {
        Model: [{
            Attributs:{
                name: {type: String, required:true}, 
                id: {type: String, required:true}, 
                filename: {type: String, required:true},
            },
            ModelContent: {type: UnitModelSchema, require: false}
        }],
        Links: {
            InputLink: {type: [InputLinkSchema], required: false},
            InternalLink: {type: [InternalLinkSchema], required: false},
            OutputLink: {type: [OutputLinkSchema], required: false},
        },
    },
    {autoIndex:false, autoCreate:false, id:false, _id:false,excludeIndexes:true}
)

const CompositionModelSchema = new Schema(
    {
        Attributs: {
            name: {type: String, required:[true,'a model name is required']},
            id: { type:String, required:[true,'an id is required']},
            timestep: { type:String, required:[false,'a model timestep is required']},
            version:{ type:String, required:[false,'a model version is required']}
        },
        Composition: {type: CompositionSchema, required: false},
        Description: {type: DescriptionSchema, required:[true,'a model description is required ']},
        metaData : {
            dirPath: {type: String, required: false},
            keywords: {type: [String], required: false},
            zipFileName: {type: String, required: false},
            //xmlFName: { type:String, required: false},
            //packageName: {type: String, required: false},
            uploaderMail: {type: String, required: false},
            pictures: {type: [String], required: false},
        }
    },
    {autoIndex:true, autoCreate:false, id:false, _id:false,excludeIndexes:false,timestamps: false} 
);

const ModelSchema = new Schema(
    {
        id: { type:String, required:[true,'an id is required']},
        versionsList: { type:[String], required: false},
        versions: {type: [CompositionModelSchema], required: false},
        administratorsMails: {type: [String], required: false},
        editorsMails: {type: [String], required: false},
        modelType: {type: String, required: false},
        largerModelPackageNames: {type: [String], required: false},
        linkedCommunity: {type: String, required: false},
    },
    {autoIndex:true, autoCreate:false, id:true, _id:true,excludeIndexes:false,timestamps: false} 
)

const Model = mongoose.model('Model', ModelSchema, 'models2')
//const ModelCompo = mongoose.model('ModelCompo', CompositionModelSchema, 'modelCompo')

module.exports = {Model}