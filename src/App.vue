<script>

import { state } from "./state.js";
import { RouterLink, RouterView } from "vue-router";
import AppHeader from './components/AppHeader.vue';
import AppFooter from "./components/AppFooter.vue";


export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      state,
    };
  },
  mounted() {
    this.state.getDoctors(this.state.base_url + this.state.doctors_url);
  },
};
</script>

<template>
  <AppHeader></AppHeader>

  <RouterView></RouterView>

  <AppFooter></AppFooter>
</template>

<style></style>
