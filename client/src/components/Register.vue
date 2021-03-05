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

      
      
      <h3>Register</h3>

      <div v-if="$store.getters.getLoggedUserInfo ===null">

      <!-- <b-input-group prepend="First name" style="margin-top:1em">
        <b-form-input
          :placeholder="firstName"
          v-model="firstName"
          type="text"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Last name" style="margin-top:1em">
        <b-form-input
          :placeholder="lastName"
          v-model="lastName"
          type="text"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Pseudo" style="margin-top:1em">
        <b-form-input
          :placeholder="pseudo"
          v-model="pseudo"
          type="text"
        >
        </b-form-input>
      </b-input-group> -->

    

      <b-input-group prepend="Email" style="margin-top:1em">
        <b-form-input
          :placeholder="email"
          v-model="email"
          type="text"
        >
        </b-form-input>
      </b-input-group>
      <div v-if="emailErrorMsg">
        <p style="color:red;">
          {{emailErrorMsg}}
        </p>
      </div>


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

      <b-button variant="secondary" @click="register()" style="margin-top:1em">
        Register
      </b-button>

      <div v-if="registerErrorMsg" style="margin-top:1em">
        <p style="color:red;">
          {{registerErrorMsg}}
          try <a href="#/SignIn"> Sign In</a>
        </p>
      </div>
  
    <div v-if="registerSuccessMsg" style="margin-top:1em">
        {{registerSuccessMsg}}
        edit <a href="#/Profile"> Profile</a>
    </div>
    </div>
    <div v-else>
       You are signed in as: {{$store.getters.getLoggedUserInfo.email}} 
    </div>


    </b-card>
  </center>
</div>

</template>
<script>

import Authentification from "../services/Authentification";
export default {
  data() {
    return {

      // firstName:"",
      // lastName:"",
      // pseudo:"",

      email: "",
      emailErrorMsg:"",
      
      password1: "",
      password2: "",
      passwordErrorMsg:"",

      registerErrorMsg:"",

      registerSuccessMsg:"",
      
    };
  },

  mounted() {

    console.log("START mounted register")

    

    console.log("END mounted register")
    
  },

  methods: {
    
    async register() {
      console.log('START register')
      try {
        
        console.log(`this.email ${this}`)

        if(!this.validEmail()){
          this.emailErrorMsg = "required email"
          console.log('!this.validEmail()')
        }

        if(!this.validPasswords()){
          this.passwordErrorMsg = "required passwords should be equal"
          console.log('!this.validPasswords()')
        }

        if(this.passwordErrorMsg || this.emailErrorMsg){
          console.log('this.emailErrorMsg: '+this.emailErrorMsg)
          console.log('this.passwordErrorMsg: '+this.passwordErrorMsg)

          return
        }


        let userRegistrationDetails = {
          // firstName: this.firstName,
          // lastName: this.lastName,
          // pseudo: this.pseudo,

          email: this.email,
          password: this.password2,
          category: "user"
        }

        const registeredUserInfo =await Authentification.register(userRegistrationDetails)
        console.log(registeredUserInfo)

        if(registeredUserInfo.errorMsg === undefined ){
          delete userRegistrationDetails.password
          this.$store.commit('setLoggedUserInfo', userRegistrationDetails)
          this.registerSuccessMsg= "Registration successful"
          console.log('this.$store.state.loggedUserInfo')
          console.log(this.$store.state.loggedUserInfo)
        }else{
          this.registerErrorMsg = registeredUserInfo.errorMsg;
        }
        
        
      } catch (error) {
        console.log(error)
        this.registerErrorMsg = error.message;
        throw(error)
      }finally{
        console.log('END register')
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
      this.registerSuccessMsg=""
    },

    password1(){
      this.passwordErrorMsg=""
      this.registerSuccessMsg=""
    },
    password2(){
      this.passwordErrorMsg=""
      this.registerSuccessMsg=""
    },
    
  }

};
</script>

<style scoped>
.fake{
  text-align: left;
}

</style>
