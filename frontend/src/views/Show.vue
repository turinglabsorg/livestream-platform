<template>
  <div class="home">
    <div class="container">
      <section
        v-if="!show"
        class="hero"
        style="
          background-image: url('https://img.discogs.com/xO9aMnFpz1uMIrdbmWl1venunKU=/600x536/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-1485641-1331219855.jpeg.jpg');
          background-position: center right;
          background-size: contain;
          background-repeat: no-repeat;
        "
      >
        <div class="hero-body">
          <h1 class="title">Timber<br />Timbre</h1>
          <h2 class="subtitle">Live@Home</h2>
          <b-button v-on:click="watchShow" v-if="user" type="is-primary" size="is-large"
            >WATCH</b-button
          >
          <a v-if="!user" href="/#/login">
          <b-button type="is-primary" size="is-large"
            >LOGIN TO WATCH</b-button>
          </a>
        </div>
      </section>
      <div v-if="show && user" style="margin:5vh 0">
        <iframe
          width="100%"
          height="600"
          src="https://www.youtube.com/embed/r1lxHxLn8Rk"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
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
      username: "",
      password: "",
      axios: axios,
      show: false,
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
      setInterval(function () {
        videojs("player", {
          autoplay: false,
          muted: false,
        });
      }, 500);
    }
  },
  methods: {
    watchShow() {
      const app = this
      app.show = true
    },
  },
};
</script>