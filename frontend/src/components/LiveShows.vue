<template>
  <div class="container">
    <h1 style="font-size: 30px; margin: 10px 0 30px 0; text-align:center;">Upcoming shows</h1>
    <div class="columns">
      <div class="column">
        <section
          v-for="live in shows"
          v-bind:key="live._id"
          class="hero"
          :style="`background-image: url('` + live.image + `');`"
        >
          <div class="hero-body">
            <div v-if="user !== null">
              <h2 class="subtitle" v-if="user.attendee.indexOf(live.slug) === -1">{{ live.price }}€</h2>
            </div>
            <div v-if="user === null">
              <h2 class="subtitle">{{ live.price }}€</h2>
            </div>
            <h2 class="subtitle">{{ live.subtitle }}</h2>
            <h1 class="title">{{ live.name }}</h1>
            <i style="color:#fff">Start at</i><br>
            <time style="color:#fff;font-size:40px;">{{ live.date }} <span style="font-size:18px">at {{ live.hour }}</span></time><br /><br />
            <a v-for="tag in live.tags" v-bind:key="tag" href="#">#{{ tag }}&nbsp;</a>
            <br><br>
            <div v-if="user !== null">
              <a :href="'/#/show/' + live.slug">
                <b-button
                  v-if="user !== undefined && user.attendee.indexOf(live.slug) !== -1"
                  type="is-primary"
                  size="is-large"
                  >WATCH</b-button
                >
                <b-button
                  v-if="user !== undefined && user.attendee.indexOf(live.slug) === -1"
                  type="is-primary"
                  size="is-large"
                  >PURCHASE</b-button
                >
              </a>
            </div>
            <a v-if="!user" href="/#/login">
              <b-button type="is-primary" size="is-large"
                >LOGIN TO PURCHASE</b-button
              >
            </a>
          </div>
        </section>
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
      shows: [],
    };
  },
  async mounted() {
    const app = this;
    let jwt = localStorage.getItem("livestream_auth");
    if (jwt !== null) {
      app.axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      try {
        let profile = await app.axios.get(
          process.env.VUE_APP_BACKEND + "/users/profile"
        );
        app.user = profile.data;
      } catch (e) {
        localStorage.setItem("livestream_auth", null);
      }
    }
    app.fetch();
  },
  methods: {
    async fetch() {
      const app = this;
      let live = await app.axios.get(process.env.VUE_APP_BACKEND + "/live");
      for (let k in live.data) {
        live.data[k].tags = live.data[k].tags.split(",");
      }
      app.shows = live.data;
    },
  },
};
</script>
