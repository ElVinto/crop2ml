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
              <b-nav-item @click="activatePersoMode()" >Mine</b-nav-item>

              <!-- <b-button variant="outline-secondary" @click="activateSearchMode()"  >Search</b-button>
              <b-button variant="outline-secondary" @click="activateHierarchyMode()"  >Hierarchy</b-button>
              <b-button variant="outline-secondary" @click="activateListMode()"  >List</b-button> -->
              
            </b-nav>
          </b-card-header>
          
          <b-card-body >

            <div v-if="searchMode" id="modelSearch" class="row">
              <div  class="col-sm-12">
                <p>
                    Find a model by keywords
                </p>

                <b-input-group id="Search"  >
                  <b-form-input placeholder="keyword" list="wordOptionDataList" v-model="selectedWord"></b-form-input>
                  
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

                <div v-if="selectedWord.length>0 && searchResults.fromKeywords !== null && searchResults.fromKeywords.length>0">
                  <hr>
                  <p style="text-align:left; ">
                    {{`Keyword "${selectedWord}": models founds`}}
                  </p>
                  <b-list-group class="scrollable-submenu" role="menu" style="width:100%">
                    <b-list-group-item 
                      v-for="modelid in searchResults.fromKeywords"
                      v-bind:key="modelid"
                      v-on:click="selectModelById(modelid)"
                      style="font-size:0.7em" 
                    >
                      {{ modelid}}
                    </b-list-group-item>
                  </b-list-group>
                </div>

                <div v-if="submittedSearch && searchResults.fromKeywords.length ===0 && searchResults.fromKeywords.length ===0">
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

            <div v-if="persoMode" id="modelPerso"  class="row" >
              <div  class="col-sm-12">
                <p>
                  You are editor or administrator of those models.
                  Select a model in the list: 
                </p>
                <b-list-group class="scrollable-menu" role="menu" style="width:100%">
                  <b-list-group-item 
                    v-for="model in $store.getters.getListOfPersonalModels"
                    v-bind:key="model"
                    v-on:click="selectModelById(model.modelId)"
                    style="font-size:0.75em" 
                  >
                    {{ model.modelId}}<br>
                    <!--b-badge color="primary">{{ model.role}}</b-badge-->
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
          <br>
          <div id="ModelDetails">
            <b-tabs content-class="mt-3">
              
              <b-tab title="Attributs" active>
                <b-table-simple class="text-left" :responsive="'md'" :no-border-collapse="true" :fixed="true" :striped="true" :hover="true">
                  <b-tbody>
                      <b-tr v-for="(v,k) in selectedModel.Attributs" v-bind:key="k">
                          <b-td style='font-weight:bold;'>{{ k }}</b-td>
                          <b-td>{{ v }}</b-td>
                      </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-tab>
              
              <b-tab title="Description">
                <b-table-simple class="text-left" :responsive="true" :striped="true" :hover="true">
                  <b-tbody>
                      <b-tr v-for="(v,k) in selectedModel.Description" v-bind:key="k">
                          <b-td style='font-weight:bold;'>{{ k }}</b-td>
                          <b-td>{{ v }}</b-td>
                      </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-tab>

              <b-tab title="Algorithm">
                <b-table-simple v-if="hasAlgorithm()" class="text-left" :responsive="true" :striped="true" :hover="true">
                  <b-tbody>
                      <b-tr v-for="(v,k) in selectedModel.Algorithm.Attributs" v-bind:key="k">
                          <b-td style='font-weight:bold;'>{{ k }}</b-td>
                          <b-td>{{ v }}</b-td>
                      </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-tab>

              <b-tab title="Inputs">
                <div v-if="toArrayIfNeeded(selectedModel.Inputs.Input)">
                  <b-table class="text-left" :responsive="true" :striped="true" :hover="true" :items="toItems(selectedModel.Inputs.Input)"></b-table>
                </div>
              </b-tab>

              <b-tab title="Outputs">
                <div v-if="toArrayIfNeeded(selectedModel.Outputs.Output)">
                  <b-table class="text-left" :responsive="true" :striped="true" :hover="true" :items="toItems(selectedModel.Outputs.Output)"></b-table>
                </div>
              </b-tab>

              <b-tab title="Parameters">
                <div v-if="toArrayIfNeeded(selectedModel.Parametersets.Parameterset)">

                  <b-card
                    class="input-group mb-3"
                    v-for="(paramsetObj,paramsetIdx) of toArrayIfNeeded(selectedModel.Parametersets.Parameterset)"
                    v-bind:key="paramsetIdx"
                  >
                    <p style="text-align:left; font-weight:bold">{{`Parameterset : ${paramsetObj.Attributs.name}`}}</p>
                    <p style="text-align:left;">
                      {{ paramsetObj.Attributs.description}}
                    </p>
                    <p style="text-align:left;">
                      {{ paramsetObj.Attributs.uri}}
                    </p>
                    <p style="text-align:left; text-decoration: underline">Parameters</p>
                    <b-table-simple class="text-left" :responsive="true" :striped="true" :hover="true">
                      <b-tbody>
                          <b-tr v-for="(paramObjVal,paramObjKey) in paramsetObj.Param" v-bind:key="paramObjKey">
                              <b-td style='font-weight:bold;'>{{ paramObjVal.Attributs.name }}</b-td>
                              <b-td>{{ paramObjVal._}}</b-td>
                          </b-tr>
                      </b-tbody>
                    </b-table-simple>
                  </b-card>

                </div>
              </b-tab>

              <b-tab title="Tests">
                <div v-if="toArrayIfNeeded(selectedModel.Testsets.Testset)">

                  <b-card
                    class="input-group mb-3"
                    v-for="(testsetObj,testsetIdx) of toArrayIfNeeded(selectedModel.Testsets.Testset)"
                    v-bind:key="testsetIdx"
                  >
                    <p style="text-align:left; font-weight:bold">{{`Testset : ${testsetObj.Attributs.name}`}}</p>
                    <p style="text-align:left;">
                      {{ testsetObj.Attributs.description}}
                    </p>
                    <p style="text-align:left;">
                      Parameterset : {{ testsetObj.Attributs.parameterset}}
                    </p>
                    <p style="text-align:left;">
                      {{ testsetObj.Attributs.uri}}
                    </p>

                    <p style="text-align:left; text-decoration: underline">Tests :</p>
                    <b-card style="width: 100%;"
                      id="Test" 
                      class="input-group mb-3"
                      v-for="(testObj,testObjKey) of toArrayIfNeeded(testsetObj.Test)"
                      v-bind:key="testObjKey"
                    >
                      <p style="text-align:left; font-weight:bold">{{`Test name : ${testObj.Attributs.name}`}}</p>

                      <div v-if="toArrayIfNeeded(testObj.InputValue)">
                        <p style="text-align:left; text-decoration: underline">Input values :</p>
                        
                        <b-table-simple class="text-left" :responsive="true" :striped="true" :hover="true">
                          <b-tbody>
                              <b-tr v-for="(testObjInputVal,testInputObjKey) of toArrayIfNeeded(testObj.InputValue)"
                                    v-bind:key="testInputObjKey">
                                  <b-td style='font-weight:bold;'>{{ testObjInputVal.Attributs.name }}</b-td>
                                  <b-td>{{ testObjInputVal._}}</b-td>
                              </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </div>
                      <br>
                      <div v-if="toArrayIfNeeded(testObj.OutputValue)">
                        <p style="text-align:left; text-decoration: underline">Output values :</p>
                        
                        <b-table-simple class="text-left" :responsive="true" :striped="true" :hover="true">
                          <b-tbody>
                              <b-tr v-for="(testObjOutputVal,testOutputObjKey) of toArrayIfNeeded(testObj.OutputValue)"
                                    v-bind:key="testOutputObjKey">
                                  <b-td style='font-weight:bold;'>{{ testObjOutputVal.Attributs.name }}</b-td>
                                  <b-td>{{ testObjOutputVal._}}</b-td>
                              </b-tr>
                          </b-tbody>
                        </b-table-simple>
                      </div>

                    </b-card>
                  </b-card>

                </div>
              </b-tab>

              <b-tab title="Pictures">
                <b-card v-for="picture in selectedModel.metaData.pictures" :key="picture">
                  <b-card-img :src="getPicturePath(picture)"/>
                </b-card>
              </b-tab>
            </b-tabs>
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
          <b-card sub-title="Keywords" >
          <b-card-img 
                src="images/tag2_inconfinder_128px.png" 
                style="max-width: 50px" 
                alt="Users"
                top>
            </b-card-img>
            
            <div  v-if="selectedModelId">
              <b-form-tags  class="modelInfoCardText text-capitalize" input-id="tags-basic" 
                v-model="selectedModel.metaData.keywords"
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
import config from '../config'


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
        fromKeywords:[]
      },
      searchMode:true,
      hierarchyMode:false,
      listMode:false,
      persoMode:false,
    }
  },

  async created() {
  },

  async mounted() {
    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initModels');
    }
    this.modelTree = [await ModelServices.getModelsTree()]
  },

  computed:{
  },


  methods: {

    activateSearchMode(){
      this.searchMode =true;
      this.hierarchyMode =false;
      this.listMode=false;
      this.persoMode=false;
    },

    activateHierarchyMode(){
      this.searchMode =false;
      this.hierarchyMode =true;
      this.listMode=false;
      this.persoMode=false;
    },

    activateListMode(){
      this.searchMode =false;
      this.hierarchyMode =false;
      this.listMode=true;
      this.persoMode=false;
    },

    activatePersoMode(){
      this.searchMode =false;
      this.hierarchyMode =false;
      this.listMode=false;
      this.persoMode=true;
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

    getPicturePath(picture){
      return `http://${config.server.host}:${config.server.port}/packages/` + this.selectedModel.metaData.packageName + '/doc/images/' + picture
    },

    hasAlgorithm(){
      return !(typeof this.selectedModel.Algorithm === "undefined")
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

    selectModelById: function (modelid){
      this.selectedModelId = modelid;
      this.selectedModel = this.$store.getters.getModels.get(this.selectedModelId)
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
