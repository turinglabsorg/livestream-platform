<template>
  <div class="container">
    <h1 style="font-size: 20px; margin: 10px 0 30px 0">Upcoming shows</h1>
    <div class="columns">
      <div class="column" v-for="i in [1, 2, 3]" v-bind:key="i">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                src="https://img.discogs.com/xO9aMnFpz1uMIrdbmWl1venunKU=/600x536/smart/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/A-1485641-1331219855.jpeg.jpg"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Timber Timbre</p>
                <p class="subtitle is-6">Live@Home - <b>FREE</b></p>
              </div>
            </div>

            <div class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris. <br />
              <a href="#">#rock</a> <a href="#">#indie</a>
              <br />
              <time datetime="2016-1-1">22:00 - 14 Jan 2020</time><br /><br />
              <a href="/#/show/test">
                <b-button type="is-primary" expanded> Watch </b-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
export default {
  name: "LiveShows",
  data() {
    return {
      user: null,
      axios: axios,
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      const app = this;
      if (app.email !== "" && app.password !== "") {
        let registered = await app.axios.post(
          process.env.VUE_APP_BACKEND + "/users",
          {
            email: app.email,
            password: app.password,
          }
        );
        if (registered.data.error === false) {
          this.$buefy.snackbar.open(registered.data.message);
          let login = await app.axios.post(
            process.env.VUE_APP_BACKEND + "/auth/login",
            {
              email: app.email,
              password: app.password,
            }
          );
          localStorage.setItem("livestream_auth", login.data.access_token);
        } else {
          this.$buefy.snackbar.open(registered.data.message);
        }
      } else {
        this.$buefy.snackbar.open(`Write your e-mail and a password first.`);
      }
    },
  },
};
</script>
