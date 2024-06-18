<script>
import { state } from "./state.js";
import { RouterLink, RouterView } from "vue-router";

export default {
  name: "App",
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
  <RouterView></RouterView>
</template>

<style></style>
