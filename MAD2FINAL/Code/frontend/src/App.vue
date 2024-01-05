<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '../src/views/NavbarView.vue'
export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
/* Add any necessary styling here */
</style>
