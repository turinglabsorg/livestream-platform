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
          <b-field label="New password">
            <b-input v-model="password"></b-input>
          </b-field>
          <b-field label="New password repeat">
            <b-input v-model="passwordrepeat"></b-input>
          </b-field>
          <br />
          <b-button type="is-primary" v-on:click="restorePassword" size="is-large"
            >RESTORE</b-button>
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
      password: "",
      passwordrepeat: "",
    };
  },
  methods: {
    async restorePassword() {
      const app = this;
      if (app.password === app.passwordrepeat) {
        let restore = await app.axios.post(process.env.VUE_APP_BACKEND + "/users/restore", {
          token: app.$route.params.token,
          password: app.password
        });
        if (restore.data.success) {
          this.$buefy.snackbar.open(`Password changed, login now!`);
          window.location = "/#/login";
        }
      } else {
        this.$buefy.snackbar.open(`Passwords doesn't matches.`);
      }
    },
  },
};
</script>
