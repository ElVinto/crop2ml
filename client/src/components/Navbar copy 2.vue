<template>
  <div class="topnav">
    <!-- <div class="row">
      
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

    </div> -->


  <!-- <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid"> -->
    <!-- <a class="navbar-brand" href="#">Navbar</a> -->
    <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button> -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link active" aria-current="page">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
              <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg>
          </router-link>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">AMEI</a>
        </li>
          <b-nav-item-dropdown text="Lang">
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  <!-- </div>
</nav> -->


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
