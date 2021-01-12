<template>
  <div class="home">
    <div v-if="!user">Please login first.</div>
    <div v-if="user">
      <iframe
          src="https://player.twitch.tv/?channel=turinglabsorg&parent=localhost"
          height="600"
          width="100%"
          allowfullscreen="allowfullscreen">
      </iframe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        access_token: "test",
      },
    };
  }
};
</script>