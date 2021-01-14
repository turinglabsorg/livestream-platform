<template>
  <div id="app">
    <div class="topmenu">
      <div id="nav" class="container">
        <router-link to="/"
          ><h1
            class="is-title"
            style="font-size: 28px; position: absolute; top: 5px; left: 0"
          >
            Livestream Platform
          </h1></router-link
        >
        <a
          v-if="user"
          class="actions"
          href="#"
          v-on:click="logout"
          style="position: absolute; top: 5px; right: 0; padding: 10px 0"
          >LOGOUT</a
        >
        <a
          v-if="!user"
          class="actions"
          href="/#/login"
          style="position: absolute; top: 5px; right: 0; padding: 10px 0"
          >LOGIN</a
        >
      </div>
    </div>
    <router-view />
    <hr style="margin-top: 50px" />
    <div
      style="
        text-align: center;
        color: #efefef;
        padding-bottom: 30px;
        font-size: 12px;
      "
    >
      Livestream Platform
    </div>
  </div>
</template>

<style>
body,
html {
  background: #000;
  color: #fff;
  min-height: 100vh;
  font-family: "Manrope", sans-serif !important;
}
input {
  font-family: "Manrope", sans-serif !important;
}
.is-title,
a,
h1 {
  font-family: "Manrope", sans-serif !important;
  color: #fff !important;
  font-weight: bold !important;
}
.home {
  padding-top: 0px;
}
.button {
  font-weight: bold;
}
#app {
  font-family: "Manrope", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

.forms {
  padding: 15vh 0 !important;
  max-width: 400px;
}
.icon,
.icon i {
  color: #fff !important;
}
.label {
  color: #fff !important;
  font-size: 30px !important;
}
.input {
  background: transparent !important;
  color: #fff !important;
  font-size: 28px !important;
  border: none !important;
  padding: 20px 0 !important;
  border-radius: 0px !important;
  border-bottom: 2px solid #fff !important;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.content a {
  color: #000 !important;
}
.hero {
  text-align: left;
  padding: 15vh 0;
}
.hero .title {
  font-size: 80px;
  font-weight: 800;
}
.hero .subtitle {
  font-size: 60px;
  color: #cecece;
}
.form-signup {
  max-width: 350px;
}
.form-signup .field {
  margin: 0;
}
.video-js {
  width: 100%;
  height: 600px;
}
.vjs-big-play-button {
  top: 50% !important;
  left: 50% !important;
  margin-top: -25px !important;
  margin-left: -50px !important;
  width: 100px !important;
  height: 50px !important;
}
.topmenu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background: #000;
  z-index: 99;
}
@media screen and (max-width: 768px) {
  .container {
    padding: 0 40px;
  }
  .topmenu h1,
  .topmenu a,
  .actions {
    padding: 2px 10px;
    font-size: 15px !important;
  }
  .actions {
    right: 20px !important;
    top: -3px !important;
  }
  .topmenu {
    height: 40px !important;
  }
}
</style>

<script>
const axios = require("axios");
export default {
  data() {
    return {
      user: null,
      axios: axios,
    };
  },
  async mounted() {
    const app = this;
    let jwt = localStorage.getItem("livestream_auth");
    if (jwt !== null) {
      app.axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let profile = await app.axios.get(
        process.env.VUE_APP_BACKEND + "/users/profile"
      );
      app.user = profile.data;
    }
  },
  methods: {
    logout() {
      localStorage.setItem("livestream_auth", null);
      location.reload();
    },
  },
};
</script>