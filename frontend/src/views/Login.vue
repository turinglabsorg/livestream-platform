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
          <b-field label="E-Mail">
            <b-input v-model="email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input v-model="password" type="password"> </b-input>
          </b-field>
          <br />
          <b-button type="is-primary" v-on:click="login" size="is-large"
            >LOGIN</b-button
          ><br /><br />
          <a href="/#/forgot">Forgot password?</a>
          <br><br>
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
      password: "",
    };
  },
  methods: {
    async login() {
      const app = this;
      if (app.email !== "" && app.password !== "") {
        let login = await app.axios.post(
          process.env.VUE_APP_BACKEND + "/auth/login",
          {
            email: app.email,
            password: app.password,
          }
        );
        if (login.data.error === false) {
          localStorage.setItem("livestream_auth", login.data.access_token);
          this.$buefy.snackbar.open(`Login successful!`);
          window.location = "/#/";
          location.reload();
        } else {
          this.$buefy.snackbar.open(login.data.message);
        }
      } else {
        this.$buefy.snackbar.open(`Write your e-mail and a password first.`);
      }
    },
  },
};
</script>
