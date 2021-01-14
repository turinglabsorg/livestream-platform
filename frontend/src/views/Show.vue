<template>
  <div class="home">
    <div class="container">
      <section
        v-if="!purchase && !show"
        class="hero"
        :style="`background-image: url('` + live.image + `');`"
      >
        <div class="hero-body">
          <h2 class="subtitle">{{ live.subtitle }}</h2>
          <h1 class="title">{{ live.name }}</h1>
          <i style="color:#fff">Start at</i><br>
          <time style="color:#fff;font-size:40px;">{{ live.date }} <span style="font-size:18px">at {{ live.hour }}</span></time><br /><br />
          <i v-if="user && user.attendee.indexOf(live.slug) !== -1 && !canShow" style="color:#bbb; font-weight: bold;">
            This show is far from now,<br>came back here at least 1h before start.
          </i>
          <b-button
            v-on:click="watchShow"
            v-if="user && user.attendee.indexOf(live.slug) !== -1 && canShow"
            type="is-primary"
            size="is-large"
            >ENTER THE LIVE!</b-button
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
      <div
        v-if="show && user.attendee.indexOf(live.slug) !== -1"
        style="margin: 5vh 0"
      >
        <video id="player" class="video-js vjs-default-skin" controls>
          <source :src="live.rtmp" type="application/x-mpegURL" />
        </video>
      </div>
      <div v-if="purchase" style="padding: 10vh 0; text-align: center; color:#fff">
        <h1 class="title is-1">Buy ticket with PayPal</h1><br>
        Price for this live is <b>{{ live.price }}€</b><br><br>
        <div id="paypal-button-container"></div>
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
      canShow: false,
      purchase: false,
      live: {},
    };
  },
  async mounted() {
    const app = this;
    let live = await app.axios.get(
      process.env.VUE_APP_BACKEND + "/live/" + app.$route.params.slug
    );
    app.live = live.data;
    let jwt = localStorage.getItem("livestream_auth");
    if (jwt !== null) {
      app.axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      let profile = await app.axios.get(
        process.env.VUE_APP_BACKEND + "/users/profile"
      );
      app.user = profile.data;
      if (app.user.attendee.indexOf(app.live.slug) === -1) {
        app.purchase = true;
        setTimeout(function () {
          paypal
            .Buttons({
              createOrder: function (data, actions) {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: app.live.price,
                        currency_code: "EUR",
                      },
                    },
                  ],
                });
              },
              onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                  if (
                    details.status !== undefined &&
                    details.status === "COMPLETED"
                  ) {
                    app.axios
                      .post(process.env.VUE_APP_BACKEND + "/live/purchase", {
                        live: app.live.slug
                      })
                      .then((response) => {
                        if(response.data.success){
                          location.reload()
                        }
                      });
                  } 
                });
              },
            })
            .render("#paypal-button-container");
        }, 300);
      }else{
        let now = new Date().getTime()
        if(now >= parseInt(app.live.start)){
          app.canShow = true
        }
      }
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
    showPurchase() {
      const app = this;
      app.purchase = true;
    },
  },
};
</script>
