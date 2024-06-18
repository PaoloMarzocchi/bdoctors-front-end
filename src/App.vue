<script>
import { state } from './state.js';

export default
  {
    name: 'App',
    data() {
      return {
        state,
      }
    },
    mounted() {
      this.state.getDoctors(this.state.base_url + this.state.doctors_url)
    }
  }

</script>

<template>
  <div v-for="doctor in state.doctors">
    <div>
      {{ doctor.user.name }} {{ doctor.surname }}
    </div>
  </div>
</template>

<style></style>
