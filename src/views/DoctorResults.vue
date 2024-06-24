<script>
import { state } from "../state.js";
import axios from "axios";
import DoctorCard from "../components/DoctorCard.vue";

export default {
  name: "DoctorResults",
  components: {
    DoctorCard,
  },
  data() {
    return {
      state,
      doctorsBySpec: [],
      isLoading: false, // variabile per l'indicatore di caricamento
      error: null, // variabile per il messaggio di errore
    };
  },
  methods: {
    getDoctorsBySpec(specialization) {
      this.isLoading = true; // Avvia il caricamento
      this.error = null;
      const url = `${this.state.base_url}/api/research/${specialization}`;
      //console.log(url);
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.searchResults);
          this.doctorsBySpec = response.data.searchResults;
        })
        .catch((err) => {
          console.error("Errore nel recupero dei dottori per la specializzazione:", err);
          this.error =
            "Si è verificato un errore durante il recupero dei dati. Riprova più tardi.";
        })
        .finally(() => {
          this.isLoading = false; // Fine del caricamento
        });
    },
  },
  mounted() {
    this.getDoctorsBySpec(this.$route.params.name);
  },
};
</script>

<template>
  <div class="container my-5 py-5">
    <div class="my-4 d-flex justify-content-between align-items-center">
      <h2 class="mb-3">
        Research results for: <span class="text-warning">{{ $route.params.name }}</span>
      </h2>
      <RouterLink :to="{ name: 'home' }" class="btn btn-dark text-warning">
        BACK</RouterLink>
    </div>
    <div v-if="isLoading" class="d-flex justify-content-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-else class="row row-cols-auto gap-5 justify-content-center">
      <div class="col" v-for="doctor in doctorsBySpec" :key="doctor.id">

        <DoctorCard :doc="doctor"></DoctorCard>

      </div>
    </div>
  </div>
</template>

<style></style>
