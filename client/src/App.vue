<template>
  <div id="app" >

    <header id="header">
      <div id="navbar"  >
        <Navbar />
      </div>

      <div id="band" >
        <Header /> 
      </div>
    </header>
    
    <main id="main">
      <router-view />
    </main>

    
    <footer > 
      <Footer />
    </footer>
    


  </div>
</template>

<script>



import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";


export default {
  name: 'App',
  components: {    
    Navbar,
    Header,
    Footer,
    
  }
}
</script>

<style scoped>
 #app { 
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
 }

 #main{
   width: 100%;
   /* position: fixed; */
   padding-bottom:  4.1em;
   
 }
 

 



</style>
