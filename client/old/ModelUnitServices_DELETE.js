class ModelServices{

    static buildSchema(){

        const OutputValueSchema = {
            Attributs:{
                name: {type: String, required: true}, // CADTA #REQUIRED
                description: {type: String, required: false}, // CADTA #REQUIRED
                precision: {type: String, required: false} // CADTA #REQUIRED
            },
            _: {type: String, required: true} // CADTA #REQUIRED
        }

        const InputValueSchema = {
            Attributs:{
                name: {type: String, required: true} // CADTA #REQUIRED
            },
            _: {type: String, required: true} // CADTA #REQUIRED
        }

        const TestSchema = {
            Attributs:{
                name: {type: String, required: true}, // CADTA #REQUIRED
                description: {type: String, required: false}, // CDATA #IMPLIED
                uri: {type: String, required: false} // CDATA #IMPLIED
            },
            InputValue:{type:[InputValueSchema], required: false},
            OutputValue:{type:[OutputValueSchema], required: false},
        }

        const TestsetSchema = {
            Testset:[{
                Attributs:{
                    name: {type: String, required: true}, // CDATA #REQUIRED
                    description: {type: String, required: true}, // CDATA #REQUIRED
                    parameterset: {type: String, required: true}, // NMTOKEN #REQUIRED
                    uri: {type: String, required: false} // CDATA #IMPLIED
                },
                Test :{type: [TestSchema], required: false }
            }]
        }

        const ParamSchema = {
            Attributs:{
                name: {type: String, required: true}, // NMTOKEN #REQUIRED
            },
            _: {type: String, required: true}, // NMTOKEN #REQUIRED
        }

        const ParametersetSchema = {
            Parameterset:[{
                Attributs:{
                    description: {type: String, required: true}, // CDATA #REQUIRED
                    name: {type: String, required: true}, // NMTOKEN #REQUIRED
                    uri: {type: String, required: false} // CDATA #IMPLIED
                },
                Param :{type: [ParamSchema], required: false }
            }]
        }

        const AlgorithmSchema = 
            {  
                Attributs:{
                    language: {type: String, required: true}, // CDATA #REQUIRED
                    platform: {type: String, required: false}, // CDATA #IMPLIED
                    filename: {type: String, required: false}, //  CDATA #IMPLIED
                    function: {type: String, required: false} // CDATA #IMPLIED
                }
            }

        const FunctionSchema = 
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

            }


        const OutputSchema =
            {
                Output:[{ 
                    Attributs:{
                        name: {type: String, required: true}, //  NMTOKEN #REQUIRED
                        datatype: {
                            type: String,
                            required: true,
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
            }


        const InputSchema = 
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
            };


        const DescriptionSchema = 
            {
                Title: {type: String, required: true},
                Authors:{type: String, required: true},
                Institution: {type: String, required: true},
                URI:{trype: String, required: false},
                Reference: {type: String, required: false},
                Abstract: {type: String, required: true}
            }

        const ModelSchema = 
            {
                Model:{
                    Attributs: {
                            name: {type: String, required: true},
                            modelid: { type:String, required: true},
                            timestep: { type:String, required: false},
                            version:{String, required: false}
                        },

                    Description: {type: DescriptionSchema, require:[true,'a model description is required ']},
                    Inputs: {type: [InputSchema], required: false },
                    Outputs: {type:[OutputSchema], required: false},
                    Function:{type: FunctionSchema, required: false},
                    Algorithm:{type: AlgorithmSchema, required: false},
                    Parametersets:{type: [ParametersetSchema], required: true},
                    Testsets:{type: [TestsetSchema], require: true},
                }
        };
        return ModelSchema
    }

    static buildNewSchema(){

        const OutputValueSchema = {
            Attributs:{
                name: 'String', // CADTA #REQUIRED
                description: 'String', // CADTA #REQUIRED
                precision: 'String' // CADTA #REQUIRED
            },
            _: 'String', // CADTA #REQUIRED
        }

        const InputValueSchema = {
            Attributs:{
                name: 'String' // CADTA #REQUIRED
            },
            _: 'String' // CADTA #REQUIRED
        }

        const TestSchema = {
            Attributs:{
                name: 'String', // CADTA #REQUIRED
                description: 'String', // CDATA #IMPLIED
                uri: 'String' // CDATA #IMPLIED
            },
            InputValue: [InputValueSchema],
            OutputValue: [OutputValueSchema],
        }

        const TestsetSchema = {
            Testset:[{
                Attributs:{
                    name: 'String', // CDATA #REQUIRED
                    description: 'String', // CDATA #REQUIRED
                    parameterset: 'String', // NMTOKEN #REQUIRED
                    uri: 'String' // CDATA #IMPLIED
                },
                Test :[TestSchema] 
            }]
        }

        const ParamSchema = {
            Attributs:{
                name: 'String', // NMTOKEN #REQUIRED
            },
            _: 'String', // NMTOKEN #REQUIRED
        }

        const ParametersetSchema = {
            Parameterset:[{
                Attributs:{
                    description: 'String', // CDATA #REQUIRED
                    name: 'String', // NMTOKEN #REQUIRED
                    uri: 'String' // CDATA #IMPLIED
                },
                Param :[ParamSchema]
            }]
        }

        const AlgorithmSchema = 
            {  
                Attributs:{
                    language: 'String', // CDATA #REQUIRED
                    platform: 'String', // CDATA #IMPLIED
                    filename: 'String', //  CDATA #IMPLIED
                    function: 'String', // CDATA #IMPLIED
                }
            }

        const FunctionSchema = 
            {
                name: 'String', // CDATA #REQUIRED
                language: 'String', // CDATA #REQUIRED
                filename: 'String', // CDATA #IMPLIED
                type:'String', // enum:['internal','external'] //  (internal|external) #REQUIRED

                description: 'String', // CDATA #IMPLIED>

            }


        const OutputSchema =
            {
                Output:[{ 
                    Attributs:{
                        name: 'String', //  NMTOKEN #REQUIRED
                        datatype: 'String', // enum: ['STRING', 'STRINGARRAY', 'STRINGLIST', 'DATE','DATEARRAY','DATELIST','DOUBLE','DOUBLEARRAY','DOUBLELIST','INT','INTARRAY','INTLIST','BOOLEAN']
                        description: 'String', // CDATA #REQUIRED
                        max: 'String', // TODO CDATA #IMPLIED
                        min: 'String', // TODO CDATA #IMPLIED
                        variablecategory: 'String', // enum: ['state', 'rate', 'auxiliary']
                        unit: 'String', //CDATA #REQUIRED
                        uri: 'String', //CDATA #IMPLIED
                    }
                }]
            }


        const InputSchema = 
            {
                Input: [{
                    Attributs:{
                        name: 'String', // TODO NMTOKEN #REQUIRED
                        datatype: 'String', // ['STRING','STRINGARRAY','STRINGLIST','DATE','DATEARRAY','DATELIST','DOUBLE','DOUBLEARRAY','DOUBLELIST','INT','INTARRAY','INTLIST','BOOLEAN'
                        description: 'String', // CDATA #REQUIRED
                        default: 'String', // TODO CDATA #IMPLIED
                        max: 'String', // TODO CDATA #IMPLIED
                        min: 'String', // TODO CDATA #IMPLIED
                        inputtype: 'String', // (variable|parameter) #REQUIRED
                        parametercategory : 'String', // ['constant','species','genotypic','soil','private']  #IMPLIED
                        variablecategory : 'String',// enum: ['state','rate','auxiliary']
                        unit: 'String', //  CDATA #REQUIRED
                        uri : 'String', // CDATA #IMPLIED>
                    }
                }]
            };


        const DescriptionSchema = 
            {
                Title: 'String',
                Authors: 'String',
                Institution: 'String',
                URI:    'String',
                Reference: 'String',
                Abstract: 'String',
            }

        const ModelSchema = 
            {
                Model:{
                    Attributs: {
                            name: 'String',
                            modelid: 'String',
                            timestep: 'String',
                            version: 'String', 
                        },

                    Description: DescriptionSchema,
                    Inputs:  [InputSchema],
                    Outputs: [OutputSchema],
                    Function: FunctionSchema,
                    Algorithm:AlgorithmSchema ,
                    Parametersets: ParametersetSchema,
                    Testsets: [TestsetSchema]
                }
        };
        return ModelSchema
    }
}

export default ModelServices;
