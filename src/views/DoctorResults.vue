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
      url: "",
      title: null,
      prevPage: "",
      nextPage: "",
      pageNumber: "",
      totalResults: "",
      doctorsBySpec: [],
      doctorsByAdvancedSearch: [],
      selectedSpec: null,
      selectedVote: 0,
      selectedReview: null,
      advanceSearch: false,
      isLoading: false, // variabile per l'indicatore di caricamento
      error: null, // variabile per il messaggio di errore
    };
  },
  methods: {
    getDoctorsBySpec(url) {
      this.isLoading = true; // Avvia il caricamento
      this.error = null;

      axios
        .get(url)
        .then((response) => {
          console.log(response.data.searchResults);
          this.doctorsBySpec = response.data.searchResults.data;
          (this.prevPage = response.data.searchResults.prev_page_url),
            (this.nextPage = response.data.searchResults.next_page_url),
            (this.pageNumber = response.data.searchResults.lastPage),
            (this.totalResults = response.data.searchResults.links.length),
            console.log(this.doctorsBySpec, this.prevPage, this.nextPage);
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

    advancedSearch(url) {
      this.advanceSearch = true;
      this.doctorsBySpec = [];

      // console.log(url);
      this.title = this.selectedSpec;
      axios.get(url).then((response) => {
        console.log(response.data.searchResults);
        (this.prevPage = response.data.searchResults.prev_page_url),
          (this.nextPage = response.data.searchResults.next_page_url),
          (this.pageNumber = response.data.searchResults.lastPage),
          (this.totalResults = response.data.searchResults.total),
          (this.doctorsByAdvancedSearch = response.data.searchResults.data);

        console.log(this.doctorsByAdvancedSearch, this.prevPage, this.nextPage);
      });
    },

    test(review) {
      console.log(review);
    },
  },
  mounted() {
    if (this.$route.params.name) {
      this.selectedSpec = this.$route.params.name;
      this.url = `${this.state.base_url}/api/research/${this.$route.params.name}`;
      this.getDoctorsBySpec(this.url);
    }
  },
};
</script>

<template>
  <div class="container my-5 py-5">
    <div class="my-4 d-flex justify-content-between align-items-center">
      <h2 class="mb-3">
        <span v-if="this.doctorsBySpec.length > 0">
          There are {{ this.totalResults }} results for
          <strong class="color_primary">"{{ $route.params.name }}"</strong> research
        </span>

        <span v-else-if="this.doctorsByAdvancedSearch.length > 0">
          The new research for
          <strong class="color_primary">{{ this.title }}</strong> has produced
          {{ this.totalResults }}
          results
        </span>

        <span v-else-if="this.$route.params.name == null"> Start a new research </span>
      </h2>
    </div>

    <div class="advanced_search">
      <form @submit.prevent="
        advancedSearch(
          `${this.state.base_url}/api/advanced-research/${this.selectedSpec}/${this.selectedVote}/${this.selectedReview}`
        )
        " method="get">
        <div class="advanced_search mb-3">
          <div class="row mb-3">
            <div class="col-12 col-md-4">
              <label for="specializations">Change Specialization</label>
              <select required class="form-select form-select-sm" name="specializations" id="specializations"
                v-model="selectedSpec">
                <option value="" disabled selected>Select one</option>

                <option v-for="(specialization, id) in state.specializations" :selected="$route.params.name">
                  {{ specialization.name }}
                </option>
              </select>
            </div>

            <div class="col-12 col-md-4">
              <label for="votes">Filter for avg vote</label>
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

          <button type="submit" class="mt-3 my_button_primary text-white">Search</button>
        </div>
      </form>
    </div>

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
      <!-- :key="doctor.id -->
      <div class="col" v-for="doctor in doctorsByAdvancedSearch">
        <DoctorCard :doc="doctor"></DoctorCard>
      </div>
    </div>

    <img v-else-if="advanceSearch && doctorsByAdvancedSearch.length === 0" class="img-fluid" src="/img/no_results.png"
      alt="No results" />
    <!-- :key="doctor.id" -->
    <div v-else class="row row-cols-auto gap-5 justify-content-center">
      <div class="col" v-for="doctor in doctorsBySpec">
        <DoctorCard :doc="doctor"></DoctorCard>
      </div>
    </div>

    <div v-if="this.doctorsBySpec.length > 0">
      <nav aria-label="Page navigation">
        <div class="pagination d-flex align-items-center gap-0">
          <span class="page-item" v-if="this.prevPage != null">
            <button class="page-link" href="#" @click="this.getDoctorsBySpec(this.prevPage)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </span>
          <!-- v-show="this.state.projects.next_page_url != null" -->
          <span class="page-item" v-show="this.nextPage != null">
            <button class="page-link" href="#" @click="this.getDoctorsBySpec(this.nextPage)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </span>
        </div>
      </nav>
    </div>

    <div v-if="this.doctorsByAdvancedSearch.length > 0">
      <nav aria-label="Page navigation">
        <div class="pagination d-flex align-items-center gap-0">
          <span class="page-item" v-if="this.prevPage != null">
            <button class="page-link" href="#" @click="this.advancedSearch(this.prevPage)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </span>
          <!-- v-show="this.state.projects.next_page_url != null" -->
          <span class="page-item" v-show="this.nextPage != null">
            <button class="page-link" href="#" @click="this.advancedSearch(this.nextPage)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </button>
          </span>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.advanced_search {
  margin-bottom: 7rem;
}

.color_primary {
  color: var(--primary);
}
</style>
