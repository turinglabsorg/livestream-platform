<template>
  <div class="home">
    <div v-if="!user">Please login first.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
};
</script>