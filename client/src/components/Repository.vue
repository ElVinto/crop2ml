<template>

  <div id ="repository" v-if="$store.getters.getDataAreLoaded" style="display:block;  " >

    <div class ="row"  > 
      
      <div id="models" class="col-lg-3" >

        <b-card id ="modelsCard">

          <b-card-header>
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
              <b-button size="sm" class="my-2 my-sm-0" v-on:click="submitSearch()" type="submit">Filter</b-button>
            </b-input-group>

            <br>

            <b-form-checkbox v-model="showOnlyPersoModels" @change="submitSearch()" class="mr-n2">
              Show only models which I am editor or administrator.
            </b-form-checkbox>

          </b-card-header>
          
          <b-card-body >

            <div id="modelTreeView"  class="row" >
              <div  class="col-sm-12">
                
                <div v-if="modelTree">
                  <div id="packages">
                  <b-tree-view 
                    v-on:nodeSelect="treeNodeSelect" 
                    :data="modelTree"  
                    nodeKeyProp="id"
                    nodeLabelProp="name"
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

          <div>
            <b-card 
                :header="selectedModel.Attributs.id"
                header-bg-variant="secondary"
                header-text-variant="white"
                class="text-left"
            > 
                <b-row no-gutters>
                    <b-col lg="3" >
                        <b-card-img src="images/modeling_iconfinder_128px.png" style="max-width:100px"   alt="Model Preview" ></b-card-img>
                    </b-col>
                    <b-col lg="9" class="text-left">
                        <h4>  {{ selectedModel.Description.Title}}</h4>
                        <p>
                            {{ ` ${selectedModel.Description.Abstract}`}} <br>
                            {{ `Institution: ${selectedModel.Description.Institution}`}}   <br>     
                            {{ `Authors: ${selectedModel.Description.Authors}`}}
                        </p>
                    </b-col>
                </b-row>
                <b-row no-gutters >
                  <div class="col-md-4">
                      <b-button variant="primary" @click="downloadModel">Download model</b-button>
                  </div >
                  <div class="col-md-4" v-if="isAdmin()">
                      <b-button variant="danger" v-b-modal.modal-1>Delete model</b-button>
                      <b-modal id="modal-1" title="Delete model ?" ok-title="Yes I'm sure" ok-variant="danger" @ok="deleteModel()">
                        <p class="my-4">{{ `Are you sure you want to delete the version ${this.selectedVersion} of the model ${this.compoModel.Attributs.name} ?`}}</p>
                      </b-modal>
                  </div >
                  
                </b-row>
            </b-card>
          </div>

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

              <!--b-tab title="Algorithm" v-if="exists(selectedModel.Algorithm)">
                <b-table-simple class="text-left" :responsive="true" :striped="true" :hover="true">
                  <b-tbody>
                      <b-tr v-for="(v,k) in selectedModel.Algorithm.Attributs" v-bind:key="k">
                          <b-td style='font-weight:bold;'>{{ k }}</b-td>
                          <b-td>{{ v }}</b-td>
                      </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-tab-->

              <b-tab title="Inputs" v-if="exists(selectedModel.Inputs)">
                <div v-if="toArrayIfNeeded(selectedModel.Inputs.Input)">
                  <b-table class="text-left" :responsive="true" :striped="true" :hover="true" :items="setInputs(selectedModel.Inputs.Input)"></b-table>
                </div>
              </b-tab>

              <b-tab title="Outputs" v-if="exists(selectedModel.Outputs)">
                <div v-if="toArrayIfNeeded(selectedModel.Outputs.Output)">
                  <b-table class="text-left" :responsive="true" :striped="true" :hover="true" :items="setOutputs(selectedModel.Outputs.Output)"></b-table>
                </div>
              </b-tab>

              <b-tab title="Parameters" v-if="exists(selectedModel.Inputs)">
                <div v-if="toArrayIfNeeded(selectedModel.Inputs.Input)">
                  <b-table class="text-left" :responsive="true" :striped="true" :hover="true" :items="setParameters(selectedModel.Inputs.Input)"></b-table>
                </div>
              </b-tab>

              <!--b-tab title="Parametersets" v-if="exists(selectedModel.Parametersets)">
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
              </b-tab-->

              <!--b-tab title="Testsets" v-if="exists(selectedModel.Testsets)">
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
              </b-tab-->

              <b-tab title="Pictures" v-if="exists(selectedModel.metaData) && exists(selectedModel.metaData.pictures)">
                <b-card v-for="picture in selectedModel.metaData.pictures" :key="picture">
                  <b-card-img :src="getPicturePath(picture)"/>
                </b-card>
              </b-tab>
            </b-tabs>
          </div>

        </div>

        <div v-else>
          <br>
          <b>Select a model on the left to view its description</b>
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
              {{compoModel.metaData.uploaderMail}}
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
              <b-form-select v-model="selectedVersion" :options="this.model.versionsList">
              </b-form-select>
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
            <b-card-text v-if="selectedModelId" class="modelInfoCardText">
                {{model.linkedCommunity}}
            </b-card-text>
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
              <b-form-tags class="modelInfoCardText text-capitalize" input-id="tags-basic" 
                v-model="compoModel.metaData.keywords"
                disabled placeholder="">
              </b-form-tags>
            </div>
          </b-card>
        </div>

        <!--div>
          <b-card sub-title="Favourite by" >
          <b-card-img 
                src="images/favourite_iconfinder_128px.png" 
                style="max-width: 50px" 
                alt="Users"
                top>
            </b-card-img>
          </b-card>          
        </div-->
        
      </div>

    </div>
  </div>
  
</template>
<script>

import { bTreeView } from 'bootstrap-vue-treeview'
// import StarRating from 'vue-star-rating'
import FileServices from "../services/FileServices"
import ModelServices from "../services/ModelServices"
import config from '../config'


export default {
  name: 'Catalog',

  components: {
    // StarRating,
    bTreeView
  },

  data() {
    return {
      errorMsg : "",
      
      currentRating: "No Rating",
      currentSelectedRating: "No Current Rating",
      
      modelTree: null,
      showOnlyPersoModels: false,
      selectedWord: "",
      isUnitModel:false,
      model:{},
      compoModel:{},
      unitModel:{},
      selectedVersion: null,
      selectedTreeNode: null,
      selectedModelId: null,
      selectedModel:{},
    }
  },

  async created() {
  },

  async mounted() {
    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initModels');
    }
    await this.updateModelTree()
  },

  computed:{
  },

  methods: {

    isAdmin(){
      return (!this.isUnitModel &&
      this.$store.getters.getLoggedUserEMail != null &&
      this.model.administratorsMails.includes(this.$store.getters.getLoggedUserEMail))
    },

    async updateModelTree(searchKeywords = []){
      let models = await ModelServices.getAllModels()
      let mainChildrens = []
      let email = this.$store.getters.getLoggedUserEMail
      let checkEmail = false
      if (this.showOnlyPersoModels && email != null){
        checkEmail = true
      }
      
      for(let m of models){
        if (checkEmail && !m.administratorsMails.includes(email) && !m.editorsMails.includes(email)){
          continue
        } else {
          let modelCompo = m.versions[0] //TODO : be sure it's the latest version
          let addModel = true
          if (searchKeywords.length > 0){
            addModel = modelCompo.metaData.keywords.some(keyword => searchKeywords.includes(keyword))
          }
          if (addModel) {
            let compoModelTree = {
              id: modelCompo.Attributs.id,
              name: modelCompo.Attributs.id,
              parent: null,
              children: []
            }
            let modelUnits = modelCompo.Composition.Model 
            for (let mu of modelUnits){
              compoModelTree.children.push({
                  id : mu.Attributs.id,
                  name : mu.Attributs.id.split('.').at(-1),
                  parent : modelCompo.Attributs.id
                }
              )
            }
            mainChildrens.push(compoModelTree)
          }
        }
      }
      this.modelTree = mainChildrens
    },

    treeNodeSelect(event){
      if(event.selected){
        if(typeof event.data.id != 'undefined'){
          this.selectedVersion = null
          this.selectedTreeNode = event.data
          this.selectModelById()
        }
      }
    },

    getPicturePath(picture){
      return `http://${config.server.host}:${config.server.port}/packages/` + this.selectedModel.metaData.packageName + '/doc/images/' + picture
    },

    exists(field){
      return !(typeof field === 'undefined')
    },

    toArrayIfNeeded(obj){
      if(obj instanceof Array ){
        return obj
      }else{ 
        return [obj]
      }
    },

    setInputs(input_or_output){
      let array_of_obj = this.toArrayIfNeeded(input_or_output);
      let items = [];
      for(let obj of array_of_obj){
        if(obj.Attributs.inputtype == "variable"){
          delete obj.Attributs.inputtype
          items.push(obj.Attributs)
        }
      }
      return items;
    },

    setParameters(input_or_output){
      let array_of_obj = this.toArrayIfNeeded(input_or_output);
      let items = [];
      for(let obj of array_of_obj){
        if(obj.Attributs.inputtype == "parameter"){
          delete obj.Attributs.inputtype
          items.push(obj.Attributs)
        }
      }
      return items;
    },

    setOutputs(input_or_output){
      let array_of_obj = this.toArrayIfNeeded(input_or_output);
      let items = [];
      for(let obj of array_of_obj){
        items.push(obj.Attributs)
      }
      return items;
    },

    async submitSearch(){
      if (this.selectedWord != "")
        await this.updateModelTree([this.selectedWord])
      else
        await this.updateModelTree()
    },

    async saveModel(){
      this.errorMsg =""
      const res =  await this.$store.dispatch('saveModel',this.selectedModel);
      if(res.Model === undefined){
        this.errorMsg = res;
      }
    },

    /*async reInitModel(){
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
    },*/

    async deleteModel(){
      this.errorMsg =""
      await this.$store.dispatch('deleteModel', {modelid: this.model.id, version: this.selectedVersion, user: this.$store.state.loggedUserInfo.email});
      this.unselectModel()
      await this.submitSearch()
    },

    async downloadModel(){
      const res =  await FileServices.downloadZip(this.compoModel.metaData.zipName)
      console.log(res)
    },

    unselectModel(){
      this.isUnitModel=false
      this.model={}
      this.compoModel={}
      this.unitModel={}
      this.selectedVersion= null
      this.selectedTreeNode= null
      this.selectedModelId= null
      this.selectedModel={}
    },

    selectModelById(){
      if(this.selectedTreeNode != null){
        this.selectedModelId = this.selectedTreeNode.id;
        [this.isUnitModel, this.model, this.compoModel, this.unitModel, this.selectedVersion] = this.$store.getters.getModelByIdAndVersion(this.selectedTreeNode, this.selectedVersion)
        this.selectedModel = this.isUnitModel ? this.unitModel : this.compoModel
      }
    },

    showCurrentRating(rating) {
      this.currentRating = (rating === 0) ? this.currentSelectedRating : "Click to select " + rating + " stars"
    },
    
    setCurrentSelectedRating(rating) {
      this.currentSelectedRating = "You have Selected: " + rating + " stars";
    }
    
  },

  watch:{
    selectedVersion: function(){
      this.selectModelById()
    }
  },

}
</script>

<style>
/*.tree-node-children .tree-node-label span:before {
  content: ".";
}*/
.tree-node-children .tree-node-label span {
  font-size: small;
}
</style>

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

#myDisabledInput{
  width: 100%;
  background: seashell;
  color: black;
  text-align: center;
}

#modelsCard{
  overflow:scroll;
  height: 100%;
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
