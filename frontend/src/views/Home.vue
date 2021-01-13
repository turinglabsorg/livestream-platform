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
                ><b-button type="is-primary" size="is-large">Enter</b-button></a
              >
          </div>
        </section>
      </div>
      <br /><br />
      <LiveShows />
    </div>
    <div v-if="user">
      <!--<video id="player" class="video-js vjs-default-skin" controls>
        <source
          src="http://104.248.243.16/hls/mystream.m3u8"
          type="application/x-mpegURL"
        />
      </video>-->
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
      axios: axios
    };
  },
  async mounted() {
    const app = this
    let jwt = localStorage.getItem('livestream_auth')
    if(jwt !== null){
      app.axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
      let profile = await app.axios.get(process.env.VUE_APP_BACKEND + '/users/profile')
      app.user = profile.data
      setInterval(function(){
        videojs("player", {
          autoplay: false,
          muted: false,
        });
      }, 500)
    }
  },
};
</script>