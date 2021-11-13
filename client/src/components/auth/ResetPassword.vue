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

      <div v-if="resetPasswordMsg">
          {{resetPasswordMsg}}
      </div>

      <b-button v-if="!resetDone" variant="secondary" @click="resetPassword()" style="margin-top:1em">
        Submit
      </b-button>
      <b-button v-else variant="secondary" @click="$router.push('/SignIn')" style="margin-top:1em">
        Sign in
      </b-button>

    </b-card>
  </center>
</div>

</template>
<script>

import AuthServices from "../../services/AuthServices";

export default {
  data() {
    return {
      authCode : null,
      email: "",
      password1: "",
      password2: "",
      passwordErrorMsg:"",
      resetPasswordMsg:"",
      resetDone: false
    };
  },

  mounted() {
    this.authCode = this.$route.query.authCode
    this.email = this.$route.query.email
  },

  methods: {
    async resetPassword() {
      try {
        
        if(!this.validPasswords()){
          this.passwordErrorMsg = "required passwords should be equal"
          return
        }
        
        let data = {
          authCode: this.authCode,
          email: this.email,
          password: this.password2,
        }

        const res = await AuthServices.resetPassword(data)

        if(res.resetDone){
          this.resetPasswordMsg= "Reset Password successful"
          this.resetDone = true
        }else{
          this.resetPasswordMsg = res.errorMsg;
        }
      } catch (error) {
        console.log(error)
        this.resetPasswordMsg = error.message;
        throw(error)
      }
    },

    validPasswords(){
      return this.password1.length>0 && this.password1 === this.password2;
    },
  },

  watch: {
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

</style>
