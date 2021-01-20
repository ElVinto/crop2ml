<template>

  <div v-if="$store.getters.getDataAreLoaded" style="display:block; overflow: scroll; height:80vh; width:100%; margin-top:20px;" >

    <div id="packageZip" class="row" >
      <div class="col-sm-2"></div>
      <div class="col-sm-8">

        <b> Submit a new model.zip :</b>

        <b-input-group id="packageZipInputGroup" class="mt-3" >
          <b-form-file
            v-model="packageZip"
            :state="Boolean(packageZip)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
            accept=".zip"
          ></b-form-file>
          <div class="input-group-append">
            <b-button variant="secondary"  v-on:click="submitZip()">Send</b-button>
          </div>
        </b-input-group>
        <div class="mt-3">{{ uploadMsg  }}</div>

        <div v-if="treeDataReceived">
          <b-tree-view v-on:nodeSelect="nodeSelect" :data="treeDataReceived"  :renameNodeOnDblClick=false :contextMenu=false :contextMenuItems=[] ></b-tree-view>
        </div>
        
        
      </div>
      <div class="col-sm-2"/>
      
    </div>
  




  </div>

</template>
<script>

// import ModelUnitServices from "../services/ModelUnitServices"
import FileSystemServices from "../services/FileSystemServices"

import { bTreeView } from 'bootstrap-vue-treeview'




export default {
  name: 'Catalog',

   data() {
      return {

        packageZip: null,
        packageZipSent : false,

        treeDataReceived :null,

        renameNodeOnDblClick:false,

        errorMsg : '',

        file1:{}

        
      }
    },

  computed:{

    packageZipName: function(){
      return this.packageZip? this.packageZip.name : 'No selected model.zip'
    },

    uploadMsg: function(){
      let msg = ""
      if(!this.packageZip && !this.packageZipSent){
        msg= 'No selected package '
      }
      if(!this.packageZip && this.packageZipSent){
        msg= 'Package sent successfully'
      }

      if(this.packageZip){
        return 'Selected package: '+this.packageZip.name
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
      await this.$store.dispatch('initModelUnits');
    }

    console.log("END mounted Catalog")
  },

  

  methods: {

    nodeSelect(event){
      console.log("event.data.name")
      
      console.log("selected "+event.selected)

      if(event.selected){
        console.log(event.data.name)

      }

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

      console.log("this.packageZip to send: ")
      console.log(this.packageZip)
      

      this.treeDataReceived = [await FileSystemServices.sendZip(this.packageZip)]

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
        return this.packageZipSent=false;
      }
    }

  }

}
</script>

<style scoped>

#packageZipInputGroup{
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
