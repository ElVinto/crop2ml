<template>

  <div id ="repository" v-if="$store.getters.getDataAreLoaded" style="display:block;  " >

    <div class ="row"  > 
      
      <div id="models" class="col-lg-3" >

        <b-card >

          <b-card-header header-tag="nav">
            <b-nav tabs fill>
              <b-nav-item @click="activateSearchMode()"  >Search</b-nav-item>
              <b-nav-item @click="activateHierarchyMode()" >Hierarchy</b-nav-item>
              <b-nav-item @click="activateListMode()" >List</b-nav-item>

              <!-- <b-button variant="outline-secondary" @click="activateSearchMode()"  >Search</b-button>
              <b-button variant="outline-secondary" @click="activateHierarchyMode()"  >Hierarchy</b-button>
              <b-button variant="outline-secondary" @click="activateListMode()"  >List</b-button> -->
              
            </b-nav>
          </b-card-header>
          
          <b-card-body >

            <div v-if="searchMode" id="modelSearch" class="row">
              <div  class="col-sm-12">
                <p>
                    Find a model by tags or keywords
                </p>

                <b-input-group id="Search"  >
                  <b-form-input placeholder="tag, keyword" list="wordOptionDataList" v-model="selectedWord"></b-form-input>
                  
                  <datalist id="wordOptionDataList">
                    <option  
                      v-for="wordOption in $store.getters.getWordOptions"
                      v-bind:key="wordOption"
                      >
                      {{wordOption}}
                    </option>
                  </datalist> 

                  <b-button size="sm" class="my-2 my-sm-0" v-on:click="submitSearch()" type="submit">Search</b-button>
                </b-input-group>

                <div v-if="selectedWord.length>0 && searchResults.fromTags !== null && searchResults.fromTags.length>0">
                  <hr>
                  <p style="text-align:left; ">
                    {{`Tag "${selectedWord}": models founds`}}
                  </p>
                  <b-list-group class="scrollable-submenu" role="menu" style="width:100%">
                    <b-list-group-item 
                      v-for="modelid in searchResults.fromTags"
                      v-bind:key="modelid"
                      v-on:click="selectModelById(modelid)"
                      style="font-size:0.7em" 
                    >
                      {{ modelid}}
                    </b-list-group-item>
                  </b-list-group>
                </div>

                <div v-if="selectedWord.length>0 && searchResults.fromKeywords !== null && searchResults.fromKeywords.length>0">
                  <hr>
                  <p style="text-align:left; font-size:0.9em">
                    {{`Keyword "${selectedWord}": models found `}}
                  </p>
                  <b-list-group class="scrollable-submenu" role="menu" style="width:100%">
                    <b-list-group-item 
                      v-for="modelid in searchResults.fromKeywords"
                      v-bind:key="modelid"
                      v-on:click="selectModelById(modelid)"
                      style="font-size:0.7em; " 
                    >
                      {{ modelid}}
                    </b-list-group-item>
                  </b-list-group>
                </div>

                <div v-if="submittedSearch && searchResults.fromTags.length ===0 && searchResults.fromKeywords.length ===0">
                  <hr>
                  <p style="font-size:0.9em">
                    {{`No model has been found `}}
                  </p>
                </div>

              </div>
            </div>

            <div v-if="hierarchyMode" id="modelTreeView"  class="row" >
              <div  class="col-sm-12">
                <p>
                    Select a model in the hierarchy 
                </p>
                
                <div v-if="modelTree">
                  
                  <div id="packages">
                  <b-tree-view 
                    v-on:nodeSelect="treeNodeSelect" 
                    :data="modelTree"  

                    nodeKeyProp="id"
                    nodeChildrenProp="children"

                    :renameNodeOnDblClick=false 
                    :contextMenu=false 
                    :contextMenuItems=[] 
                  >
                  </b-tree-view>
                  </div>
                </div>

              </div>
            </div>

            <div v-if="listMode" id="modelList"  class="row" >
              <div  class="col-sm-12">
                <p>
                  Select a model in the list: 
                </p>
                <b-list-group class="scrollable-menu" role="menu" style="width:100%">
                  <b-list-group-item 
                    v-for="modelid in $store.getters.getAlphabeticListOfModels"
                    v-bind:key="modelid"
                    v-on:click="selectModelById(modelid)"
                    style="font-size:0.75em" 
                  >
                    {{ modelid}}
                  </b-list-group-item>
                </b-list-group>
              </div>
            </div>
          
          </b-card-body>
        </b-card>

      </div>

      <div id="modelContent"   class="col-lg-7"  >
        <div v-if="selectedModelId">

          <!-- <div id="modelIdAndActions" class="row">
            <div class="col-md-12">
              <h2 style="text-align:center;">{{ `${selectedModelId}`}} </h2>
            </div>
          </div > -->

          <!-- <div id="Actions" class="row">
            <div class="col-md-4">
                <div @mouseleave="showCurrentRating(0)" style="display:inline-block;">
                    <star-rating :show-rating="false" @current-rating="showCurrentRating" @rating-selected="setCurrentSelectedRating" :increment="0.5"></star-rating>
                </div>
                <div style="margin-top:10px;font-weight:bold;">{{currentRating}}</div>
            </div >

            <div class="col-md-8">
              <div class="row" style="margin-top:5px;">
                <div class="col-md-4">
                  <button type="button" class="btn btn-success myButtonStyle" v-on:click="saveModel()"  > 
                    Save 
                  </button>
                </div >

                <div class="col-md-4">
                  <button type="button" class="btn btn-info myButtonStyle" v-on:click="reInitModel()"  > 
                    Reinit 
                  </button>
                </div >

                <div class="col-md-4">
                  <button type="button" class="btn btn-danger myButtonStyle" v-on:click="deleteModel()"  > 
                    Delete 
                  </button>
              </div >

            </div >

              
              

            </div >

          </div> -->

          <div id="modelId" v-if="errorMsg" class="row">
            <div class="col-md-12">
              {{errorMsg}}
            </div >
          </div >

          <br>

          <model-preview :selectedModel="selectedModel"></model-preview>

          

          <div id="ModelDetails">
            
            
            <button type="button" class="btn btn-outline-secondary" v-on:click="flip('expandedModelDetails')" style=" float:right; white-space:pre; width:30%;" > 
              {{formatLabel('ModelDetails')}} 
            </button>

            <div v-if="expandedModelDetails">

             <br>
             <br>
          

              <div id="ModelAttributs" > 

                <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelAttributs')" style="white-space:pre; width:100%;" > 
                  {{formatLabel('ModelAttributs')}} 
                </button>

                <br>
                <br>
                
                
                <div v-if="expandedModelAttributs">
                  <div id="AttributList" 
                    class="input-group mb-3"
                    v-for="(v,k) in selectedModel.Attributs"
                    v-bind:key="k"
                  >
                    <div class="input-group-prepend"  style="width:100%; text-align:left; overflow:scroll;"  >
                      <span class="input-group-text">
                        {{ k }}
                      </span>
                      <span class="form-control"  > 
                        {{ selectedModel.Attributs[k] }}
                      </span>
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
                    v-for="(v,k) in selectedModel.Description"
                    v-bind:key="k"
                  >
                    
                      <div  class="input-group-prepend" style="width:100%; text-align:left; overflow:scroll;"  >

                        <span class="input-group-text" >
                          {{ k }}
                        </span>
                        <!-- <input class="form-control" v-model="selectedModel.Descriptin[k]"   > -->
                        <span class="form-control">
                          {{selectedModel.Description[k]}}
                        </span>

                      </div>
                    

                  </div>

                  
                  <!-- <div class="input-group mb-3" style="overflow:scroll">
                    <div class="input-group-prepend" style="width:100%; text-align:left; overflow:scroll">
                        <span class="input-group-text" >
                          Abstract
                        </span>
                        <textarea class="form-control"  disabled v-model="selectedModel.Description['Abstract']" id="textarea-plaintext" rows=3></textarea>
                    </div>
                  </div> -->
                  
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
                    v-for="(v,k) in selectedModel.Algorithm.Attributs"
                    v-bind:key="k"
                  >
                    <div class="input-group-prepend" style="width:100%; text-align:left; overflow:scroll;"  >
                      <span class="input-group-text" >
                        {{ k }}
                      </span>
                      <span class="form-control">
                        {{ selectedModel.Algorithm.Attributs[k]}}
                      </span> 
                    </div>
                  </div>

                  <!-- TODO updaload algorithm file  in -->
                  <!-- <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">Code</span>
                    </div>
                    <textarea class="form-control" aria-label="With textarea" placeholder= " TODO display the content of the algorithm file ">
                    </textarea>
                  </div> -->

                

                </div>

              </div>

              <div id="ModelInputs" > 

                <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelInputs')" style="white-space:pre; width:100%;" > 
                  {{formatLabel('ModelInputs')}} 
                </button>

                <br>
                <br>
                
                <div v-if="expandedModelInputs">
        
                  <div v-if="toArrayIfNeeded(selectedModel.Inputs.Input)">

                    <!-- Display inputs in a table  -->

                    <b-table class="myTableCell" :responsive="'lg'" :no-border-collapse="true" :small="true" :fixed="true" :striped="true" :hover="true" :items="toItems(selectedModel.Inputs.Input)"></b-table>

                    <!-- Display inputs in an list -->

                    <!-- <b-card id="InputList" 
                      class="input-group mb-3"
                      v-for="(inputObj,inputIdx) of toArrayIfNeeded(selectedModel.Inputs.Input)"
                      v-bind:key="inputIdx"
                    >
                      <p style="text-align:left;"> {{` Input: ${inputObj.Attributs.name}`}}</p>

                      <div id="InputObject" 
                        class="input-group mb-3"
                        v-for="(inputObjAttVal,inputObjAttKey) in inputObj.Attributs"
                        v-bind:key="inputObjAttKey"
                      >
                          
                        <div class="input-group-prepend"  style="width:100%; text-align:left; overflow:scroll;"  >
                          <span class="input-group-text">
                            {{ inputObjAttKey }}
                          </span>
                          <span class="form-control">
                            {{inputObj.Attributs[inputObjAttKey]}}
                          </span> 
                        </div>
                    
                      </div>

                    </b-card> -->


                  </div>

                  
                </div>

              </div>
            
              <div id="ModelOutputs" > 

                <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelOutputs')" style="white-space:pre; width:100%;" > 
                  {{formatLabel('ModelOutputs')}} 
                </button>

                <br>
                <br>
                
                <div v-if="expandedModelOutputs">

                  <b-table class="myTableCell" :responsive="'lg'" :no-border-collapse="true" :small="true" :fixed="true" :striped="true" :hover="true" :items="toItems(selectedModel.Outputs.Output)"></b-table>

                  <!-- <div v-if="toArrayIfNeeded(selectedModel.Outputs.Output)">
                    
                    <b-card id="OutputList" 
                      class="input-group mb-3"
                      v-for="(outputObj, outputIdx) in toArrayIfNeeded(selectedModel.Outputs.Output)"
                      v-bind:key="outputIdx"
                    >
                      <p style="text-align:left;">{{`Output: ${outputObj.Attributs.name}`}}</p>

                      <div id="OutputObject" 
                        class="input-group mb-3"
                        v-for="(outputObjAttVal,outputObjAttKey) in outputObj.Attributs"
                        v-bind:key="outputObjAttKey"
                      >
                        <div class="input-group-prepend"  style="width:100%; text-align:left; overflow:scroll;"  >
                          <span class="input-group-text" v-bind:id="{ 'output': outputIdx }">
                            {{ outputObjAttKey }}
                          </span>
                          <span class="form-control">
                            {{outputObj.Attributs[outputObjAttKey]}}
                          </span>
                        </div>
                    
                      </div>

                    </b-card>
                  </div> -->

                </div>

              </div>

              <div id="ModelParametersets" > 

                <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelParametersets')" style="white-space:pre; width:100%;" > 
                  {{formatLabel('ModelParametersets')}} 
                </button>

                <br>
                <br>
                
                <div v-if="expandedModelParametersets">
                  
                  <div v-if="toArrayIfNeeded(selectedModel.Parametersets.Parameterset)">

                    <b-card  id="ParametersetList" 
                      class="input-group mb-3"
                      v-for="(paramsetObj,paramsetIdx) of toArrayIfNeeded(selectedModel.Parametersets.Parameterset)"
                      v-bind:key="paramsetIdx"
                    >
                      <p style="text-align:left">{{`Parameterset: ${paramsetObj.Attributs.name}`}}</p>

                      <div id="ParametersetObject Attributs" 
                        class="input-group mb-3"
                        v-for="(paramsetObjAttVal,paramsetObjAttKey) in paramsetObj.Attributs"
                        v-bind:key="paramsetObjAttKey"
                      >
                          
                        <div class="input-group-prepend"  style="width:100%; text-align:left; overflow:scroll;"  >
                          <span class="input-group-text" >
                            {{ paramsetObjAttKey }}
                          </span>
                          <span class="form-control">
                            {{ paramsetObj.Attributs[paramsetObjAttKey]}}
                          </span>
                        </div>
                    
                      </div>

                      <p style="text-align:left">  Parameters: </p>
                      
                      <b-card>
                      <div id="ParamObject" 
                        class="input-group mb-3"
                        
                        v-for="(paramObjVal,paramObjKey) in paramsetObj.Param"
                        v-bind:key="paramObjKey"
                      >
                          
                        <div class="input-group-prepend"  style="width:100%; text-align:left; overflow:scroll;"  >
                          <span class="input-group-text" >
                            {{ paramObjVal.Attributs.name }}
                          </span>
                          <span class="form-control">
                            {{ paramObjVal._}}
                          </span>  
                        </div>
                    
                      </div>
                      </b-card>

                    </b-card>

                  </div>

                  <!-- <div v-if="selectedModel.Parametersets.Parameterset.Attributs">

                    <p style="text-align: left;">{{` Parameterset: ${selectedModel.Parametersets.Parameterset.Attributs.name}`}}</p>

                    <div id="ParametersetObject Attributs" 
                        class="input-group mb-3"
                        v-for="(paramsetObjAttVal,paramsetObjAttKey) in selectedModel.Parametersets.Parameterset.Attributs"
                        v-bind:key="paramsetObjAttKey"
                      >
                          
                        <div class="input-group-prepend"  style="width:100%;" >
                          <span class="input-group-text" >
                            {{ paramsetObjAttKey }}
                          </span>
                          <span class="form-control">
                            {{selectedModel.Parametersets.Parameterset.Attributs[paramsetObjAttKey]}}
                          </span> 
                        </div>
                    
                      </div>
                  </div> -->

                </div>

              </div>

              <div id="ModelTestsets" > 

                <button type="button" class="btn btn-secondary" v-on:click="flip('expandedModelTestsets')" style="white-space:pre; width:100%;" > 
                  {{formatLabel('ModelTestsets')}} 
                </button>

                <br>
                <br>
                
                <div v-if="expandedModelTestsets">

                  <div v-if="toArrayIfNeeded(selectedModel.Testsets.Testset)">

                    <b-card id="TestsetList" 
                      class="input-group mb-3"
                      v-for="(testsetObj,testsetIdx) of toArrayIfNeeded(selectedModel.Testsets.Testset)"
                      v-bind:key="testsetIdx"
                    >
                    
                      <p style="text-align:left">{{`Testset: ${testsetObj.Attributs.name}`}}</p>


                      <div id="TestsetObject Attributs" 
                        class="input-group mb-3"
                        v-for="(testsetObjAttVal,testsetObjAttKey) in testsetObj.Attributs"
                        v-bind:key="testsetObjAttKey"
                      >
                          
                        <div class="input-group-prepend"  style="width:100%; text-align:left; overflow:scroll;"  >
                          <span class="input-group-text" >
                            {{ testsetObjAttKey }}
                          </span>
                          
                          <span class="form-control">
                            {{testsetObjAttVal}}
                          </span> 
                        </div>
                    
                      </div>

                      <p style="text-align:left">{{`Tests: `}}</p>
                      <b-card style="width: 100%;"
                        id="Test" 
                        class="input-group mb-3"
                        v-for="(testObj,testObjKey) of toArrayIfNeeded(testsetObj.Test)"
                        v-bind:key="testObjKey"
                      >

                        <p style="text-align:left">{{`Test name: ${testObj.Attributs.name}`}}</p>
                        

                        <div v-if="toArrayIfNeeded(testObj.InputValue)">
                          <p style="text-align:left"> Input values: </p>
                          
                          <div id="TestInputs" 
                          class="input-group mb-3"
                          v-for="(testObjInputVal,testInputObjKey) of toArrayIfNeeded(testObj.InputValue)"
                          v-bind:key="testInputObjKey"
                          >
                            
                            <div class="input-group-prepend"  style="width:100%; text-align:left; overflow:scroll;"  >
                              <span class="input-group-text" >
                                {{testObjInputVal.Attributs.name}}
                              </span>
                            <span class="form-control" >
                              {{testObjInputVal._}}
                            </span>
                            </div>

                          </div>
                        </div>


                        <br>

                        <div v-if="toArrayIfNeeded(testObj.OutputValue)">
                          <p style="text-align:left"> Output values: </p>
                          
                          <div id="TestOutputs" 
                          class="input-group mb-3"
                          v-for="(testObjOutputVal,testOutputObjKey) of toArrayIfNeeded(testObj.OutputValue)"
                          v-bind:key="testOutputObjKey"
                          >
                            
                            <div class="input-group-prepend"  style="width:100%; text-align:left; overflow:scroll;"  >
                              <span class="input-group-text" >
                                {{testObjOutputVal.Attributs.name}}
                              </span>
                            <span class="form-control" >
                              {{testObjOutputVal._}}
                            </span> 
                            </div>

                          </div>
                        </div>

                        
                    
    
                      </b-card>

                    </b-card>

                  </div>


                </div>

              </div>

            </div>
          </div>

        </div>

        <div v-else>
            Select a model to view its description
        </div>
          
      </div>

      <div id="modelInfo" class="col-lg-2" >
        
        <div>
          <b-card sub-title="Uploader" >
            
            <b-card-img 
                src="images/user_icon.png" 
                style="max-width:50px" 
                alt="User"
                top>
            </b-card-img>
            
            <b-card-text v-if="selectedModelId" class="modelInfoCardText">
                {{selectedModel.metaData.uploaderMail}}
            </b-card-text>
            
          </b-card>
        </div>

        <div>
          
          <b-card sub-title="Version" >
            <b-card-img 
                src="images/version_iconfinder_128px.png" 
                style="max-width: 50px" 
                alt="Users"
                top>
            </b-card-img>

            <b-card-text v-if="selectedModelId" class="modelInfoCardText">
                {{selectedModel.Attributs.version}}
            </b-card-text>

          </b-card>

        </div>

        <div>
          <b-card sub-title="Community" >
            <b-card-img 
                src="images/community_iconfinder_128px.png" 
                style="max-width: 50px" 
                alt="Users"
                top>
            </b-card-img>

          </b-card>

        </div>

        <div>
          <b-card sub-title="Tags" >
          <b-card-img 
                src="images/tag2_inconfinder_128px.png" 
                style="max-width: 50px" 
                alt="Users"
                top>
            </b-card-img>
            
            <div  v-if="selectedModelId">
              <b-form-tags  class="modelInfoCardText text-capitalize" input-id="tags-basic" 
                v-model="selectedModel.metaData.tags"
                disabled placeholder="">
              </b-form-tags>
            </div>
            

          </b-card>
        </div>

         <div>
          <b-card sub-title="Favourite by" >
          <b-card-img 
                src="images/favourite_iconfinder_128px.png" 
                style="max-width: 50px" 
                alt="Users"
                top>
            </b-card-img>
          </b-card>          
        </div>
        

      
      
      </div>

  </div>
  </div>
  
</template>
<script>

import { bTreeView } from 'bootstrap-vue-treeview'
// import StarRating from 'vue-star-rating'

import ModelServices from "../services/ModelServices"

import ModelPreview from './ModelPreview'


export default {
  name: 'Catalog',

  components: {
    // StarRating,
    bTreeView,
    ModelPreview,
  },

  data() {
    return {
      file:'',
      fileName:'',
      packageZip:{},
      packageName: '',
      errorMsg : "",
      selectedModelId: null,
      selectedModel:{},
      modelUnitSchema :{},
      expandedModelDetails: false,
      expandedModelAttributs :false,
      expandedDescription :false,
      expandedAlgorithm :false,
      expandedModelInputs :false,
      expandedModelOutputs :false,
      expandedModelParametersets: false,
      expandedModelTestsets :false,
      currentRating: "No Rating",
      currentSelectedRating: "No Current Rating",
      modelTree: null,
      selectedWord: "",
      submittedSearch:false,
      searchResults:{
        fromTags: [],
        fromKeywords:[]
      },
      searchMode:true,
      hierarchyMode:false,
      listMode:false,
    }
  },

  async created() {
  },

  async mounted() {
    
    console.log("START mounted Catalog")

    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initModels');
    }
    this.modelTree = [await ModelServices.requestModelTree()]

    console.log('this.modelTree: ')
    console.log(this.modelTree)
    console.log("END mounted Catalog")
  },

  computed:{
  },


  methods: {

    activateSearchMode(){
      this.searchMode =true;
      this.hierarchyMode =false;
      this.listMode=false;
    },

    activateHierarchyMode(){
      this.searchMode =false;
      this.hierarchyMode =true;
      this.listMode=false;
    },

    activateListMode(){
      this.searchMode =false;
      this.hierarchyMode =false;
      this.listMode=true;
    },

    treeNodeSelect(event){
      if(event.selected){
        if(event.data.name.indexOf('.xml')>0){
          console.log(`event.data.name : ${event.data.name}`)
          console.log(`event.data.id : ${event.data.id}`)
        }
        if(typeof event.data.idValue != 'undefined'){
          console.log(`event.data.name : ${event.data.name}`)
          console.log(`event.data.idValue : ${event.data.idValue}`)
          this.selectModelById(event.data.idValue)
        }
        
      }
    },


    toArrayIfNeeded(obj){
      if(obj instanceof Array ){
        return obj
      }else{ 
        return [obj]
      }
    },

    toItems(input_or_output){
      let array_of_obj = this.toArrayIfNeeded(input_or_output);
      let items = [];
      for(let obj of array_of_obj){
        items.push(obj.Attributs)
      }
      return items;
    },

    
    async submitSearch(){
      console.log("START submitSearch")
      console.log(this.selectedWord)

      this.submittedSearch=true ;

      // TODO reuse for more complex search with or condition
      // const modelIdValues =  await ModelServices.findJsonModelsBySearchWords([this.selectedWord]);
      
      if(typeof this.$store.state.keywordsObj[this.selectedWord] !=='undefined'){
        this.searchResults.fromKeywords=this.$store.state.keywordsObj[this.selectedWord];
      }
      
      if(typeof this.$store.state.tagsObj[this.selectedWord]!=='undefined'){
          this.searchResults.fromTags=this.$store.state.tagsObj[this.selectedWord]
      }

      console.log('this.searchResults')
      console.log(this.searchResults)
      
      console.log("END submitSearch")
    },

    async saveModel(){
      console.log("START saveModel")

      this.errorMsg =""
      const res =  await this.$store.dispatch('saveModel',this.selectedModel);

      if(res.Model === undefined){
        this.errorMsg = res;
      }

      console.log("END saveModel")
    },

    async reInitModel(){
      console.log("START reInitModel")


      this.errorMsg = ""

      // TODO case of new empty model
      
      const res = await this.$store.dispatch('reInitModel',this.selectedModelId);

      if(res.Model !== undefined){
        this.selectedModel = this.$store.getters.getModels.get(this.selectedModelId)
      }else{
        this.errorMsg = res;
      }
      
      
      
      console.log('this.selectedModel')
      console.log(this.selectedModel)

      console.log("END reInitModel")
    },

    async deleteModel(){

      console.log("START deleteModel")

      this.errorMsg =""

      const deletedModel = await this.$store.dispatch('deleteModel',this.selectedModel);

      console.log('deletedModel')
      console.log(deletedModel)

      this.selectedModelId= null

      this.selectedModel={}

      console.log("END deleteModel")
    },


    
    sign: function(expanded){
      return expanded? '-':'+';
    },

    flip(paramName){
      this[paramName] = !this[paramName]
    },

    formatLabel(paramName){

      switch (paramName) {

        case 'ModelDetails': 
          return `${this.sign(this.expandedModelDetails)} Details` ;
        

        case 'ModelAttributs': 
          return `${this.sign(this.expandedModelAttributs)} Attributs` ;
        
        case 'Description': 
          return `${this.sign(this.expandedDescription)} ${paramName}` ;
        
        case 'Algorithm': 
          return `${this.sign(this.expandedAlgorithm)} ${paramName}` ; 

        case 'ModelInputs': 
          return `${this.sign(this.expandedModelInputs)} Inputs` ;
        
        case 'ModelOutputs': 
          return `${this.sign(this.expandedModelOutputs)} Outputs` ;
        
        case 'ModelParametersets': 
          return `${this.sign(this.expandedModelParametersets)} Parametersets` ;

        case 'ModelTestsets': 
          return `${this.sign(this.expandedModelTestsets)} Testsets` ;
      
        default:
          break;
      }

    },

    selectModelById: function (modelid){
      this.selectedModelId = modelid;
      this.selectedModel = this.$store.getters.getModels.get(this.selectedModelId)

      console.log('this.selectedModelId')
      console.log(this.selectedModelId)

      console.log('this.selectedModel')
      console.log(this.selectedModel)

    },

    showCurrentRating: function(rating) {
      this.currentRating = (rating === 0) ? this.currentSelectedRating : "Click to select " + rating + " stars"
    },
    
    setCurrentSelectedRating: function(rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
    }
    
  },

  watch:{
    selectedWord(){
      this.submittedSearch=false ;
      this.searchResults.fromTags =[]
      this.searchResults.fromKeywords =[]

    }
  },

}
</script>

<style scoped>

#repository{
  width:100%;
  /* overflow:auto; */
}

p{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2px;
  padding-right: 2px;
}

#models{
  outline-width: 2px;
  outline-color: black;
}

#modelSearch{

}

#myDisabledInput{
  width: 100%;
  background: seashell;
  color: black;
  text-align: center;
}

#packages{
  padding: 20px;
  max-height: 50vh;
  overflow:scroll;
}

.dropdown-menu {
  height: 40vh;
}

.scrollable-menu {
    max-height: 60vh; 
    overflow: scroll;

}

.scrollable-submenu {
    max-height: 30vh; 
    overflow: scroll;

}

.myTableCell{
   width: 100%; 
  /* white-space: nowrap; */
  overflow: scroll;
  /* text-overflow: scroll;  */
  font-size: 0.75em;
  
}


.info-frame{
  outline-style:solid; 
  outline-width:1px;
  outline-color: grey ;
  margin:5px;
  border-radius: 45%;
}

.myButtonStyle{
  width:100%;
  font-size: 0.75em;
}

.modelInfoCardText{
  font-size: 0.75em;
}




</style>
