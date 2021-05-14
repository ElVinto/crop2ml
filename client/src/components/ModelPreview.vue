<template>

  <div id ="modelPreview" v-if="$store.getters.getDataAreLoaded"  >

    <b-card 
        :header="selectedModel.metaData.idValue"
        header-bg-variant="secondary"
        header-text-variant="white"
        class="text-left"
    > 

        
        <b-row no-gutters>
            <b-col lg="3" >
                <b-card-img src="images/modeling_iconfinder_128px" style="max-width:100px"   alt="Model Preview" ></b-card-img>
            </b-col>
            <b-col lg="9" class="text-left">
                <h4>  {{ selectedModel.Description.Title}}</h4>
                <p>
                    {{ ` ${selectedModel.Description.Abstract}`}} <br>
                    {{ `Institution: ${selectedModel.Description.Institution}`}}   <br>     
                    {{ `Authors: ${selectedModel.Description.Authors}`}}
                </p>
            </b-col>
        </b-row>

        
    </b-card>

  </div>
  
</template>
<script>



import ClientServerJsonModel from "../services/ClientServerJsonModel"


export default {
  name: 'ModelPreview',

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
