<template>

  <div id=catalog v-if="$store.getters.getDataAreLoaded" style="display:block; overflow: scroll; height:80vh; width:100%; margin-top:20px;" >

    <div class ="row"  > 

      <div id="models" class="col-sm-3">



        <div id="package" class="row" >
          <div class="col-sm-12">

            <b> Import new package: </b>
            <b-input-group class="mt-3" style="width:100%">
              <div class="custom-file" ref="customPackageRef" >
                <input type="file" id="zip" ref="zip"  v-on:change="handleZipUpload()" class="custom-file-input" >
                 <label class="custom-file-label" ref="customPackageLabelRef" for="zip" style="text-align:center">Choose package.zip</label>
              </div>
              <div class="input-group-append">
                <b-button variant="secondary"  v-on:click="submitZip()">Send</b-button>
              </div>
            </b-input-group>
            <p v-if="packageZipName">
              {{`package to upload: ${packageZipName}`}}
            </p>
            

          </div>
        </div>

          

        <div id="package" class="row" >
          <div class="col-sm-12">
            <b> Export new package: </b>

            <b-input-group class="mt-3">
              <b-input-group-prepend>
                <b-input-group-text> Choose</b-input-group-text>
              </b-input-group-prepend>
              
              <b-form-input ref="package" placeholder="package name" > </b-form-input>
              
              <b-input-group-append>
                <b-button variant="success"> Download</b-button>
                <!-- <b-button variant="info">Button</b-button> -->
              </b-input-group-append>
            </b-input-group>

          </div>
        </div>

        <hr>

        <div id="package" class="row" >
            <div class="col-sm-12">
              <p>
                <b> Import new model unit: </b>
              </p>
              <p>
                <input type="file" id="file" ref="file"  v-on:change="handleFileUpload()" style="width:100%">
              </p>
              <p>
                <button type="button" class="btn btn-secondary" v-on:click="submitFile()" style="width:80%;">Add</button>
              </p>
            </div>
        </div>
        <hr>

        


        <div id="modelunits"  class="row" >
          <div  class="col-sm-12">

            <b> List of model units: </b>
            <b-list-group class="dropdown-menu scrollable-menu" role="menu" style="width:100%">
              <b-list-group-item 
                v-for="modelid in $store.state.modelUnits.keys()"
                v-bind:key="modelid"
                v-on:click="selectModelUnitById(modelid)"
              >
                {{ modelid}}
              </b-list-group-item>
            </b-list-group>

          </div>
        </div>

        <!-- <div class="row" >
          <div  class="col-md-12 ">
            <div class="btn-group">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> List of model units <span class="caret"></span> </button>
                <ul class="dropdown-menu scrollable-menu" role="menu">
                  <li class="btn"
                    v-for="modelid in $store.getters.getModelUnits.keys()"
                    v-bind:key="modelid"
                    v-on:click="selectModelUnitById(modelid)"
                  >
                    {{ modelid}}
                  </li>
                </ul>
            </div>
          </div>
        </div> -->

        <div id="modelcompositions"  class="row">
          <div  class="col-sm-12">
            <b> List of model compositions </b>
          </div>
        </div>
      </div>

      <div id="modelContent" v-if="selectedModelUnitId"  class="col-sm-9"  >
          
          <div id="modelIdAndActions" class="row">
            <div class="col-md-3">
                <div @mouseleave="showCurrentRating(0)" style="display:inline-block;">
                    <star-rating :show-rating="false" @current-rating="showCurrentRating" @rating-selected="setCurrentSelectedRating" :increment="0.5"></star-rating>
                </div>
                <div style="margin-top:10px;font-weight:bold;">{{currentRating}}</div>
            </div >

            <div class="col-md-6">
              <h2 style="text-align:center;">{{ `${selectedModelUnitId}`}} </h2>
            </div>

            <div class="col-md-3">
              <div class="row" style="margin-top:5px;">
                <div class="col-md-4">
                  <button type="button" class="btn btn-success" v-on:click="saveModel()" style="width:100%;" > 
                    Save 
                  </button>
                </div >

                <div class="col-md-4">
                  <button type="button" class="btn btn-info" v-on:click="reInitModel()" style="width:100%;" > 
                    Reinit 
                  </button>
                </div >

                <div class="col-md-4">
                  <button type="button" class="btn btn-danger" v-on:click="deleteModel()" style="width:100%;" > 
                    Delete 
                  </button>
              </div >

            </div >

              
              

            </div >

          </div>

          <div id="modelId" v-if="errorMsg" class="row">
            <div class="col-md-12">
              {{errorMsg}}
            </div >
          </div >

          <br>

          <div id="ModelUnitAttributs" > 

            <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelUnitAttributs')" style="white-space:pre; width:100%;" > 
              {{formatLabel('ModelUnitAttributs')}} 
            </button>

            <br>
            <br>
            
            <div v-if="expandedModelUnitAttributs">
              <div id="AttributList" 
                class="input-group mb-3"
                v-for="(v,k) in selectedModelUnit.ModelUnit.Attributs"
                v-bind:key="k"
              >
                <div class="input-group-prepend"  style="width:100%;" >
                  <span class="input-group-text" id="basic-addon2">
                    {{ k }}
                  </span>
                  <input class="form-control" v-model="selectedModelUnit.ModelUnit.Attributs[k]" :placeholder=v  >
                </div>
              </div>
            </div>

          </div> 

          <div id="Description" >

            <button type="button" class="btn btn-secondary" v-on:click="flip('expandedDescription')" style="white-space: pre; width:100%;" > 
              {{formatLabel('Description')}} 
            </button>

            <br>
            <br>
            
            <div v-if="expandedDescription">
              <div id="DescriptionList" 
                class="input-group mb-3"
                v-for="(v,k) in selectedModelUnit.ModelUnit.Description"
                v-bind:key="k"
              >
                <div class="input-group-prepend" style="width:100%;" >
                  <span class="input-group-text" >
                    {{ k }}
                  </span>
                  <input class="form-control" v-model="selectedModelUnit.ModelUnit.Description[k]" :placeholder=v   >
                </div>
              </div>
            </div>

          </div>

          <div id="Algorithm" >

            <button type="button" class="btn btn-secondary" v-on:click="flip('expandedAlgorithm')" style="white-space: pre; width:100%;" > 
              {{formatLabel('Algorithm')}} 
            </button>

            <br>
            <br>
            
            <div v-if="expandedAlgorithm">
              <div id="AlgorithmAttributList" 
                class="input-group mb-3"
                v-for="(v,k) in selectedModelUnit.ModelUnit.Algorithm.Attributs"
                v-bind:key="k"
              >
                <div class="input-group-prepend" style="width:100%;" >
                  <span class="input-group-text" >
                    {{ k }}
                  </span>
                  <input class="form-control" v-model="selectedModelUnit.ModelUnit.Algorithm.Attributs[k]" :placeholder=v   >
                </div>
              </div>

              <!-- TODO updaload algorithm file  in -->
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Code</span>
                </div>
                <textarea class="form-control" aria-label="With textarea" placeholder= " TODO display the content of the algorithm file ">
                </textarea>
              </div>

             

            </div>

          </div>

          <div id="ModelUnitInputs" > 

            <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelUnitInputs')" style="white-space:pre; width:100%;" > 
              {{formatLabel('ModelUnitInputs')}} 
            </button>
            <div v-if="expandedModelUnitInputs">
              <button type="button" class="btn btn-link" v-on:click="addModelUnitInput()" style="text-align:left" > 
                add input
              </button>
            </div>


            <br>
            <br>
            
            <div v-if="expandedModelUnitInputs">

              

              <div id="InputList" 
                class="input-group mb-3"
                v-for="(inputObj,inputIdx) in selectedModelUnit.ModelUnit.Inputs[0].Input"
                v-bind:key="inputIdx"
              >
                <p>{{`${inputObj.Attributs.name}`}}</p>

                <div id="InputObject" 
                  class="input-group mb-3"
                  v-for="(inputObjAttVal,inputObjAttKey) in inputObj.Attributs"
                  v-bind:key="inputObjAttKey"
                >
                    
                  <div class="input-group-prepend"  style="width:100%;" >
                    <span class="input-group-text" id="basic-addon2">
                      {{ inputObjAttKey }}
                    </span>
                    <input class="form-control" v-model="selectedModelUnit.ModelUnit.Inputs[0].Input[inputIdx].Attributs[inputObjAttKey]" :placeholder=inputObjAttVal  >
                  </div>
              
                </div>

              </div>
            </div>

          </div>

          <div id="ModelUnitOutputs" > 

            <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelUnitOutputs')" style="white-space:pre; width:100%;" > 
              {{formatLabel('ModelUnitOutputs')}} 
            </button>

            <br>
            <br>
            
            <div v-if="expandedModelUnitOutputs">
              <div id="OutputList" 
                class="input-group mb-3"
                v-for="(outputObj,outputIdx) in selectedModelUnit.ModelUnit.Outputs[0].Output"
                v-bind:key="outputIdx"
              >
                <p>{{`${outputObj.Attributs.name}`}}</p>

                <div id="OutputObject" 
                  class="input-group mb-3"
                  v-for="(outputObjAttVal,outputObjAttKey) in outputObj.Attributs"
                  v-bind:key="outputObjAttKey"
                >
                    
                  <div class="input-group-prepend"  style="width:100%;" >
                    <span class="input-group-text" id="basic-addon2">
                      {{ outputObjAttKey }}
                    </span>
                    <input class="form-control" v-model="selectedModelUnit.ModelUnit.Outputs[0].Output[outputIdx].Attributs[outputObjAttKey]" :placeholder=outputObjAttVal  >
                  </div>
              
                </div>

              </div>
            </div>

          </div>

          <!-- TODO CHECK THE form -->
          <div id="ModelUnitParametersets" > 

            <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelUnitParametersets')" style="white-space:pre; width:100%;" > 
              {{formatLabel('ModelUnitParametersets')}} 
            </button>

            <br>
            <br>
            
            <div v-if="expandedModelUnitParametersets">
              <div id="ParametersetList" 
                class="input-group mb-3"
                v-for="(paramsetObj,paramsetIdx) in selectedModelUnit.ModelUnit.Parametersets[0].Parameterset"
                v-bind:key="paramsetIdx"
              >
                <p>{{`${paramsetObj.Attributs.name}`}}</p>

                <div id="ParametersetObject Attributs" 
                  class="input-group mb-3"
                  v-for="(paramsetObjAttVal,paramsetObjAttKey) in paramsetObj.Attributs"
                  v-bind:key="paramsetObjAttKey"
                >
                    
                  <div class="input-group-prepend"  style="width:100%;" >
                    <span class="input-group-text" >
                      {{ paramsetObjAttKey }}
                    </span>
                    <input class="form-control" v-model="selectedModelUnit.ModelUnit.Parametersets[0].Parameterset[paramsetIdx].Attributs[paramsetObjAttKey]" :placeholder=paramsetObjAttVal  >
                  </div>
              
                </div>

                <p>Parameters: </p>
                <div id="ParamObject" 
                  class="input-group mb-3"
                  v-for="(paramObjVal,paramObjKey) in paramsetObj.Param"
                  v-bind:key="paramObjKey"
                >
                    
                  <div class="input-group-prepend"  style="width:100%;" >
                    <span class="input-group-text" >
                      {{ paramObjVal.Attributs.name }}
                    </span>
                    <input class="form-control" v-model="selectedModelUnit.ModelUnit.Parametersets[0].Parameterset[paramsetIdx].Param[paramObjKey]._" :placeholder=paramObjVal._ >
                  </div>
              
                </div>

              </div>
            </div>

          </div>

          <!-- TODO -->
          <div id="ModelUnitTestsets" > 

            <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelUnitTestsets')" style="white-space:pre; width:100%;" > 
              {{formatLabel('ModelUnitTestsets')}} 
            </button>

            <br>
            <br>
            
            <div v-if="expandedModelUnitTestsets">
              <div id="TestsetList" 
                class="input-group mb-3"
                v-for="(testsetObj,testsetIdx) in selectedModelUnit.ModelUnit.Testsets[0].Testset"
                v-bind:key="testsetIdx"
              >
                <p>{{`${testsetObj.Attributs.name}`}}</p>

                <div id="TestsetObject Attributs" 
                  class="input-group mb-3"
                  v-for="(testsetObjAttVal,testsetObjAttKey) in testsetObj.Attributs"
                  v-bind:key="testsetObjAttKey"
                >
                    
                  <div class="input-group-prepend"  style="width:100%;" >
                    <span class="input-group-text" >
                      {{ testsetObjAttKey }}
                    </span>
                    <input class="form-control" v-model="selectedModelUnit.ModelUnit.Testsets[0].Testset[testsetIdx].Attributs[testsetObjAttKey]" :placeholder=testsetObjAttVal  >
                  </div>
              
                </div>

                <p>Tests: </p>
                <div id="TestObject" 
                  class="input-group mb-3"
                  v-for="(testObjVal,testObjKey) in testsetObj.Test"
                  v-bind:key="testObjKey"
                >
                  Test
                  <div class="input-group-prepend"  style="width:100%;" >
                    <span class="input-group-text" >
                      name
                    </span>
                    <input class="form-control" v-model="selectedModelUnit.ModelUnit.Testsets[0].Testset[testsetIdx].Test[testObjKey].Attributs.name" :placeholder=testObjVal.Attributs.name >
                  </div>
                  
                  <br>
                  InputValues
                  <div id="TestInputs" 
                  class="input-group mb-3"
                  v-for="(testInputObjVal,testInputObjKey) in testObjVal.InputValue"
                  v-bind:key="testInputObjKey"
                  >
                    
                    <div class="input-group-prepend"  style="width:100%;" >
                      <span class="input-group-text" >
                        {{testInputObjVal.Attributs.name}}
                      </span>
                    <input class="form-control" v-model="selectedModelUnit.ModelUnit.Testsets[0].Testset[testsetIdx].Test[testObjKey].InputValue[testInputObjKey]._" :placeholder=testInputObjVal._ >
                    </div>
                  </div>

                  OutputValues
                  <div id="TestInputs" 
                  class="input-group mb-3"
                  v-for="(testOutputObjVal,testOutputObjKey) in testObjVal.OutputValue"
                  v-bind:key="testOutputObjKey"
                  >
                    
                    <div class="input-group-prepend"  style="width:100%;" >
                      <span class="input-group-text" >
                        {{testOutputObjVal.Attributs.name}}
                      </span>
                      <input class="form-control" v-model="selectedModelUnit.ModelUnit.Testsets[0].Testset[testsetIdx].Test[testObjKey].OutputValue[testOutputObjKey]._" :placeholder=testOutputObjVal._ >
                    </div>

                  </div>


              
                </div>

              </div>
            </div>

          </div>
         
          
      </div>
      
    </div>

  </div>
  
</template>
<script>

// import ModelUnitServices from "../services/ModelUnitServices"
import FileSystemServices from "../services/FileSystemServices"
import StarRating from 'vue-star-rating'



export default {
  name: 'Catalog',

   data() {
      return {

        file:'',
        fileName:'',

        packageZip:{},
        packageName: '',

        errorMsg : "",

        selectedModelUnitId: null,

        selectedModelUnit:{},

        modelUnitSchema :{},


        expandedModelUnitAttributs :false,
        
        expandedDescription :false,

        expandedAlgorithm :false,


        expandedModelUnitInputs :false,

        expandedModelUnitOutputs :false,

        expandedModelUnitParametersets: false,

        expandedModelUnitTestsets :false,

        currentRating: "No Rating",
        currentSelectedRating: "No Current Rating",


        
      }
    },

  components: {
    StarRating

  },

  async created() {

    // console.log("START created Catalog")

    // this.modelUnitSchema = ModelUnitServices.buildSchema();

    // console.log("this.modelUnitSchema")
    // console.log(this.modelUnitSchema)

    // console.log("END created Catalog")
  },

  async mounted() {
    
    console.log("START mounted Catalog")

    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initModelUnits');
    }

    console.log("END mounted Catalog")
  },

  computed:{

      // selectedModelUnit: function (){
      //   return this.$store.getters.getModelUnits.get(this.selectedModelUnitId)
      // }

      // modelUnitIds () {
      //   return this.$store.getters.getModelUnits.keys()
      // }
  },

  methods: {


    handleFileUpload(){
      console.log("START handleFileUpload")

      this.file = this.$refs.file.files[0];

      console.log("END handleFileUpload")
    },

    async submitFile(){
      console.log("START submitFile")

      // let formData = new FormData();
      // formData.append('file', this.file);

      console.log("xml sent: ")
      console.log(this.file)
      

      const jsonModel = await FileSystemServices.sendFile(this.file)

      console.log("json received: ")
      console.log(jsonModel.data)

      this.$store.commit('addModelUnit',jsonModel.data);

      console.log('this.$store.getters.getModelUnits')
      console.log(this.$store.getters.getModelUnits)

      
      this.selectModelUnitById(jsonModel.data.ModelUnit.Attributs.modelid)

      console.log("END submitFile")
    },

    handleZipUpload(){
      console.log("START handleZipUpload")


      this.packageZip = this.$refs.zip.files[0];

      console.log(" zip file")
      console.log(this.packageZip)


      console.log("END handleZipUpload")
    },

    async submitZip(){
      console.log("START submitFile")

      // let formData = new FormData();
      // formData.append('file', this.file);

      console.log("xml sent: ")
      console.log(this.packageZip)
      

      const response = await FileSystemServices.sendZip(this.packageZip)

      console.log("server response: ")
      console.log(response)

      // TODO add model unit for each model
      // this.$store.commit('addModelUnit',jsonModel.data);

      console.log("END submitZip")
    },

    async saveModel(){
      console.log("START saveModel")

      this.errorMsg =""
      const res =  await this.$store.dispatch('saveModelUnit',this.selectedModelUnit);

      if(res.ModelUnit === undefined){
        this.errorMsg = res;
      }

      console.log("END saveModel")
    },

    async reInitModel(){
      console.log("START reInitModel")


      this.errorMsg = ""

      // TODO case of new empty model
      
      const res = await this.$store.dispatch('reInitModelUnit',this.selectedModelUnitId);

      if(res.ModelUnit !== undefined){
        this.selectedModelUnit = this.$store.getters.getModelUnits.get(this.selectedModelUnitId)
      }else{
        this.errorMsg = res;
      }
      
      
      
      console.log('this.selectedModelUnit')
      console.log(this.selectedModelUnit)

      console.log("END reInitModel")
    },

    async deleteModel(){

      console.log("START deleteModel")

      this.errorMsg =""

      const deletedModelUnit = await this.$store.dispatch('deleteModelUnit',this.selectedModelUnit);

      console.log('deletedModelUnit')
      console.log(deletedModelUnit)

      this.selectedModelUnitId= null

      this.selectedModelUnit={}

      console.log("END deleteModel")
    },

    addModelUnitInput(){

    },

    
    sign: function(expanded){
      return expanded? '-':'+';
    },

    flip(paramName){
      this[paramName] = !this[paramName]
    },

    formatLabel(paramName){

      switch (paramName) {

        case 'ModelUnitAttributs': 
          return `${this.sign(this.expandedModelUnitAttributs)} Attributs` ;
        
        case 'Description': 
          return `${this.sign(this.expandedDescription)} ${paramName}` ;
        
        case 'Algorithm': 
          return `${this.sign(this.expandedAlgorithm)} ${paramName}` ; 

        case 'ModelUnitInputs': 
          return `${this.sign(this.expandedModelUnitInputs)} Inputs` ;
        
        case 'ModelUnitOutputs': 
          return `${this.sign(this.expandedModelUnitOutputs)} Outputs` ;
        
        case 'ModelUnitParametersets': 
          return `${this.sign(this.expandedModelUnitParametersets)} Parametersets` ;

        case 'ModelUnitTestsets': 
          return `${this.sign(this.expandedModelUnitTestset)} Testsets` ;
      
        default:
          break;
      }

    },

    selectModelUnitById: function (modelid){
      this.selectedModelUnitId = modelid;
      this.selectedModelUnit = this.$store.getters.getModelUnits.get(this.selectedModelUnitId)
    },

    showCurrentRating: function(rating) {
      this.currentRating = (rating === 0) ? this.currentSelectedRating : "Click to select " + rating + " stars"
    },
    setCurrentSelectedRating: function(rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
    }
    
  },

}
</script>

<style scoped>

#catalog{
  width:100%;
  overflow:scroll;
}

p{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2px;
  padding-right: 2px;
}

#modelunits{
  padding: 20px;
}

.scrollable-menu {
    height: auto;
    max-height: 60vh;
    overflow: scroll;
}





</style>
