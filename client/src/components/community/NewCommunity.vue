<template>
  <div id ="NewCommunity" 
    style="display:block; overflow: scroll; height:80vh; width:100%; margin:20px;" 
  >
    
      <center>
        <h3>{{` Create a new community`}}</h3>
        <b-card
          
          style="max-width: 40rem; margin-top:3em;"
          class="mb-2"
        >
          <b-card-img 
            id = "displayedImg"
            src="images/community_iconfinder_128px.png" 
            style="max-width: 150px" 
            alt="Community"
            top>
          </b-card-img>

          <div v-if="$store.getters.getLoggedUserInfo !==null">

            <h3>{{name}}</h3>

            <b-input-group prepend="Name">
              <b-form-input
                v-model="name"
                type="text"
              >
              </b-form-input>
            </b-input-group>


            <b-input-group prepend="Description" style="margin-top:1em">
              <b-form-textarea
                
                v-model="description"
                type="text"
              >
              </b-form-textarea>
            </b-input-group>

            <br>

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

            <b-input-group style="padding-top: 1em; " prepend="Uploader email">
                <b-form-input
                  v-model="$store.getters.getLoggedUserInfo.email"
                  disabled
                >
                </b-form-input>
            </b-input-group>

            <b-button variant="secondary" @click="submitCommunity()" style="margin-top:1em">
              Submit
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
const path = require('path');

export default {
  data() {
    return {
      name: null,
      description: "",
      inputImgFile: null,
      submitted:false,
    };
  },

  mounted() {
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

      const communityInfo ={
        name: this.name,
        description: this.description,
        picture: imageName,
        createdBy: this.$store.getters.getLoggedUserInfo.email,
        administrators: [this.$store.getters.getLoggedUserInfo.email],
        modelPackages:[]
      }

      const communityCreated =  await CommunityServices.createCommunity(image,communityInfo)
      console.log(communityCreated)

      this.submitted =true;
      this.$router.push("/Communities")
    },


    GetFileBlobUsingURL (url) {
      return new Promise( (resolve,reject)=>{
        try{
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url);
          xhr.responseType = "blob";
          xhr.addEventListener('load', function() {
              resolve(xhr.response);
          });
          xhr.send();

        }catch(err){
          reject(err)
        }
        }
      )
    },

    blobToFile (blob, name) {
            blob.lastModifiedDate = new Date();
            blob.name = name;
            return blob;
    },

    GetFileObjectFromURL (filePathOrUrl, convertBlob) {
          this.GetFileBlobUsingURL(filePathOrUrl, function (blob) {
              convertBlob(this.blobToFile(blob, filePathOrUrl));
          });
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
