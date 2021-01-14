<template>
  <div class="container">
    <h1 style="font-size: 20px; margin: 10px 0 30px 0">Upcoming shows</h1>
    <div class="columns">
      <div class="column" v-for="i in live" v-bind:key="i._id">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="i.image" />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{ i.name }}</p>
                <p class="subtitle is-6">
                  {{ i.subtitle }} - 
                  <b v-if="i.price !== 'FREE'">{{ i.price }}€</b>
                  <b v-if="i.price === 'FREE'">FREE</b>
                </p>
              </div>
            </div>

            <div class="content">
              {{ i.description }}<br />
              <a v-for="tag in i.tags" v-bind:key="tag" href="#">#{{ tag }}</a>
              <br />
              <time>{{ i.hour }} - {{ i.date }}</time><br /><br />
              <a v-if="user.attendee.indexOf(i.slug) === -1" :href="'/#/show/' + i.slug">
                <b-button type="is-primary" expanded> Purchase </b-button>
              </a>
              <a v-if="user.attendee.indexOf(i.slug) !== -1" :href="'/#/show/' + i.slug">
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
      live: [],
    };
  },
  async mounted() {
    const app = this
    let jwt = localStorage.getItem("livestream_auth");
    if (jwt !== null) {
      app.axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      try{
        let profile = await app.axios.get(
          process.env.VUE_APP_BACKEND + "/users/profile"
        );
        app.user = profile.data;
      }catch(e){
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
      app.live = live.data;
    },
  },
};
</script>
