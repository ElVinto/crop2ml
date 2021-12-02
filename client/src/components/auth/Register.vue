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

      <div v-if="!registrationInProgress && !registrationDone">

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

        <b-input-group prepend="City" style="margin-top:1em">
          <b-form-input
            placeholder="(optional)"
            v-model="city"
            type="text"
          >
          </b-form-input>
        </b-input-group>

        <b-input-group prepend="Country" style="margin-top:1em">
          <b-form-input
            placeholder="(optional)"
            v-model="country"
            type="text"
          >
          </b-form-input>
        </b-input-group>

        <b-input-group prepend="Institution" style="margin-top:1em">
          <b-form-input
            placeholder="(optional)"
            v-model="institution"
            type="text"
          >
          </b-form-input>
        </b-input-group>

        <div style="margin-top:1em">
          <a href="/#legalMentions" target="_blank">Terms of use</a>
        </div>
        <b-input-group>
          <b-input-group-prepend is-text>
              <b-form-checkbox v-model="termsAccepted" class="mr-n2">
              </b-form-checkbox>
          </b-input-group-prepend>
          <b-form-input disabled placeholder="Accept terms of use" style="background:white" ></b-form-input>
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

        <div v-if="this.alreadyRegistered && this.verified" style="margin-top:1em">
          <p style="color:red;">
            User already registered<br>
            <a href="#/SignIn"> Sign In</a><br>
            <a href="#/Forget Password"> Forget Password</a>
          </p>
        </div>

        <b-button v-else variant="secondary" @click="register()" style="margin-top:1em">
          Register
        </b-button>
    </div>
    <div v-else-if="registrationInProgress && !registrationDone" style="margin-top:1em">
      Registration almost finished ! <br>
      Please click on the link you must have received by e-mail.<br>
    </div>
    <div v-else-if="registrationDone"  style="margin-top:1em">
      Registration successful <br>
      <b-button variant="secondary" @click="$router.push('/SignIn')" style="margin-top:1em">
        Sign in
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
      alreadyRegistered: false,
      verified: false,
      authCode:"",
      registrationDone: false,
      registrationInProgress: false,
      termsAccepted: false
    };
  },

  mounted() {
    if (this.$route.name == "ValidateRegistration") {
      let data = {
        authCode: this.$route.query.authCode,
        email: this.$route.query.email
      }
      this.validateRegistration(data)
    }
  },

  methods: {
    async register() {
      this.requiredFieldsErrorMsg = ""
      this.passwordErrorMsg = ""
      this.registerErrorMsg = ""
      this.alreadyRegistered = false
      this.verified = false
      let goOn = true
      try {
        if(!this.validForm()){
          this.requiredFieldsErrorMsg = "some required fields are empty"
          goOn = false
        }

        if(!this.validPasswords()){
          this.passwordErrorMsg = "required passwords should be equal"
          goOn = false
        }

        if (!goOn)
          return

        let data = {
          firstName: this.firstName,
          lastName: this.lastName,
          city: this.city,
          country: this.country,
          institution: this.institution,
          email: this.email,
          password: this.password2,
        }

        const res = await AuthServices.register(data)
        this.alreadyRegistered = res.alreadyRegistered
        this.verified = res.verified
        if(res.registrationInProgress){
          this.registrationInProgress = true
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
      return this.email.length>0 && this.firstName.length>0 && this.lastName.length>0 && this.termsAccepted
    },

    async validateRegistration(data){
      const res = await AuthServices.validateRegistration(data)
      if(res.registrationDone){
        this.registrationDone = true
      }
    }
  },

  watch: {
    email(){
      if (this.validForm())
        this.requiredFieldsErrorMsg=""
    },
    firstName(){
      if (this.validForm())
        this.requiredFieldsErrorMsg=""
    },
    lastName(){
      if (this.validForm())
        this.requiredFieldsErrorMsg=""
    },
    password1(){
      if (this.validPasswords())
        this.passwordErrorMsg=""
    },
    password2(){
      if (this.validPasswords())
        this.passwordErrorMsg=""
    },
  }
};
</script>

<style scoped>

</style>
