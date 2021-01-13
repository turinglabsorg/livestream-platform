<template>
  <div class="home">
    <div class="container">
      <div class="columns"
          style="
            background-image: url('/band.png');
            background-position: center right;
            background-size: contain;
            background-repeat: no-repeat;
          ">
        <div class="column forms">
          <h1>Create<br>account.</h1><br>
          <b-field label="E-Mail">
            <b-input v-model="email"></b-input>
          </b-field>
          <b-field label="Password">
            <b-input v-model="password" type="password">
            </b-input>
          </b-field>
          <br />
          <b-button type="is-primary" v-on:click="register" size="is-large">REGISTER</b-button
          ><br /><br />
          <a href="/#/login">Don't have an account? Login.</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const axios = require('axios')
  export default {
    data() {
      return {
        user: null,
        axios: axios,
        email: '',
        password: ''
      };
    },
    methods: {
      async register(){
        const app = this
        if(app.email !== '' && app.password !== ''){
          let registered = await app.axios.post(process.env.VUE_APP_BACKEND + '/users', {
            email: app.email,
            password: app.password
          })
          if(registered.data.error === false){
            this.$buefy.snackbar.open(registered.data.message)
            let login = await app.axios.post(process.env.VUE_APP_BACKEND + '/auth/login', {
              email: app.email,
              password: app.password
            })
            localStorage.setItem('livestream_auth', login.data.access_token)
          }else{
            this.$buefy.snackbar.open(registered.data.message)
          }
        }else{
          this.$buefy.snackbar.open(`Write your e-mail and a password first.`)
        }
      }
    }
  };
</script>
