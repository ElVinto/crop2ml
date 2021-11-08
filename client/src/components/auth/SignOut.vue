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

      <div v-if="$store.getters.getLoggedUserInfo == null">
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
    };
  },

  mounted() {
    this.$store.commit('setLoggedUserInfo',null)
  },

  methods: {
  },

  watch:{
  }

};
</script>

<style scoped>

</style>
