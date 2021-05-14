<template>

  <div id ="Communities" v-if="$store.getters.getDataAreLoaded" style="display:block; overflow: scroll; height:80vh; width:100%; margin-top:20px;" >

    <div v-if="!$store.getters.getLoggedUserInfo">
        Please <a href="#/SignIn">sign-in</a>  or <a href="#/register"> register </a> before uploading a model
    </div>

    <b-card-group deck>

    </b-card-group>

  </div>
  
</template>
<script>



import ClientServerJsonModel from "../services/ClientServerJsonModel"


export default {
  name: 'Communities',

  components: {

  },

  props:{
      selectedModel: Object
  },

  data() {
    return {

      
    }
  },

  async created() {

  },

  async mounted() {
    
    console.log("START mounted Catalog")

    if (!this.$store.getters.getDataAreLoaded) {
      await this.$store.dispatch('initModels');
    }

    this.modelTree = [await ClientServerJsonModel.requestModelTree()]
    
    
    console.log('this.modelTree: ')
    console.log(this.modelTree)

    console.log("END mounted Catalog")

  },

  computed:{

  },


  methods: {

  },

  watch:{
  },

}
</script>

<style scoped>





</style>
