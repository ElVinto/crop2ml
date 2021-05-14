<template>

  <div id ="Communities" v-if="$store.getters.getDataAreLoaded" style="display:block; overflow: scroll; height:80vh; width:100%; margin-top:20px;" >

    <div v-if="!$store.getters.getLoggedUserInfo">
        Please <a href="#/SignIn">sign-in</a>  or <a href="#/register"> register </a> before uploading a model
    </div>
    <div v-else>
      <h2> Communities created by Crop2ML users</h2>
      <b-card-group deck>
        

      </b-card-group>
    </div>

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
      comunities : [
        {
          name:"Community 1",
          description:" Community 1 regroups users interested in different aspects and topics covered by the community :-)",
          created: "Today",
          nbMembers: "",
        },
        {
          name:"Community 2",
          description:" Community 2 regroups users interested in different aspects and topics covered by the Community :-)",
          created: "Today",
          nbMembers: "",
        },
        {
          name:"Community 3",
          description:" Community 3 regroups users interested in different aspects and topics covered by the community :-)",
          created: "Today",
          nbMembers: "",
        },
        {
          name:"Community 4",
          description:" Community 4 regroups users interested in different aspects and topics covered by the Community :-)",
          created: "Today",
          nbMembers: "",
        },
        {
          name:"Community 5",
          description:" Community 5 regroups users interested in different aspects and topics covered by the community :-)",
          created: "Today",
          nbMembers: "",
        },
        ]
      
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
