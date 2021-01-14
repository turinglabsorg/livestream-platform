<template>
  <div class="home">
    <div class="container">
      <section
        v-if="!show && !purchase"
        class="hero"
        :style="`background-image: url('` + live.image + `');`"
      >
        <div class="hero-body">
          <h1 class="title">{{ live.name }}</h1>
          <h2 class="subtitle">{{ live.subtitle }}</h2>
          <b-button
            v-on:click="watchShow"
            v-if="user && user.attendee.indexOf(live.slug) !== -1"
            type="is-primary"
            size="is-large"
            >WATCH</b-button
          >
          <b-button
            v-on:click="showPurchase"
            v-if="user && user.attendee.indexOf(live.slug) === -1"
            type="is-primary"
            size="is-large"
            >PURCHASE</b-button
          >
          <a v-if="!user" href="/#/login">
            <b-button type="is-primary" size="is-large"
              >LOGIN TO PURCHASE</b-button
            >
          </a>
        </div>
      </section>
      <div v-if="show && user && user && user.attendee.indexOf(live.slug) === -1" style="margin: 5vh 0">
        <video id="player" class="video-js vjs-default-skin" controls>
          <source :src="live.rtmp" type="application/x-mpegURL" />
        </video>
      </div>
      <div v-if="purchase" style="margin: 5vh 0">
        
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
      purchase: false,
      live: {},
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
      let live = await app.axios.get(
        process.env.VUE_APP_BACKEND + "/live/" + app.$route.params.slug
      );
      app.live = live.data;
    }
  },
  methods: {
    watchShow() {
      const app = this;
      app.show = true;
      setTimeout(function () {
        videojs("player", {
          autoplay: false,
          muted: false,
        });
      }, 500);
    },
    showPurchase(){
      const app = this;
      app.purchase = true;
    }
  },
};
</script>

<style scoped>
.hero {
  background-position: center right !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
}
</style>