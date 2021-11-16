<template>

  <div v-if="$store.getters.getDataAreLoaded" style="display:block; overflow: scroll; height:80vh; width:100%; margin-top:20px;" >

    <div v-if="!$store.getters.getLoggedUserInfo">
        Please <a href="#/SignIn">sign-in</a>  or <a href="#/register"> register </a> before uploading a model
    </div>

    <div v-else  id="packageZip" class="row" >
      <div class="col-sm-2"></div>
      <div class="col-sm-8">

        <b> Submit or update a model repository </b>

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

        <div class="mt-3" v-if="packageZip"> 
          
          <div >

            <!-- Choose Model Package Name-->
            <b-input-group prepend="Model Package Name">
              <b-form-input
                :placeholder="packageName"
                v-model="packageName"
              >
              </b-form-input>
            </b-input-group>
            
            <p style="color:red" v-if="!packageNameIsValid">
              {{ packageNameMsg }}
            </p>

            <!-- Add Model Type -->
            <b-input-group prepend="Type of model" style="padding-top: 1em; ">
              <b-form-select v-model="modelTypeSelected" :options="modelTypeOptions"></b-form-select>
            </b-input-group>

            <b-input-group style="padding-top: 1em; ">
              <b-input-group-prepend is-text>
                  <b-form-checkbox switch v-model="isPartOfLargerModel" class="mr-n2">
                    <span class="sr-only">Switch for following text input</span>
                  </b-form-checkbox>
              </b-input-group-prepend>
              <b-form-input disabled placeholder=" Is part of a larger model ?" style="background:white" ></b-form-input>
            </b-input-group>

            <div v-if="isPartOfLargerModel">
              <b-row no-gutters style="margin-top:1em;margin-left:1em;">
                <b-col lg="9" >
                    <!-- Larger model packages -->
                    <b-input-group prepend="Larger model names" style="width:100%; text-align:left; overflow:scroll">
                      <b-form-tags class="form-control" style="background: white;"
                        v-model="largerModelPackageNames"
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
                  <b-input-group id="AddPackage" style="width:100%; text-align:left; overflow:scroll">
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
            </div>

            

            <!-- Linked Community -->
            <b-input-group id="LinkedCommunity" prepend="Link to an existing community" style="padding-top: 1em; ">
              <b-form-input  placeholder="Select in the list" list="communityNameList" v-model="linkedCommunity"></b-form-input>
              <datalist id="communityNameList">
                <option  
                  v-for="communityNameOption in communityNames"
                  v-bind:key="communityNameOption"
                  >
                  {{communityNameOption}}
                </option>
              </datalist> 
            </b-input-group>
            
            <!-- Tags -->
            <b-input-group style="padding-top: 1em; " prepend="Tags">
              <b-form-tags class="text-capitalize"
                v-model="tags"
                separator=","
                placeholder="Enter new tags separated by comma"
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>
            <!-- <p>
              {{tags}}
            </p> -->


            <h3 style="padding-top: 1em; text-align:left; ">  Contributors : </h3>

            <!-- Model Package Administrators-->
            <p>Administrators can edit informations, update the model, delete the model.<br>
            Editors can only edit informations</p>
            <b-input-group prepend="Administrators" style="padding-top: 1em; text-align:left;">
              <b-form-tags class="form-control"  style="background: white;"
                  v-model="administrators"
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
                v-model="editors"
                separator=","
                placeholder= "Enter e-mail separated by comma"
                invalid-tag-text="Please enter a valid email address"
                :tag-validator="emailValidator"
                duplicate-tag-text="duplicated e-mail"
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>

          </div>

          <div style="padding-top: 1em;" v-if="packageNameIsValid">
            <b-button variant="secondary"  v-on:click="submitZip()">Submit model</b-button>
          </div>


        </div>

        <div v-if="submitted && !treeDataReceived">
          <p> 
            <b>Extracting archive, populating database, ...</b> 
          </p>
           <p>
            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
            <b-spinner small label="Small Spinner" type="grow"></b-spinner>
          </p>
        </div>

        <div v-if="treeDataReceived">

          <b-input-group style="padding-top: 1em; " prepend="Added Tags">
              <b-form-tags
                v-model="tags"
                separator=" "
                placeholder=" "
                disabled
              ></b-form-tags>
          </b-input-group>
          
          

          <b-input-group style="padding-top: 1em; " prepend="Extracted keywords">
              <b-form-tags
                v-model="keywords"
                separator=" "
                placeholder= " "
                disabled
              ></b-form-tags>
          </b-input-group>
            
          <p style="text-align:left; padding-top:1em;">
            Extracted package structure:
            <b-tree-view v-on:nodeSelect="treeNodeSelect" :data="treeDataReceived"  :renameNodeOnDblClick=false :contextMenu=false :contextMenuItems=[] ></b-tree-view>
          </p>
          

        </div>

      </div>
      <div class="col-sm-2"/>
      
    </div>
  </div>

</template>
<script>

import ModelServices from "../services/ModelServices"
import FileServices from "../services/FileServices"
//import UserServices from "../services/UserServices"
import CommunityServices from "../services/CommunityServices"
import { bTreeView } from 'bootstrap-vue-treeview'

export default {
  name: 'Catalog',

   data() {
      return {
        reg: /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        packageZip: null,
        packageZipSent : false,
        packageName:'',
        PackageNameIsValid:false,
        PackageNameMsg:'',
        tags:[],
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
        communityNames:[],
        //registeredEmails : [],
        administrators:[],
        //selectedAdministrator: null,
        editors:[],
        //selectedEditor: null,
      }
    },

  computed:{

    uploadMsg: function(){
      let msg = ""
      if(!this.packageZip && !this.packageZipSent){
        msg= 'No selected file.zip '
      }
      if(!this.packageZip && this.packageZipSent){
        msg= 'Model package sent successfully'
      }
      if(this.packageZip){
        // return 'Selected package: '+this.packageZip.name
      }
      return msg;
    }
  },

  components: {
    bTreeView
  },

  async created() {

    // console.log("START created Catalog")

    // this.modelUnitSchema = ModelServices.buildSchema();

    // console.log("this.modelUnitSchema")
    // console.log(this.modelUnitSchema)

    // console.log("END created Catalog")
  },

  async mounted() {
    
    console.log("START mounted Catalog")

    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initModels');
    }

    //this.registeredEmails = await UserServices.getRegisteredEmails();

    this.registeredPackageNames = await ModelServices.getAllModelsPackageNames();

    let communityList = await CommunityServices.getAllCommunities()

    this.communityNames = communityList.map(c => c.name)

    console.log("END mounted Catalog")
  },

  methods: {
    treeNodeSelect(event){
      if(event.selected){
        console.log(event.data.name)
      }
    },

    async submitZip(){

      // let formData = new FormData();
      // formData.append('file', this.file);

      this.packageZip.packageName = this.packageName

      const modelMetaDataPart ={
        zipFileName: this.packageZip.name,
        packageName: this.packageName,
        modelType : this.modelTypeSelected,
        largerModelPackageNames: this.largerModelPackageNames,
        linkedCommunity: this.linkedCommunity,
        uploaderMail: this.$store.getters.getLoggedUserInfo.email,
        administratorsMails: this.administrators,
        editorsMails: this.editors,
        tags: this.tags,
      }

      this.submitted =true;
      const res =  await FileServices.sendZip(this.packageZip,modelMetaDataPart)
      this.treeDataReceived = [res.tree]
      this.keywords = res.extractedKeywords

      this.packageZip = null
      this.packageZipSent=true;
    },

    addLargerPackage(){
      this.largerModelPackageNames.push(this.selectedLargerPackage)
    },

    packageValidator(tag){
      return this.registeredPackageNames.includes(tag)
    },

    emailValidator(tag){
      return (tag == "")? "" : (this.reg.test(tag)) ? true : false;
    },
    
  },

  watch:{

    packageZip: function(){
      if(this.packageZip){
        this.packageName = this.packageZip.name.replace('.zip','')
        return this.packageZipSent=false;

      }
    },

    packageName: function(){
      
        if(this.packageName.indexOf(' ')!==-1 || !this.packageName ){
          this.packageNameIsValid =false
          this.packageNameMsg = 'model name cannot be empty or contain spaces'
        }else{
          this.packageNameIsValid = true
          this.packageNameMsg =''
        }
      
    }

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
