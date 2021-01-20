<template>
  
  <b-navbar class="topnav" toggleable="lg" type="dark" variant="dark" >
    <b-navbar-brand href="#">Crop2ML</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/" class="nav-link active" aria-current="page">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
              <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg>
        </router-link>
        
        <b-nav-item-dropdown text="AMEI" >
          <b-dropdown-item href="#">Platforms</b-dropdown-item>
          <b-dropdown-item href="#">Meetings</b-dropdown-item>
          <b-dropdown-item href="#">Join</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Models" >
          <b-dropdown-item href="#/Repository">Repository</b-dropdown-item>
          <b-dropdown-item href="#/Submit">Submit</b-dropdown-item>
          <b-dropdown-item href="#">Create</b-dropdown-item>
          <b-dropdown-item href="#">Communities</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Tools" >
          <b-dropdown-item href="#">PyCropML</b-dropdown-item>
          <b-dropdown-item href="#">CropMStudio</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="About" >
          <b-dropdown-item href="#">Citation</b-dropdown-item>
          <b-dropdown-item href="#">Contact us</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Help" >
          <b-dropdown-item href="#">User Manual</b-dropdown-item>
          <b-dropdown-item href="#">Courses</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

      

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>


  
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

  .topnav {
    /* overflow: hidden; */
    /* background-color: #333;  */
    width: 100%;
     height:5vh; 
    /* position:fixed;  */
    }
  /* .topnav a {float: left;display: block;color: #f2f2f2;text-align: center; text-decoration: none;}
  
  .topnav a:hover {background-color:rgb(165, 161, 161);color: black;} */

</style>
