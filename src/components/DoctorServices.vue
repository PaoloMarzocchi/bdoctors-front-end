<script>

export default {
  name: 'DoctorServices',
  props: {
    services: String
  },
  data() {
    return {
    }
  }
}

</script>

<template>
  <div class="doc_services p-4">

    <div><strong>Services: </strong> {{ services }}</div>

  </div>
</template>

<style>
.doc_services {
  height: 200px;
}
</style>