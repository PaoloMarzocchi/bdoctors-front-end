<script>

export default {
  name: 'DoctorContacts',
  props: {
    address: String,
    telephone: String,
    email: String
  },
  data() {
    return {
    }
  }
}

</script>

<template>
  <div class="doc_contacts d-flex flex-column justify-content-center gap-3 p-4">
    <div>
      <i class="text_primary fa-solid fa-location-dot me-2"></i>
      {{ address }}
    </div>
    <div>
      <i class="text_primary fa-solid fa-phone me-2"></i>
      <a href="tel:+"> {{ telephone }}</a>
    </div>
    <div>
      <i class="text_primary fa-solid fa-at me-2"></i>
      <a href="mailto:"> {{ email }}</a>
    </div>
  </div>
</template>

<style>
.doc_contacts {
  height: 200px;
}
</style>