<template>

  <!-- <div id ="Communities" v-if="$store.getters.getDataAreLoaded" style="display:block; overflow: scroll; height:80vh; width:100%; margin:20px;" >

    <div v-if="!$store.getters.getLoggedUserInfo">
        Please <a href="#/SignIn">sign-in</a>  or <a href="#/register"> register </a> before uploading a model
    </div> -->
    <div id ="Communities"> 
      <h2> Communities created by Crop2ML users</h2>

      <div style="float:center; " >
        <b-button variant="outline-success" href='#/NewCommunity'>
          New community
        </b-button>
      </div>

      
      <br>


      <b-card-group columns>

        <b-card v-for=" c of communityList"
          v-bind:key="c._id"
          
        >      
        <h4>  {{ c.name}}</h4>
          <hr>
          <b-row no-gutters>
              <b-col lg="3" >
                  <b-card-img :src="getPicturePath(c.picture)" style="max-heigth:100px; max-width:100px"   alt="Community Preview" ></b-card-img>
              </b-col>
              <b-col lg="9" class="text-left" style="font-size:0.75em;">
                  
                  <p>
                      {{ ` ${c.description}`}} <br>
                  </p>  
                  <p>
                      {{ `createdBy: ${c.createdBy}`}}   <br>     
                      {{ `administrators: ${c.administrators}`}} <br>
                      {{ `modelPackages: ${c.modelPackages}`}}
                  </p>

                  
                  <div v-if="userCanEdit(c)" style="text-align:right">
                    <router-link :to="{ name: 'EditCommunity', params: {community:c} }">edit</router-link>
                  </div>
                  <div v-else style="text-align:right">
                    <router-link :to="{ name: 'ViewCommunityDetails', params:{community:c} }">view</router-link>
                  </div>

              </b-col>
          </b-row>

        </b-card>
        

      </b-card-group> 

      <div v-if="communityList.length==0 && !communityListLoaded">
        <b-spinner variant="success" label="Spinning"></b-spinner>
      </div>


      <div v-if="communityList.length==0 && communityListLoaded">
        <h4>
           No community has been created yet
        </h4>
      </div>

    </div>



  <!-- </div>  -->
  
</template>
<script>


import CommunityServices from "../../services/CommunityServices"


export default {
  name: 'Communities',

  components: {
  },

  props:{
      selectedModel: Object
  },

  data() {
    return {
      communityList: [],
      communityListLoaded: false,
    }
  },

  async created() {
  },

  async mounted() {
    this.communityList = await CommunityServices.getAllCommunities()
    this.communityListLoaded =true;

    /*try{
      await Promise.all(this.communityList.map( async c =>{
        
        let serverFilePath = c.image_path
        let file = await FileServices.downloadFile(serverFilePath)
        c['file']=file
        let idxLastSep = serverFilePath.lastIndexOf('/')
        let fileName = serverFilePath.slice(idxLastSep+1)

        var reader = new FileReader();
        reader.onload = function(e)  {
          var image = document.querySelector(`#img-${c._id}`);
          image.src = e.target.result;
          image.title = fileName;
        }
        reader.readAsDataURL(file);      
      }))
    } catch (err) { 
      console.error(err);
    }*/
  },

  computed:{
  },


  methods: {

    getPicturePath(picture){
      return 'http://localhost:5000/community_images/' + picture
    },

    userCanEdit(c){
      if(this.$store.getters.getLoggedUserInfo){
        return c.administrators.includes(this.$store.getters.getLoggedUserEMail)
      }
      return false
    },

  },

  watch:{ 
  },

}
</script>

<style scoped>





</style>
