<template>
  <div class="topnav">
    <div class="row">
      
      <router-link to="/" class=" col-sm-3 nav-link" style= "outline-style:solid; outline-color:white; outline-width:1px" >
        <b> Welcome </b>
      </router-link>
      
      <router-link to="/Catalog" class=" col-sm-3 nav-link" style= "outline-style:solid; outline-width:1px" > 
        <b> Search </b> 
      </router-link>

      <router-link to="/Import" class=" col-sm-3 nav-link" style= "outline-style:solid; outline-width:1px" > 
        <b> Import </b>
      </router-link>

      <router-link to="/Import" class=" col-sm-3 nav-link" style= "outline-style:solid; outline-width:1px" > 
        <b> Export </b> 
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  
  async created () {},
  methods: {},
};
</script>

<style scoped>

  .topnav {overflow: hidden;background-color: #333; width: 100%;}
  .topnav a {float: left;display: block;color: #f2f2f2;text-align: center; text-decoration: none;}
  
  .topnav a:hover {background-color:rgb(165, 161, 161);color: black;}

</style>
