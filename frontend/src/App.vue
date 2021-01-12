<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"
        ><h1
          class="is-title"
          style="
            font-size: 28px;
            color: #000 !important;
            position: absolute;
            top: 10px;
            left: 10px;
          "
        >
          Livestream Platform
        </h1></router-link
      >
      <router-link to="/login"
        ><b-button
          type="is-primary"
          style="position: absolute; top: 10px; right: 10px"
          >Login</b-button
        ></router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style>
.home {
  padding-top: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
