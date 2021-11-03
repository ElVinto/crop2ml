<template>

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

      <h3>User Profile</h3>

      <div v-if="$store.getters.getLoggedUserInfo !==null">
      
      <b-input-group prepend="Email" style="margin-top:1em">
        <b-form-input
          :placeholder="email"
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

      <div v-if="requiredFieldsErrorMsg">
        <p style="color:red;">
          {{requiredFieldsErrorMsg}}
        </p>
      </div>

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

      <b-button variant="secondary" @click="flipShowPassword()" style="margin-top:1em">
        {{`${showPassword?'-':'+'} Edit password`}}
      </b-button>

      <div v-if="showPassword">

      <b-input-group prepend="New password" style="margin-top:1em">
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

      </div>

      <br>

      <b-button variant="secondary" @click="updateProfile()" style="margin-top:1em">
        Update
      </b-button>

      <div v-if="profileErrorMsg">
        <p style="color:red;">
          {{profileErrorMsg}}
        </p>
      </div>
  
      <div v-if="profileSuccessMsg">
          <!-- {{profileSuccessMsg}} -->
          <p style="color:green;">
            Profile updated 
          </p>
      </div>
      
      </div>
      <div v-else>
        <h2> <a href="#/SignIn"> Sign In</a> to edit profile</h2>
      </div>  

    </b-card>
  </center>
</template>

<script>

import AuthServices from "../services/AuthServices";

export default {
  name: "App",
  components: {},

  props: {
    userId: String,
  },

  computed: {},

  data() {
    return {
      firstName:"",
      lastName:"",
      city:"",
      country:"",
      institution:"",
      email: "",
      requiredFieldsErrorMsg:"",
      showPassword:false,
      password1: "",
      password2: "",
      passwordErrorMsg:"",
      profileErrorMsg:"",
      profileSuccessMsg:"",
    };
  },

  created() {
  },

  mounted() {
    if (this.$store.state.loggedUserInfo === null) {
      this.$router.push("/SignIn");
    }else{
      this.firstName = this.$store.getters.getLoggedUserInfo.firstName
      this.lastName = this.$store.getters.getLoggedUserInfo.lastName
      this.city = this.$store.getters.getLoggedUserInfo.city
      this.country = this.$store.getters.getLoggedUserInfo.country
      this.institution = this.$store.getters.getLoggedUserInfo.institution
      this.email = this.$store.getters.getLoggedUserInfo.email
    }
  },

  methods: {

    flipShowPassword(){
      this.showPassword =  !this.showPassword
    },

    async updateProfile() {
      this.requiredFieldsErrorMsg = ""
      this.passwordErrorMsg = ""
      this.profileErrorMsg = ""
      this.profileSuccessMsg = ""
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

        let userProfileDetails = {
          firstName: this.firstName,
          lastName: this.lastName,
          city: this.city,
          country: this.country,
          institution: this.institution,
          email: this.email,
          category: "user"
        }

        if(this.password2){
          userProfileDetails['password']=this.password2
        }

        const res = await AuthServices.updateProfile(userProfileDetails)

        if(ResizeObserverEntry.errorMsg === undefined ){
          delete userProfileDetails.password
          this.$store.commit('setLoggedUserInfo', userProfileDetails)
          this.profileSuccessMsg= "Profile successful"
        }else{
          this.profileErrorMsg = res.errorMsg;
        }
      } catch (error) {
        console.log(error)
        this.profileErrorMsg = error.message;
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

  watch:{

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
  },

};
</script>
<style scoped>
.global{padding: 10px;}
tr:nth-of-type(odd) {
  background: #eee;
}
th {
  background: #333;
  color: white;
  font-weight: bold;
}
td,
th {
  padding: 6px;
  border: 1px solid #ccc;
  text-align: left;
}
</style>
