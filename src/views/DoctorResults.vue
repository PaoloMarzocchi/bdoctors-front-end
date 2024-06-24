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
      doctorsByAdvancedSearch: [],
      selectedSpec: null,
      selectedVote: null,
      selectedReview: null,
      advanceSearch: false,
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

    advancedSearch() {
      this.advanceSearch = true;

      const url = `${this.state.base_url}/api/advanced-research/${this.selectedSpec}/${this.selectedVote}/${this.selectedReview}`;

      console.log(url);

      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          console.log(response.data.searchResults);

          this.doctorsByAdvancedSearch = response.data.searchResults;

          console.log(this.doctorsByAdvancedSearch);
        });
    },

    test(review) {
      console.log(review);
    },
  },
  mounted() {
    // console.log(this.searchEl);
    this.getDoctorsBySpec(this.$route.params.name);
  },
};
</script>

<template>
  <div class="container my-5 py-5">
    <div class="my-4 d-flex justify-content-between align-items-center">
      <h2 class="mb-3">
        Research results for:
        <span class="text-warning" v-if="selectedSpec">{{ selectedSpec }}</span>
        <span class="text-warning" v-else>{{ $route.params.name }}</span>
      </h2>
      <RouterLink :to="{ name: 'home' }" class="btn btn-dark text-warning">
        BACK</RouterLink>
    </div>

    <form @submit.prevent="advancedSearch()" method="get">
      <div class="advanced_search mb-3">

        <div class="row mb-3">

          <div class="col-12 col-md-4">
            <label for="specializations">Change Specialization</label>
            <select class="form-select form-select-sm" name="specializations" id="specializations"
              v-model="selectedSpec">
              <option selected disabled>Select specialization</option>
              <option v-for="(specialization, id) in state.specializations">
                {{ specialization.name }}
              </option>
            </select>
          </div>

          <div class="col-12 col-md-4">
            <label for="votes">Filter for vote</label>
            <select class="form-select form-select-sm" name="votes" id="votes" v-model="selectedVote">
              <option selected disabled>Select vote</option>
              <option v-for="n in 5">
                {{ n }}
              </option>
            </select>
          </div>

          <div class="col-12 col-md-4">
            <label for="reviews">Filter for reviews number</label>
            <select class="form-select form-select-sm" name="reviews" id="reviews" v-model="selectedReview">
              <option selected disabled>Select n° reviews</option>
              <option value="5">>5</option>
              <option value="10">>10</option>
              <option value="11">10+</option>
            </select>
          </div>

        </div>
        <!-- <div class="mb-3">
        <select class="form-select form-select-lg" name="specializations" id="specializations" v-model="selectedSpec">
          <option selected disabled>Select one</option>
          <option v-for="(specialization, id) in state.specializations">
            {{ specialization.name }}
          </option>
        </select>
       </div> -->
        <button type="submit" class="btn btn-dark">Search</button>
      </div>
    </form>

    <div v-if="isLoading" class="d-flex justify-content-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="advanceSearch && doctorsByAdvancedSearch.length > 0"
      class="row row-cols-auto gap-5 justify-content-center">

      <div class="col" v-for="doctor in doctorsByAdvancedSearch" :key="doctor.id">
        <DoctorCard :doc="doctor"></DoctorCard>
      </div>

    </div>

    <img v-else-if="advanceSearch && doctorsByAdvancedSearch.length === 0" class="img-fluid" src="/img/no_results.png"
      alt="No results">

    <div v-else class="row row-cols-auto gap-5 justify-content-center">
      <div class="col" v-for="doctor in doctorsBySpec" :key="doctor.id">
        <DoctorCard :doc="doctor"></DoctorCard>
      </div>
    </div>

  </div>
</template>

<style></style>
