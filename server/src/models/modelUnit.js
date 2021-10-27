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

const ParamSchema = new Schema({
    Attributs:{
        name: {type: String, required: true}, // NMTOKEN #REQUIRED
    },
    _: {type: String, required: true}, // NMTOKEN #REQUIRED
})

const ParametersetSchema = new Schema({
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


const InputSchema = new Schema(
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

const ModelUnitSchema = new Schema(
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

module.exports = mongoose.model('ModelUnit', ModelUnitSchema, 'modelunits')