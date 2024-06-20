<script>
import { state } from "../state.js";
import axios from "axios";

export default {
  name: "DoctorResults",
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
          //console.log(response.data.searchResults);
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
  <div class="container my-5">
    <div class="my-4 d-flex justify-content-between align-items-center">
      <h2 class="text-warning mb-3">
        Risultati ricerca Specializzazione: {{ $route.params.name }}
      </h2>
      <RouterLink :to="{ name: 'home' }" class="btn btn-dark text-warning">
        BACK</RouterLink
      >
    </div>
    <div v-if="isLoading" class="d-flex justify-content-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-else class="row gap-5 justify-content-center">
      <div
        class="col-12 col-md-6 col-lg-3"
        v-for="doctor in doctorsBySpec"
        :key="doctor.id"
      >
        <div class="card h-100 shadow-lg rounded-4">
          <div class="card-header">
            <h5 class="card-title text-center bg-transparent">
              Dr. {{ doctor.surname }} {{ doctor.user.name }}
            </h5>
            <template v-if="doctor.photo == null">
              <img
                src="https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg"
                class="card-img-top img-fluid rounded-3 align-self-center mt-3"
                alt="Foto del dottore"
                style="height: 250px; width: 280px; object-fit: cover"
              />
            </template>
            <template v-else>
              <img
                :src="`${state.base_url}/storage/${doctor.photo}`"
                class="card-img-top img-fluid rounded-3 align-self-center mt-3"
                alt="Foto del dottore"
                style="height: 250px; width: 280px; object-fit: cover"
              />
            </template>
          </div>

          <div class="card-body d-flex flex-column text-center bg-transparent">
            <span><strong>Address:</strong> {{ doctor.address }}</span>
            <span><strong>Services:</strong> {{ doctor.services }}</span>
            <span><strong>Telephone:</strong> {{ doctor.telephone }}</span>
            <span><strong>Email:</strong> {{ doctor.user.email }}</span>

            <router-link
              :to="{ name: 'DoctorProfile', params: { slug: doctor.slug } }"
              class="btn btn-primary mt-3"
            >
              Visit doctor profile
            </router-link>
          </div>

          <!-- <div class="card-footer d-flex flex-column">
            <strong>Specializations : </strong>
            <template v-if="doctor.specializations">
              <div>
                <span
                  class="badge bg-dark my_primary mt-4"
                  v-for="spec in doctor.specializations"
                >
                  {{ spec.name }}
                </span>
              </div>
            </template>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
