<template>
<div>
  <center>
    <b-card
      
      style="max-width: 20rem; margin-top:3em;"
      class="mb-2"
    >
      <b-card-img 
        src="images/user_icon.png" 
        style="max-width: 100px" 
        alt="User"
        top>
      </b-card-img>

      <div v-if="$store.getters.getLoggedUserInfo!==null">

        <b-input-group prepend="Email">
          <b-form-input
            :placeholder="email"
            v-model="email"
            type="email"
            disabled
          >
          </b-form-input>
        </b-input-group>


        <b-button variant="secondary" @click="signOut()" style="margin-top:1em">
          Sign out
        </b-button>
      </div>
      <div v-else>
        <h2> You are signed out</h2>
      </div>


    </b-card>
  </center>
</div>

</template>
<script>


export default {
  data() {
    return {
      email: "",

      
    };
  },

  mounted() {

    console.log("START mounted Sign out")

    console.log(this.$store.getters.getLoggedUserInfo)

    if (this.$store.getters.getLoggedUserInfo !== null) {
      this.email = this.$store.getters.getLoggedUserInfo.email
      console.log(" conected email")
    }

    console.log("END mounted Sign out")
  },

  methods: {
    
    async signOut() {
      console.log('START signOut')

      this.$store.commit('setLoggedUserInfo',null)

      // this.$router.push("/");

      console.log('END signOut')
    },

  },

  watch:{
    
  }

};
</script>

<style scoped>
.fake{
  text-align: left;
}

</style>
