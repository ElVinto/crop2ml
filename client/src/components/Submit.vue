<template>

  <div v-if="$store.getters.getDataAreLoaded" style="display:block; width:100%; margin-top:20px; margin-bottom:100px" >

    <div v-if="!$store.getters.getLoggedUserInfo">
        Please <a href="#/SignIn">sign-in</a>  or <a href="#/register"> register </a> before uploading or editing a model.
    </div>

    <div v-else-if="!canEdit">
        You are not allowed to edit this model.
    </div>

    <div v-else class="row" >
      <div class="col-sm-2"></div>
      <div class="col-sm-8">

        <div v-if='submitMode'>
        
          <b> Submit a new model or update the version of a model.</b>

          <!--  Choose Package.zip -->
          <b-input-group  class="mt-3" >
            <b-form-file
              v-model="packageZip"
              :state="Boolean(packageZip)"
              placeholder="Choose a file.zip or drop it here..."
              drop-placeholder="Drop file.zip here..."
              accept=".zip"
            ></b-form-file>
            <!--
              <div class="input-group-append">
                <b-button variant="secondary"  v-on:click="submitZip()">Send</b-button>
              </div>
            -->
          </b-input-group>

          <div class="mt-3">
            {{ uploadMsg  }}
          </div>

          <b-button :disabled="!packageZip" variant="primary" style="margin-top: 1em;" v-on:click="submitZip()">Submit zip</b-button>

          <div v-if="submitted && !treeDataReceived">
            <p>
              <b>Extracting archive...</b> 
            </p>
            <p>
              <b-spinner small label="Small Spinner" type="grow"></b-spinner>
              <b-spinner small label="Small Spinner" type="grow"></b-spinner>
              <b-spinner small label="Small Spinner" type="grow"></b-spinner>
            </p>
          </div>

          <div v-if="modelExists">
            <p style="padding-top:1em;">
              <b>This version of this model already exists. Or you are not an administrator of this model and can not update it.</b>
            </p>
          </div>
        </div>

        <div v-if="(submitMode && success && treeDataReceived && !packageZip) || !submitMode">
          
          <p v-if="submitMode" style="text-align:left; padding-top:1em;">
            <b>Extracted package structure:</b>
            <b-tree-view v-on:nodeSelect="treeNodeSelect" :data="treeDataReceived"  :renameNodeOnDblClick=false :contextMenu=false :contextMenuItems=[] ></b-tree-view>
          </p>

          <h3 style="padding-top: 1em; text-align:left; "> {{ model.id }} metadata : </h3>
          <p style="margin-bottom: 0; text-align:left; font-weight: bold;">It is already prefilled with extracted data from the package or previous version of the model.</p>

          <div>

            <!-- Keywords -->
            <b-input-group style="padding-top: 1em; " prepend="Latest version keywords">
              <b-form-tags class="text-capitalize"
                v-model="keywords"
                separator=","
                placeholder="Enter new keywords separated by comma"
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>

            <!-- Add Model Type -->
            <b-input-group prepend="Type of model" style="padding-top: 1em; ">
              <b-form-select v-model="model.modelType" :options="modelTypeOptions"></b-form-select>
            </b-input-group>

            <!--b-input-group style="padding-top: 1em; ">
              <b-input-group-prepend is-text>
                  <b-form-checkbox switch v-model="isPartOfLargerModel" class="mr-n2">
                    <span class="sr-only">Switch for following text input</span>
                  </b-form-checkbox>
              </b-input-group-prepend>
              <b-form-input disabled placeholder=" Is part of a larger model ?" style="background:white" ></b-form-input>
            </b-input-group-->

            <!--div v-if="isPartOfLargerModel"-->
              <b-row no-gutters style="margin-top:1em;">
                <b-col lg="9" >
                    <!-- Larger model packages -->
                    <b-input-group prepend="Larger model names">
                      <b-form-tags class="form-control" style="background: white;"
                        v-model="model.largerModelPackageNames"
                        separator=","
                        placeholder="Enter registered package names separated by comma or .. "
                        invalid-tag-text="unknown package name"
                        duplicate-tag-text="duplicated package name"
                        :tag-validator="packageValidator"   
                        no-add-on-enter
                      ></b-form-tags>
                    </b-input-group>
                </b-col>
                <b-col lg="3" >
                  <b-input-group id="AddPackage">
                  <b-form-input placeholder=" add from the list" list="packageNameList" v-model="selectedLargerPackage"></b-form-input>
                  
                  <datalist id="packageNameList">
                    <option  
                      v-for="packageOption in registeredPackageNames"
                      v-bind:key="packageOption"
                      >
                      {{packageOption}}
                    </option>
                  </datalist> 

                  <b-button size="sm" class="my-2 my-sm-0" v-on:click="addLargerPackage()" type="submit">Add</b-button>
                </b-input-group>

                </b-col>
              </b-row>
            <!--/div-->

            <!-- Linked Community -->
            <b-input-group id="LinkedCommunity" prepend="Link to an existing community" style="padding-top: 1em; ">
              <b-form-input  placeholder="Select in the list" list="communityNameList" v-model="model.linkedCommunity"></b-form-input>
              <datalist id="communityNameList">
                <option  
                  v-for="communityNameOption in communityNames"
                  v-bind:key="communityNameOption"
                  >
                  {{communityNameOption}}
                </option>
              </datalist> 
            </b-input-group>

            <!-- Publications -->
            <b-input-group prepend="Publications" style="padding-top: 1em; text-align:left;">
            <b-form-tags class="form-control"  style="background: white;"
                v-model="model.publications"
                separator=","
                placeholder= "Enter links separated by comma"
                invalid-tag-text="Please enter a valid link"
                :tag-validator="linkValidator"
                duplicate-tag-text="duplicated links"
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>

             <!-- Git link-->
            <b-input-group prepend="Git link" style="padding-top: 1em; text-align:left;">
              <b-form-input
                placeholder="Enter git link"
                v-model="model.gitLink"
              >
              </b-form-input>
            </b-input-group>
            
            <!-- Model Package Administrators-->
            <p style="padding-top: 1em; text-align:left; margin-bottom:0">Contributors : Administrators can edit informations, update the model, delete the model. Editors can only edit informations. The uploader of the package is automatically set as an administrator.</p>
            <b-input-group prepend="Administrators" style="padding-top: 1em; text-align:left;">
              <b-form-tags class="form-control"  style="background: white;"
                  v-model="model.administratorsMails"
                  separator=","
                  placeholder= "Enter e-mail separated by comma"
                  invalid-tag-text="Please enter a valid email address"
                  :tag-validator="emailValidator"
                  duplicate-tag-text="duplicated e-mail"
                  no-add-on-enter
                ></b-form-tags>
            </b-input-group>

            <!-- Model Package Editors -->
            <b-input-group prepend="Editors" style="padding-top: 1em; text-align:left;">
            <b-form-tags class="form-control"  style="background: white;"
                v-model="model.editorsMails"
                separator=","
                placeholder= "Enter e-mail separated by comma"
                invalid-tag-text="Please enter a valid email address"
                :tag-validator="emailValidator"
                duplicate-tag-text="duplicated e-mail"
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>

          </div>

          <b-button variant="primary" style="margin-top: 1em;" v-on:click="saveModel()">Save metadata</b-button>
          <div class="mt-3">
            {{ editMsg  }}
          </div>
        </div>

      </div>
      <div class="col-sm-2"/>
      
    </div>
  </div>

</template>
<script>

import FileServices from "../services/FileServices"
import CommunityServices from "../services/CommunityServices"
import { bTreeView } from 'bootstrap-vue-treeview'

export default {
  name: 'Submit',

   data() {
      return {
        regEmail: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        regLink: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
        packageZip: null,
        packageZipSent : false,
        keywords:[],
        submitted: false,
        treeDataReceived :null,
        modelTypeSelected : 'Main',
        modelTypeOptions: [
            {value: 'Main', text: 'Main'},
            {value: 'Component', text: 'Component'},
        ],
        isPartOfLargerModel: false,
        registeredPackageNames : [],
        largerModelPackageNames:[],
        selectedLargerPackage : null,
        linkedCommunity: null,
        publications: [],
        gitLink: null,
        communityNames:[],
        //registeredEmails : [],
        administrators:[],
        //selectedAdministrator: null,
        editors:[],
        //selectedEditor: null,
        success: false,
        model: null,
        modelExists: false,
        submitMode: true,
        editMsg: "",
        canEdit: true
      }
    },

  computed:{

    uploadMsg: function(){
      let msg = ""
      if(!this.packageZip && !this.packageZipSent){
        msg= 'No selected file.zip'
      }
      if(!this.packageZip && this.packageZipSent){
        msg= 'Model package sent successfully'
      }
      return msg;
    }
  },

  components: {
    bTreeView
  },

  async created() {
  },

  async mounted() {
    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initModels');
    }

    if (this.$route.name == "Edit" && this.$route.params.modelid != null){
      this.submitMode = false
      this.model = this.$store.getters.getModelById(this.$route.params.modelid)
      this.setKeywords()
      if (!this.isAdmin() && !this.isEditor()){
        this.canEdit = false
      }
    }

    //this.registeredEmails = await UserServices.getRegisteredEmails();
    this.registeredPackageNames = this.$store.getters.getModelIds
    let communityList = await CommunityServices.getAllCommunities()
    this.communityNames = communityList.map(c => c.name)
  },

  methods: {

    treeNodeSelect(event){
      if(event.selected){
        console.log(event.data.name)
      }
    },

    isAdmin(){
      return (this.$store.getters.getLoggedUserInfo != null &&
      this.$store.getters.getLoggedUserInfo.associatedModels.findIndex(m => (m.modelId == this.model.id && m.role == "administrator")) != -1)
    },

    isEditor(){
      return (this.$store.getters.getLoggedUserInfo != null &&
      this.$store.getters.getLoggedUserInfo.associatedModels.findIndex(m => (m.modelId == this.model.id && m.role == "editor")) != -1)
    },

    async submitZip(){

      const modelMetaDataPart ={
        uploaderMail: this.$store.getters.getLoggedUserInfo.email,
      }

      this.submitted =true
      this.modelExists = false
      this.treeDataReceived = null
      this.keywords = []
      this.model = null

      const res = await FileServices.sendZip(this.packageZip,modelMetaDataPart)
      this.success = res.success
      this.treeDataReceived = [res.tree]
      this.model = res.model
      this.setKeywords()

      if (!this.success){
        this.submitted = false
        if (this.treeDataReceived)
          this.modelExists = true
      }
      
      this.packageZip = null
      this.packageZipSent = true;
      if (this.success){
        this.$store.commit("setModel", this.model);
      }
    },

    async saveModel(){
      if (this.model.administratorsMails.length == 0){
        this.editMsg = "At least one administrator is required."
        return
      }
      this.editMsg = "" 
      let indexLatestVersion = this.getModelLatestVersionIndex()
      this.model.versions[indexLatestVersion].metaData.keywords = this.keywords
      let editSuccess = await this.$store.dispatch('saveModel',this.model);
      if (editSuccess)
        this.editMsg = "Model saved"
      else
        this.editMsg = "Error while saving the model"
    },

    getModelLatestVersionIndex(){
      let latestVersionNum = this.model.versionsList.sort()[this.model.versionsList.length -1]
      let indexLatestVersion = this.model.versions.findIndex(compo => compo.Attributs.version == latestVersionNum)
      return indexLatestVersion
    },

    setKeywords(){
      let indexLatestVersion = this.getModelLatestVersionIndex()
      this.keywords = this.model.versions[indexLatestVersion].metaData.keywords
    },

    addLargerPackage(){
      this.largerModelPackageNames.push(this.selectedLargerPackage)
    },

    packageValidator(name){
      return this.registeredPackageNames.includes(name)
    },

    emailValidator(email){
      return (email == "")? "" : (this.regEmail.test(email)) ? true : false;
    },

    linkValidator(link){
      return (link == "")? "" : (this.regLink.test(link)) ? true : false;
    },
    
  },

  watch:{

    packageZip: function(){
      if(this.packageZip){
        //this.packageName = this.packageZip.name.replace('.zip','')
        return this.packageZipSent=false;
      }
    },
  }

}
</script>

<style scoped>

.packageZipInputGroup{
  width: 80%;
  text-align: center;
}

p{
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2px;
  padding-right: 2px;
}

.scrollable-menu {
    height: auto;
    max-height: 60vh;
    overflow: scroll;
}

</style>
