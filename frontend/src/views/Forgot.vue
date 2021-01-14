<template>
  <div class="home">
    <div class="container">
      <div
        class="columns"
        style="
          background-image: url('/band.png');
          background-position: center right;
          background-size: contain;
          background-repeat: no-repeat;
        "
      >
        <div class="column forms">
          <h1>Restore<br />password.</h1>
          <br />
          <b-field label="E-Mail">
            <b-input v-model="email"></b-input>
          </b-field>
          <br />
          <b-button type="is-primary" v-on:click="restorePassword" size="is-large"
            >RESTORE</b-button
          ><br /><br />
          <a href="/#/register">Don't have an account? Register.</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      user: null,
      axios: axios,
      email: "",
    };
  },
  methods: {
    async restorePassword() {
      const app = this;
      if (app.email !== "") {
        let restore = await app.axios.get(process.env.VUE_APP_BACKEND + "/users/restore/" + app.email);
        if (restore.data.success) {
          this.$buefy.snackbar.open(`If the email is present in our database we'll send the restoration link!`);
          window.location = "/#/login";
        }
      } else {
        this.$buefy.snackbar.open(`Write your e-mail and a password first.`);
      }
    },
  },
};
</script>
