<template>
  <div id ="ViewCommunityDetails" 
    style="display:block; overflow: scroll; height:80vh; width:100%; margin:20px;" 
  > 
      <center>
        
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

          <div>

            <h3>{{community.name}}</h3>

            <!-- 
              <b-input-group prepend="Name">
                <b-form-input
                  v-model="community.name"
                  type="text"
                  disabled
                >
                </b-form-input>
              </b-input-group> 
            -->

            <!-- Community Name -->
            <b-input-group prepend ="Name" style="width:100%; text-align:left; overflow:scroll;" >
              <span class="form-control">
                {{community.name}}
              </span>
            </b-input-group> 


            <!-- Community description -->
            <b-input-group prepend="Description" style="margin-top:1em; width:100%; text-align:left; overflow:scroll">

              <textarea disabled class="form-control" v-model="community.description" style="background: white;">
                 
               </textarea>
            </b-input-group>



            <!-- Community creator -->
            <b-input-group prepend="Created by" style="margin-top:1em; width:100%; text-align:left; overflow:scroll">
              <span class="form-control">
                {{community.createdBy}}
              </span>
            </b-input-group>

            <!-- Community Administrator -->
            <b-input-group prepend="Administrators" style="margin-top:1em; width:100%; text-align:left; overflow:scroll">
            <b-form-tags class="form-control" style="background: white;"
                disabled
                v-model="community.administrators"
                separator=" ,;"
                placeholder=""
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>

            <!-- Community model packages -->
            <b-input-group prepend="Model packages" style="margin-top:1em; width:100%; text-align:left; overflow:scroll">
            <b-form-tags class="form-control" style="background: white;"
                disabled
                v-model="community.packageNames"
                separator=" ,;"
                placeholder=""   
                no-add-on-enter
              ></b-form-tags>
            </b-input-group>



            <br>


            

            



          </div>

        </b-card>
      </center>
  
</div>

</template>
<script>


export default {

  // TODO show list of models associated to the community

  props:{
    community: Object
  },

  data() {
    return {

      name: null,
      description: "",

      inputImgFile: null,


    };
  },

  mounted() {

    console.log("START mount  ViewCommunityDetails")
    console.log(this.community)


    var reader  = new FileReader();
    reader.onload = function(e)  {
      var image = document.getElementById("displayedImg");
      image.src = e.target.result;
    }
    reader.readAsDataURL(this.community.file);

    console.log("END ViewCommunityDetails")
  
  },

  methods: {


    previewInputImgFile() {

      console.log("START previewInputImgFile")

      var file = document.getElementById('inputImgFileForm').files[0];
      var reader  = new FileReader();
      reader.onload = function(e)  {
          var image = document.getElementById("displayedImg");
          image.src = e.target.result;
        }
      reader.readAsDataURL(file);

      console.log("END previewInputImgFile")
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
