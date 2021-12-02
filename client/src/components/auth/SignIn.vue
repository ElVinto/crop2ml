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

      <div v-if="$store.getters.getLoggedUserInfo ===null">

        <h3>Sign in</h3>

        <b-input-group prepend="Email">
          <b-form-input
            :placeholder="email"
            v-model="email"
            type="email"
          >
          </b-form-input>
        </b-input-group>


        <b-input-group prepend="Password" style="margin-top:1em">
          <b-form-input
            :placeholder="password"
            v-model="password"
            type="password"
          >
          </b-form-input>
        </b-input-group>

        <b-button variant="secondary" @click="signIn()" style="margin-top:1em">
          Submit
        </b-button>

        <div v-if="signInErrorMsg">
          <p style="color:red;">
            {{signInErrorMsg}}
          </p>
        </div>

        

        <div class="row">
          <div class="col-sm-8">
            <p  style="text-align: left; margin-top:1em">
              <a href="#/ForgotPassword"> Forgotten password </a>
            </p>
          </div>
          <div class="col-sm-4">
            <p  style="text-align: right; margin-top:1em">
              <a href="#/Register"> Register</a>
            </p>
          </div>
        </div>
      
      </div>
      <div v-else>
        Login successful <br>
        You are signed in as: {{$store.getters.getLoggedUserInfo.email}} <br>
        <b-button variant="secondary" @click="$router.push('/')" style="margin-top:1em">
          Home page
        </b-button>
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
      email: "",
      password: "",
      signInErrorMsg:"",
      userInfo: null
    };
  },

  mounted() {
    // this.email = this.$store.getters.getLoggedUserEMail;
  },

  methods: {
    async signIn() {
      try {
        const userInfo = await AuthServices.signIn(this.email, this.password)
        if(userInfo.errorMsg === undefined){
          this.$store.commit('setLoggedUserInfo', userInfo)
        }else{
          this.signInErrorMsg = userInfo.errorMsg
        }
      } catch (error) { 
        this.error = error.message;
      }
    },
  },

  watch:{
    email(){
      this.signInErrorMsg=""
    },
    
    password(){
      this.signInErrorMsg=""
    },
  }
};
</script>

<style scoped>

</style>
