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
      currentPage: '',
      pageNumber: "",
      totalResults: "",
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
            (this.currentPage = response.data.searchResults.current_page),
            (this.pageNumber = response.data.searchResults.last_page),
            (this.totalResults = response.data.searchResults.total),
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
      this.isLoading = true; // Avvia il caricamento
      this.error = null;

      if (Number.isInteger(url)) {
        url++
        url = `${this.state.base_url}/api/research/${this.$route.params.name}?page=${url}`
      }

      // console.log(url);
      this.title = this.selectedSpec;
      axios.get(url).then((response) => {
        console.log(response.data.searchResults);
        (this.prevPage = response.data.searchResults.prev_page_url),
          (this.nextPage = response.data.searchResults.next_page_url),
          (this.currentPage = response.data.searchResults.current_page),
          (this.pageNumber = response.data.searchResults.last_page),
          (this.totalResults = response.data.searchResults.total),
          (this.doctorsByAdvancedSearch = response.data.searchResults.data);

        console.log(this.doctorsByAdvancedSearch, this.prevPage, this.nextPage);
      })
        .catch((err) => {
          console.error("Errore nel recupero dei dottori per la specializzazione:", err);
          this.error =
            "Si è verificato un errore durante il recupero dei dati. Riprova più tardi.";
        })
        .finally(() => {
          this.isLoading = false; // Fine del caricamento
        });;
    },

    maxReview() {

      if (this.doctorsBySpec.length > 0) {
        let max = 0

        this.doctorsBySpec.forEach(doctor => {

          if (doctor.reviews.length > max) {
            max = doctor.reviews.length
            /* console.log('ciao'); */
          }
        })
        return max;
      } else if (this.doctorsByAdvancedSearch.length > 0) {
        let max = 0
        /* console.log(this.doctorsByAdvancedSearch); */
        this.doctorsByAdvancedSearch.forEach(doctor => {
          if (doctor.reviews.length > max) {
            max = doctor.reviews.length
          }
        })
        return max;
      }
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

  <div class="container my-3 my-md-5 py-3 py-md-5">
    <div class="my-4 d-flex align-items-center">
      <h2 class="mb-3 text-center">
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


    <form class="pb-3" @submit.prevent="
      advancedSearch(
        `${this.state.base_url}/api/advanced-research/${this.selectedSpec}/${this.selectedVote}/${this.selectedReview}`
      )
      " method="get">
      <div class="advanced_search mb-3">
        <div class="row row-cols-1 row-cols-md-3 g-3 mb-3">
          <div class="col">

            <label for="specializations">Change Specialization</label>
            <select required class="form-select" name="specializations" id="specializations" v-model="selectedSpec">
              <option value="" disabled selected>Select one</option>

              <option v-for="(specialization, id) in state.specializations" :selected="$route.params.name">
                {{ specialization.name }}
              </option>
            </select>
          </div>


          <div class="col">
            <label class="form-label" for="myRange">Average vote >= {{ selectedVote }} </label>


            <input type="range" min="0" max="5" v-model="selectedVote" class="PB-range-slider" id="myRange">
          </div>


          <div class="col">
            <label class="form-label" for="myRange">Reviews number > {{ selectedReview }} </label>


            <input type="range" min="0" :max="maxReview()" v-model="selectedReview" class="PB-range-slider"
              id="myRange">
          </div>

          <div class="d-grid text-center">
            <button type="submit" class="my_button_primary text-white">Search</button>

          </div>

        </div>
      </div>
    </form>




    <!-- Pagination -->
    <template v-if="this.doctorsBySpec.length > 0">
      <nav class="pagination_container" aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" v-if="this.prevPage != null">
            <a class="page-link arrow" href="#" @click="this.advancedSearch(this.prevPage)" aria-label="Previous">
              <span aria-hidden="true">
                <i class="fa-solid fa-chevron-left" style="color: #ff725e;"></i>
              </span>
            </a>
          </li>
          <li class="page-item" aria-current="page" v-for="(page, id) in pageNumber">
            <a class="page-link number" :class="currentPage == (id + 1) ? 'my_active' : ''" href="#"
              @click="this.advancedSearch(id)">{{ id + 1 }}</a>
          </li>
          <li class="page-item" v-if="this.nextPage != null">
            <a class="page-link arrow" href="#" @click="this.advancedSearch(this.nextPage)" aria-label="Next">
              <span aria-hidden="true">
                <i class="fa-solid fa-chevron-right" style="color: #ff725e;"></i>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </template>

    <template v-if="this.doctorsByAdvancedSearch.length > 0">
      <nav class="pagination_container" aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" v-if="this.prevPage != null">
            <a class="page-link arrow" href="#" @click="this.advancedSearch(this.prevPage)" aria-label="Previous">
              <span aria-hidden="true">
                <i class="fa-solid fa-chevron-left" style="color: #ff725e;"></i>
              </span>
            </a>
          </li>
          <li class="page-item" aria-current="page" v-for="(page, id) in pageNumber">
            <a class="page-link number" :class="currentPage == (id + 1) ? 'my_active' : ''" href="#"
              @click="this.advancedSearch(id)">{{ id + 1 }}</a>
          </li>
          <li class="page-item" v-if="this.nextPage != null">
            <a class="page-link arrow" href="#" @click="this.advancedSearch(this.nextPage)" aria-label="Next">
              <span aria-hidden="true">
                <i class="fa-solid fa-chevron-right" style="color: #ff725e;"></i>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </template>
    <!-- /Pagination -->


    <div v-if="isLoading" class="d-flex justify-content-center my-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>


    <div v-else-if="advanceSearch && doctorsByAdvancedSearch.length > 0"
      class="advanced_search_results row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 g-md-3 g-sm-5 mt-5">

      <!-- :key="doctor.id -->
      <div class="col" v-for="doctor in doctorsByAdvancedSearch">
        <DoctorCard :doc="doctor"></DoctorCard>
      </div>
    </div>

    <img v-else-if="advanceSearch && doctorsByAdvancedSearch.length === 0" class="img-fluid" src="/img/no_results.png"
      alt="No results" />
    <!-- :key="doctor.id" -->
    <div v-else class="search_results row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 g-md-3 g-sm-5 mt-5">
      <div class="col" v-for="doctor in doctorsBySpec">
        <DoctorCard :doc="doctor"></DoctorCard>
      </div>
    </div>


    <!-- Pagination -->
    <template v-if="this.doctorsBySpec.length > 0">

      <nav class="pagination_container overflow-auto" aria-label="Page navigation">
        <ul class="pagination flex-nowrap">

          <li class="page-item" v-if="this.prevPage != null">
            <a class="page-link arrow" href="#" @click="this.advancedSearch(this.prevPage)" aria-label="Previous">
              <span aria-hidden="true">
                <i class="fa-solid fa-chevron-left" style="color: #ff725e;"></i>
              </span>
            </a>
          </li>
          <li class="page-item" aria-current="page" v-for="(page, id) in pageNumber">
            <a class="page-link number" :class="currentPage == (id + 1) ? 'my_active' : ''" href="#"
              @click="this.advancedSearch(id)">{{ id + 1 }}</a>
          </li>
          <li class="page-item" v-if="this.nextPage != null">
            <a class="page-link arrow" href="#" @click="this.advancedSearch(this.nextPage)" aria-label="Next">
              <span aria-hidden="true">
                <i class="fa-solid fa-chevron-right" style="color: #ff725e;"></i>
              </span>
            </a>
          </li>
        </ul>

      </nav>
    </template>


    <template v-if="this.doctorsByAdvancedSearch.length > 0">

      <nav class="pagination_container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-5"
        aria-label="Page navigation">
        <ul class="pagination flex-nowrap">

          <li class="page-item" v-if="this.prevPage != null">
            <a class="page-link arrow" href="#" @click="this.advancedSearch(this.prevPage)" aria-label="Previous">
              <span aria-hidden="true">
                <i class="fa-solid fa-chevron-left" style="color: #f77b02;"></i>
              </span>
            </a>
          </li>
          <li class="page-item" aria-current="page" v-for="(page, id) in pageNumber">
            <a class="page-link number" :class="currentPage == (id + 1) ? 'my_active' : ''" href="#"
              @click="this.advancedSearch(id)">{{ id + 1 }}</a>
          </li>
          <li class="page-item" v-if="this.nextPage != null">
            <a class="page-link arrow" href="#" @click="this.advancedSearch(this.nextPage)" aria-label="Next">
              <span aria-hidden="true">
                <i class="fa-solid fa-chevron-right" style="color: #f77b02;"></i>
              </span>
            </a>
          </li>
        </ul>

      </nav>
    </template>
  </div>
</template>

<style scoped>
.advanced_search {
  margin-bottom: 4rem;
  padding: 1rem 2rem;
  box-shadow: 2px 6px 8px 0px rgb(133, 132, 132);
  border-bottom-left-radius: 10% 50%;
  border-bottom-right-radius: 10% 50%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

}

.color_primary {
  color: var(--primary);
}

.pagination_container {
  width: fit-content;
  margin: 0 auto;

  .arrow {
    background-color: var(--light-2);
    border: 1px solid var(--primary);
  }

  .number {
    color: var(--primary);
    background-color: var(--light-2);

  }

  .number.my_active {
    background-color: var(--light-2);
    border: 1px solid var(--primary);
    color: var(--primary);
    font-weight: bold;
  }
}

.PB-range-slider {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  /* height: 4px; */
  border-radius: 5px;
  background: #dfdfdf;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.PB-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #f77b02;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}

.PB-range-slider::-webkit-slider-thumb:hover {
  box-shadow: 0px 0px 0px 8px rgba(0, 0, 0, 0.16);
  transition: 0.3s ease-in-out;
}

.PB-range-slider::-moz-range-thumb {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #f77b02;
  cursor: pointer;
}


/* #region :::: MEDIA QUERIES :::: */
@media (max-width: 768px) {
  .container {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .advanced_search {
    margin-bottom: 3rem;
  }

  .pagination_container {
    overflow-x: auto;
    padding-bottom: 1rem;
  }

  .pagination {
    flex-wrap: nowrap;
    white-space: nowrap;
  }
}

@media (max-width: 576px) {
  .container {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  .advanced_search {
    margin-bottom: 2rem;
  }

}

/* #endregion :::: MEDIA QUERIES :::: */
</style>
