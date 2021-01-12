<template>
  <div class="home">
    <div v-if="!user">Please login first.</div>
    <div v-if="user">
      <video id="player" class="video-js vjs-default-skin" controls>
        <source src="http://104.248.243.16/hls/mystream.m3u8" type="application/x-mpegURL" />
      </video>
    </div>
  </div>
</template>

<style scoped>
.video-js{
  width: 100%; 
  height: 600px;
}
.vjs-big-play-button{
  top:50%!important;
  left:50%!important;
  margin-top:-25px!important;
  margin-left:-50px!important;
  width:100px!important;
  height: 50px!important;
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
  mounted() {
    videojs("player", 
    {
      autoplay: false,
      muted: false,
    })
  },
};
</script>