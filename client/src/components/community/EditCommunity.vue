<template>
  <div id ="EditCommunity"
    style="display:block; overflow: scroll; height:80vh; width:100%; margin:20px;" 
  >
    
      <center>
        <h3>{{` Edit community details`}}</h3>
        <b-card
          
          style="max-width: 40rem; margin-top:3em;"
          class="mb-2"
        >
          <b-card-img 
            id = "displayedImg"
            :src="getPicturePath(community.picture)" 
            style="max-width: 150px" 
            alt="Community"
            top>
          </b-card-img>

          <div v-if="$store.getters.getLoggedUserInfo !==null">

            <h3>{{community.name}}</h3>

            <b-form-file 
              id="inputImgFileForm"
              v-model="inputImgFile"
              :state="Boolean(inputImgFile)"
              placeholder="Select or drop img (.jpg, .png, .gif) here"
              drop-placeholder="Drop an image (.jpg, .png, .gif) here ..."
              accept=".jpg, .png, .gif"
              @change="previewInputImgFile()"
              >

            </b-form-file>

            <br>

            <b-input-group prepend="Name" style="margin-top:1em">
              <b-form-input
                v-model="community.name"
                type="text"
              >
              </b-form-input>
            </b-input-group>

          
            <b-input-group prepend="Description" style="margin-top:1em">
              <b-form-textarea
                
                v-model="community.description"
                type="text"
              >
              </b-form-textarea>
            </b-input-group>

            
            <b-input-group prepend="Created by" style="margin-top:1em">
              <b-form-input
                
                v-model="community.createdBy"
                type="text"
              >
              </b-form-input>
            </b-input-group>



            <!-- Community Administrator -->
            <b-input-group prepend="Administrators" style="margin-top:1em; width:100%; text-align:left; overflow:scroll">
            <b-form-tags class="form-control"  style="background: white;"
                v-model="community.administrators"
                separator=","
                placeholder= "Enter e-mail separated by comma"
                invalid-tag-text="not registered e-mail"
                duplicate-tag-text="duplicated e-mail"
                :tag-validator="emailValidator"

                no-add-on-enter
              ></b-form-tags>
            </b-input-group>

            <!-- Community model packages -->
            <b-input-group prepend="Model packages" style="margin-top:1em; width:100%; text-align:left; overflow:scroll">
              <b-form-tags class="form-control" style="background: white;"
                v-model="community.modelPackages"
                separator=","
                placeholder="Enter model packages separated by comma"
                invalid-tag-text="unknown package name"
                duplicate-tag-text="duplicated package name"
                :tag-validator="packageValidator"   
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>

            <b-button variant="secondary" @click="submitCommunity()" style="margin-top:1em">
              Update
            </b-button>
          </div>
          <div v-else>
              Please <a href="#/SignIn">sign-in</a>  or <a href="#/register"> register </a> before creating a community
          </div>

        </b-card>
      </center>
  
</div>

</template>
<script>


import CommunityServices from "../../services/CommunityServices"
import UserServices from "../../services/UserServices"
import config from "../../config"
const path = require('path');

export default {

  props:{
    community: Object
  },

  data() {
    return {
      inputImgFile: null,
      registeredEmails : [],
      packageNames : []
    };
  },

  async mounted() {
    this.inputImgFile = this.community.file
    delete this.community.file
    delete this.community._id

    let image_path_elmts = this.community.image_path.split('/')

    this.inputImgFile['name'] = image_path_elmts[image_path_elmts.length -1] ;

    var reader  = new FileReader();
    reader.onload = function(e)  {
      var image = document.getElementById("displayedImg");
      image.src = e.target.result;
    }
    reader.readAsDataURL(this.inputImgFile);

    this.registeredEmails = await UserServices.getRegisteredEmails();
    //this.packageNames = await ModelServices.getAllModelsPackageNames();
    this.packageNames = this.$store.getters.getModelIds
  },

  methods: {

    previewInputImgFile() {
      var file = document.getElementById('inputImgFileForm').files[0];
      var reader  = new FileReader();
      reader.onload = function(e)  {
          var image = document.getElementById("displayedImg");
          image.src = e.target.result;
        }
      reader.readAsDataURL(file);
     },
    
    async submitCommunity(){
      let image = this.inputImgFile;
      let imageName;
      if (image != null){
        var extension = "." + image.name.split('.').pop();
        var name = path.basename(image.name, extension)
        imageName = name + Date.now() + extension
      } else {
        imageName = "community_iconfinder_128px.png"
      }
      this.community.picture = imageName
      const communityCreated =  await CommunityServices.createCommunity(this.inputImgFile,this.community)
      console.log(communityCreated)
      
      this.$router.push("/Communities")
    },

    emailValidator(email){
      return this.registeredEmails.includes(email)
    },

    packageValidator(name){
      return this.packageNames.includes(name)
    },

    getPicturePath(picture){
      return `http://${config.server.host}:${config.server.port}/community_images/` + picture
    },
  },

  watch:{
  }

};
</script>

<style scoped>
.fake{
  text-align: left;
}

</style>
