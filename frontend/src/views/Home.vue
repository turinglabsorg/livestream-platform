<template>
  <div class="home">
    <div v-if="!user">
      <div class="container">
        <section
          class="hero"
          style="
            background-image: url('/play.png');
            background-position: center right;
            background-size: contain;
            background-repeat: no-repeat;
          "
        >
          <div class="hero-body">
              <h1 class="title">Live,</h1>
              <h2 class="subtitle">Simple.</h2>
              <a href="/#/login"
                ><b-button type="is-primary" size="is-large">ENTER</b-button></a
              >
          </div>
        </section>
      </div>
      <br /><br />
      <LiveShows v-if="showLives" />
    </div>
    <div v-if="user">
      <LiveShows />
    </div>
  </div>
</template>

<script>
const axios = require('axios')
import LiveShows from '../components/LiveShows'
export default {
  components: {
    LiveShows
  },
  data() {
    return {
      user: null,
      username: "",
      password: "",
      axios: axios,
      showLives: false
    };
  },
  async mounted() {
    const app = this
    let jwt = localStorage.getItem('livestream_auth')
    if(jwt !== null){
      app.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
      try{
      let profile = await app.axios.get(process.env.VUE_APP_BACKEND + '/users/profile')
      app.user = profile.data
      }catch(e){
        localStorage.setItem('livestream_auth', null)
      }
    }
    let live = await app.axios.get(process.env.VUE_APP_BACKEND + "/live");
    console.log(live)
    if(live.data.length > 0){
      app.showLives = true
    }
  },
};
</script>