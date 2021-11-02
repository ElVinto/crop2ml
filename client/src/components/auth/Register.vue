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

      <b-input-group prepend="Email" style="margin-top:1em">
        <b-form-input
          v-model="email"
          type="text"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="First name" style="margin-top:1em">
        <b-form-input
          v-model="firstName"
          type="text"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Last name" style="margin-top:1em">
        <b-form-input
          v-model="lastName"
          type="text"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Password" style="margin-top:1em">
        <b-form-input
          v-model="password1"
          type="password"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Retype password" style="margin-top:1em">
        <b-form-input
          v-model="password2"
          type="password"
        >
        </b-form-input>
      </b-input-group>

      <div v-if="requiredFieldsErrorMsg">
        <p style="color:red;">
          {{requiredFieldsErrorMsg}}
        </p>
      </div>

      <div v-if="passwordErrorMsg">
        <p style="color:red;">
          {{passwordErrorMsg}}
        </p>
      </div>

      <b-input-group prepend="City" style="margin-top:1em">
        <b-form-input
          v-model="city"
          type="text"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Country" style="margin-top:1em">
        <b-form-input
          v-model="country"
          type="text"
        >
        </b-form-input>
      </b-input-group>

      <b-input-group prepend="Institution" style="margin-top:1em">
        <b-form-input
          v-model="institution"
          type="text"
        >
        </b-form-input>
      </b-input-group>

      <b-button variant="secondary" @click="register()" style="margin-top:1em">
        Register
      </b-button>

      <div v-if="registerErrorMsg" style="margin-top:1em">
        <p style="color:red;">
          {{registerErrorMsg}}
          try <a href="#/SignIn"> Sign In</a>
          or <a href="#/Forget Password"> Forget Password</a>
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

import AuthServices from "../../services/AuthServices";
export default {
  data() {
    return {
      firstName:"",
      lastName:"",
      city:"",
      country:"",
      institution:"",
      email: "",
      requiredFieldsErrorMsg:"",
      password1: "",
      password2: "",
      passwordErrorMsg:"",
      registerErrorMsg:"",
      registerSuccessMsg:"",
    };
  },

  mounted() {
  },

  methods: {
    async register() {
      try {
        if(!this.validForm()){
          this.requiredFieldsErrorMsg = "some required fields are empty"
          return
        }

        if(!this.validPasswords()){
          this.passwordErrorMsg = "required passwords should be equal"
          return
        }

        let userRegistrationDetails = {
          firstName: this.firstName,
          lastName: this.lastName,
          city: this.city,
          country: this.country,
          institution: this.insitution,
          email: this.email,
          password: this.password2,
          verified: true,
          category: "user"
        }

        const registeredUserInfo = await AuthServices.register(userRegistrationDetails)
        console.log(registeredUserInfo)

        if(registeredUserInfo.errorMsg === undefined ){
          delete userRegistrationDetails.password
          this.$store.commit('setLoggedUserInfo', userRegistrationDetails)
          this.registerSuccessMsg= "Registration successful"
        }else{
          this.registerErrorMsg = registeredUserInfo.errorMsg;
        }
      } catch (error) {
        console.log(error)
        this.registerErrorMsg = error.message;
        throw(error)
      }
    },

    validPasswords(){
      return this.password1.length>0 && this.password1 === this.password2;
    },

    validForm(){
      return this.email.length>0 && this.firstName.length>0 && this.lastName.length>0
    },
  },

  watch: {
    email(){
      this.requiredFieldsErrorMsg=""
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
