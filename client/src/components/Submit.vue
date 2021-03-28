<template>

  <div v-if="$store.getters.getDataAreLoaded" style="display:block; overflow: scroll; height:80vh; width:100%; margin-top:20px;" >

    <div v-if="!$store.getters.getLoggedUserInfo">
        Please <a href="#/SignIn">sign-in</a>  or <a href="#/register"> register </a> before uploading a model
    </div>

    <div v-else  id="packageZip" class="row" >
      <div class="col-sm-2"></div>
      <div class="col-sm-8">

        <b> Submit or update a model repository </b>

        <b-input-group  class="mt-3" >
          <b-form-file
            v-model="packageZip"
            :state="Boolean(packageZip)"
            placeholder="Choose a file.zip or drop it here..."
            drop-placeholder="Drop file.zip here..."
            accept=".zip"
          ></b-form-file>
          <!-- <div class="input-group-append">
            <b-button variant="secondary"  v-on:click="submitZip()">Send</b-button>
          </div> -->

        </b-input-group>


        <div class="mt-3">
          {{ uploadMsg  }}
        </div>

        <div class="mt-3" v-if="packageZip"> 
          
          <div >

            <b-input-group prepend="Name">
              <b-form-input
                :placeholder="packageName"
                v-model="packageName"
              >
              </b-form-input>
            </b-input-group>
            
            <p style="color:red" v-if="!packageNameIsValid">
              {{ packageNameMsg }}
            </p>
            
            <b-input-group style="padding-top: 1em; " prepend="Tags">
              <b-form-tags class="text-capitalize"
                v-model="tags"
                separator=" ,;"
                placeholder="Enter new tags separated by space, comma, semi-colon"
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>
            <!-- <p>
              {{tags}}
            </p> -->
            

            <b-input-group style="padding-top: 1em; " prepend="Uploader email">
                <b-form-input
                  v-model="$store.getters.getLoggedUserInfo.email"
                  disabled
                >
                </b-form-input>
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

// import ModelUnitServices from "../services/ModelUnitServices"
import ClientServerFileSystem from "../services/ClientServerFileSystem"

import { bTreeView } from 'bootstrap-vue-treeview'




export default {
  name: 'Catalog',

   data() {
      return {

        packageZip: null,
        packageZipSent : false,
        
        packageName:'',
        PackageNameIsValid:false,
        PackageNameMsg:'',

        tags:[],

        keywords:[],

        submitted: false,

        treeDataReceived :null,
        
      }
    },

  computed:{

    uploadMsg: function(){
      let msg = ""
      if(!this.packageZip && !this.packageZipSent){
        msg= 'No selected file.zip '
      }
      if(!this.packageZip && this.packageZipSent){
        msg= 'Model sent successfully'
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

    // this.modelUnitSchema = ModelUnitServices.buildSchema();

    // console.log("this.modelUnitSchema")
    // console.log(this.modelUnitSchema)

    // console.log("END created Catalog")
  },

  async mounted() {
    
    console.log("START mounted Catalog")

    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initModels');
    }

    console.log("END mounted Catalog")
  },

  

  methods: {

    treeNodeSelect(event){
      console.log("event.data.name")
      
      console.log("selected "+event.selected)

      if(event.selected){
        console.log(event.data.name)

      }

    },

    // TODO remove not used
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

      
      console.log("this.tags")
      console.log(this.tags)


      this.packageZip.packageName = this.packageName
      
      
      console.log("this.packageZip to send: ")
      console.log(this.packageZip)

      const modelMetaDataPart ={
        tags: this.tags,
        zipFileName: this.packageZip.name,
        packageName: this.packageName,
        uploaderMail: this.$store.getters.getLoggedUserInfo.email
      }


      this.submitted =true;
      const res =  await ClientServerFileSystem.sendZip(this.packageZip,modelMetaDataPart)
      this.treeDataReceived = [res.tree]
      this.keywords = res.extractedKeywords

      console.log("received treeData from server: ")
      console.log(this.treeDataReceived[0])
      

      this.packageZip = null

      this.packageZipSent=true;

      console.log("END submitZip")
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
