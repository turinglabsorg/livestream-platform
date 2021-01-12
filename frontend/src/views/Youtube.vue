<template>
  <div class="home">
    <div v-if="!user">Please login first.</div>
    <div v-if="user">
      <iframe
        width="100%"
        height="550"
        src="https://www.youtube.com/embed/XModEax5goE?autoplay=1&controls=0&&showinfo=0&loop=0&rel=0​"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.ytp-chrome-top {
  display: none !important;
}
</style>
<script>
export default {
  data() {
    return {
      user: {
        access_token: "test",
      },
    };
  },
};
</script>