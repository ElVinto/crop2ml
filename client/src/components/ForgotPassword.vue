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

        <h3>Forgotten password</h3>

        <b-input-group prepend="Email">
          <b-form-input
            :placeholder="email"
            v-model="email"
            type="email"
          >
          </b-form-input>
        </b-input-group>


        <b-button variant="secondary" @click="forgotPassword()" style="margin-top:1em">
          Submit
        </b-button>

        <div v-if="forgotPasswordMsg">
          <p>
            {{forgotPasswordMsg}}
          </p>
        </div>

        

        
      

    </b-card>
  </center>
</div>

</template>
<script>

import AuthServices from "../services/AuthServices";
export default {
  data() {
    return {
      email: "",
      
      forgotPasswordMsg:"",


    };
  },

  mounted() {
    // this.email = this.$store.getters.getLoggedUserEMail;
  },

  methods: {
    
    async forgotPassword() {
      console.log('START forgotPassword')
      try {
        
        this.forgotPasswordMsg = await AuthServices.forgotPassword(this.email)
        
      } catch (error) { 
        this.error = error.message;
      }finally{
        console.log('END forgotPassword')
      }
    },

  },

  watch:{
    email(){
      this.forgotPasswordMsg=""
    },
    
    
  }

};
</script>

<style scoped>
.fake{
  text-align: left;
}

</style>
