<template>
  
  <div id="welcome" class="global" style="background-image:url(images/crop-2229_1920_pixabay.jpg);  "> 

      <div id="title" >
        <router-link to="/Catalog" class="text-white"> <h1>Catalog of crop models</h1></router-link>
      </div>

      <div id="btnScenario" style="width: auto; opacity:80%;">
        <b-button to="/Catalog" variant="dark" style="width: auto;">
          <!-- <img src="images/scenario.png"/> -->
          <!-- <br> -->
          <h3>login</h3>
        </b-button>  
        <br>   
      </div>

      <div id="btnGuide">
        <b-button id="btnGuide" variant="dark" v-b-toggle.sidebar-footer style="opacity:80%">
            <!-- <img src="images/guid.png"/> -->
            User guide
        </b-button>
      </div>

      <div id="objective" class="card bg-dark text-white" style="opacity:90%">
      
        <div class="card-body" >
          <p>
          <center><b >
            Crop2ML : a meta language for describing crop model (TODO)
          </b></center>
          </p>
          <p>
            Objective
          </p>

          <p > 
            TODO
          </p>

          <!-- <p>
            
          </p> -->

          <p>Contacts : Cyrille MIDINGOYI (cyrille.midingoyi@inrae.fr),
            Pierre MARTRE (pierre.martre@inrae.fr),
            Christophe PRADAL (sebastien.codis@cirad.fr)
          </p>

          <p>Développeur : Vincent ARMANT, INRAE</p>
        </div>

      </div>

      <b-sidebar id="sidebar-footer" aria-label="Sidebar with custom footer" no-header shadow>
    
    <template v-slot:footer="{ hide }">
      <b-button size="sm" @click="hide">Fermer</b-button>
    </template>

    <div class="px-3 py-2" >
      
      <h5>Welcome</h5><br>

      <p>
        Les données présentées sont issues de l’exploitation Mas Piquet (commune de Grabels), domaine du lycée viticole de Montpellier.
      </p>
      
    </div>

  </b-sidebar>
  
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

#welcome{
  height: 90vh;
  width: 100%;
}

.card-body {  
  overflow-y: scroll; 
  width: 100%; 
  text-align: justify; 
  margin-top: 0px;
  font-size: medium;
  }


@media screen and (min-width: 900px) {
.global {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
   grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);}
 
#title {color:rgb(105, 103, 101);
  grid-column: 1/6;
  grid-row: 1;
}

#btnScenario { 
  width: auto;
  grid-column: 3 ;
  grid-row: 2;
}

#objective {
  grid-column: 2/5;
  grid-row: 4/6;
}

#btnGuide {
  grid-column: 3;
  grid-row: 3;
}
}





</style>
