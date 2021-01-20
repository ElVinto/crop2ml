<template>

    <!-- Todo separate in 3 div and add a grid -->
  
  <!-- <div  class="header" style="background-image:url(images/crop-2229_1920_pixabay.jpg); background-size: 100% 150px;"></div> -->
  <div  class="header" style="background-image:url(images/crop-2229_1920_pixabay.jpg); "></div>
  
   
</template>


<script>
export default {
    name: 'Header',

    components: {   
    },

    mounted() {
      console.log('this.$router')
      console.log(this.$router.currentRoute.path)
      
  },

  }

</script>

<style scoped>

.header {
  
  width: 100%;
  height: 4em;
  
  
  text-align: center;
  color: whitesmoke;
  

}



  
</style>