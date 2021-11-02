<template>
<div>
  <center>
    <b-card
      style="max-width: 20rem; margin-top: 1em;"
      class="mb-2"
    >
      <b-card-img 
        src="images/user_icon.png" 
        style="max-width: 100px" 
        alt="User"
        top>
      </b-card-img>

      <h3>Reset password</h3>


      <b-input-group prepend="Password" style="margin-top:1em">
        <b-form-input
          :placeholder="password1"
          v-model="password1"
          type="password"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Retype password" style="margin-top:1em">
        <b-form-input
          :placeholder="password2"
          v-model="password2"
          type="password"
        >
        </b-form-input>
      </b-input-group>

      <div v-if="passwordErrorMsg">
        <p style="color:red;">
          {{passwordErrorMsg}}
        </p>
      </div>

      <b-button variant="secondary" @click="resetPassword()" style="margin-top:1em">
        Submit
      </b-button>
  
      <div v-if="resetPasswordMsg">
          {{resetPasswordMsg}}
      </div>


    </b-card>
  </center>
</div>

</template>
<script>

import AuthServices from "../../services/AuthServices";
export default {
  data() {
    return {

      // firstName:"",
      // lastName:"",
      // pseudo:"",

      authCode : null,
      email: "",
      emailErrorMsg:"",
      
      password1: "",
      password2: "",
      passwordErrorMsg:"",


      resetPasswordMsg:"",
      
    };
  },

  mounted() {

    console.log("START mounted ResetPassword")

    console.log(this.$route.query.authCode)

    this.authCode = this.$route.query.authCode
    

    console.log("END mounted ResetPassword")
    
  },

  methods: {
    
    async resetPassword() {
      console.log('START resetPassword')
      try {
        
        if(!this.validPasswords()){
          this.passwordErrorMsg = "required passwords should be equal"
          console.log('!this.validPasswords()')
        }

        if(this.passwordErrorMsg || this.emailErrorMsg){
          console.log('this.emailErrorMsg: '+this.emailErrorMsg)
          console.log('this.passwordErrorMsg: '+this.passwordErrorMsg)

          return
        }

        let resetPasswordDetails = {
          authCode: this.authCode,
          password: this.password2,
        }

        const userInfo =await AuthServices.resetPassword(resetPasswordDetails)
        console.log(userInfo)

        if(typeof userInfo.errorMsg !== 'undefined' ){
          
          this.$store.commit('setLoggedUserInfo', userInfo)
          this.resetPasswordMsg= "Reset Password successful"
          console.log('this.$store.state.loggedUserInfo')
          console.log(this.$store.state.loggedUserInfo)
        }else{
          this.resetPasswordMsg = userInfo.errorMsg;
        }
        
        
      } catch (error) {
        console.log(error)
        this.resetPasswordMsg = error.message;
        throw(error)
      }finally{
        console.log('END resetPassword')
      }
    },

    validPasswords(){
      return this.password1.length>0 && this.password1 === this.password2;
    },

    validEmail(){
      return this.email.length>0;
    },


  },

  watch: {
    email(){
      this.emailErrorMsg=""
      this.registerErrorMsg=""
      this.resetPasswordMsg=""
    },

    password1(){
      this.passwordErrorMsg=""
      this.resetPasswordMsg=""
    },
    password2(){
      this.passwordErrorMsg=""
      this.resetPasswordMsg=""
    },
    
  }

};
</script>

<style scoped>
.fake{
  text-align: left;
}

</style>
