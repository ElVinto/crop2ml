<template>
  
  <div id="welcome"> 

      <div id="objective" >
      
        <div  >
          <p>
          <center><b >
            A repository of biophysical processes involved in crop growth and development 
          </b></center>
          </p>
          <p>
            A short paragraph of Crop2ML project
          </p>

          <div class="row">
            <div class="col-sm-6">
              <h2> Recent Models </h2>

              <ul class="myListStyle">
                <a href="#/catalog">
                  <li>APSIM Phenology model component </li>
                </a>
              </ul>

              
            </div>

            <div class="col-sm-6">
              
              <h2> 
                News 
              </h2>
              <ul class="myListStyle">
                <li> 
                  <a href="#">
                    Crop2ML Hackathon 2021 
                  </a>
                </li>
              </ul>
            </div>

          </div>


          <div>

          </div>

          <b-button variant="outline-success"> more models</b-button>
          

          

          <p>Contacts : Cyrille MIDINGOYI (cyrille.midingoyi@inrae.fr),
            Pierre MARTRE (pierre.martre@inrae.fr),
            Christophe PRADAL (cristophe.pradal@cirad.fr)
          </p>

          <p>Développeur : Vincent ARMANT, INRAE</p>
        </div>

      </div>

    
  </div>
  
   
</template>
<script>



export default {
  name: 'Welcome',

   data() {
      return {
        
      }
    },

  components: {
    

  },

  async created() {
    
  },

  async mounted() {
    
  }

}
</script>

<style scoped>

ul.myListStyle{
  list-style-type: none;
}

#welcome{
  height: 80vh; 
  width: 100%;
}

#recentModels{
  text-align: left;
}


</style>
