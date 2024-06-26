<script>
import { state } from "../state.js";
import axios from "axios";
import DoctorCard from "../components/DoctorCard.vue";

export default {
  name: "AppHome",
  components: {
    DoctorCard,
  },
  data() {
    return {
      state,
      selectedSpec: null,
      sponsoredDocs: [],
      url: state.base_url + state.sponsored_url,
    };
  },
  methods: {
    goToIndex() {
      this.$router.push({ name: "DoctorResults", params: { name: this.selectedSpec } });
    },
    sponsoredAPI(url) {
      axios
        .get(url)
        .then((response) => {
          this.sponsoredDocs = response.data.sponsoredDoctors;
          // console.log(this.sponsoredDocs);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  mounted() {
    const url = this.state.base_url + this.state.sponsored_url;

    this.sponsoredAPI(url);
  },
};
</script>

<template>
  <section class="spec-search p-5 pb-5 bg-secondary">
    <div class="container py-5 d-flex flex-column align-items-center rounded-5">
      <h2 class="my-3">Search your doctor by specialization</h2>
      <div class="col-md-8 fs-4 text-center">
        <div class="mb-3">
          <select
            class="form-select form-select-lg"
            name="specializations"
            id="specializations"
            v-model="selectedSpec"
          >
            <option selected disabled>Select one</option>
            <option v-for="(specialization, id) in state.specializations">
              {{ specialization.name }}
            </option>
          </select>
        </div>
        <div class="actions d-flex justify-content-center gap-3">
          <button v-if="selectedSpec" class="btn btn-dark" @click="goToIndex()">
            Search
          </button>

          <button v-if="!selectedSpec" class="btn btn-dark">
            <RouterLink
              class="nav-link nav_element"
              :to="{ name: 'AdvancedResearch' }"
              href="#"
              aria-current="page"
            >
              Go to Research
            </RouterLink>
          </button>
        </div>
      </div>
    </div>
  </section>

  <section class="sponsored py-4 text-center">
    <h3 class="mb-4">Our sponsored doctors</h3>
    <div class="container py-5">
      <div class="row row-cols-auto gap-5 justify-content-center">
        <div class="col" v-for="doc in sponsoredDocs">
          <DoctorCard :doc="doc"></DoctorCard>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* body {
    background-color: rgba(0, 0, 255, 0.171);
} */

.spec-search {
  background-image: url("/img/bg_doctors.png");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom-left-radius: 20% 20%;
  border-bottom-right-radius: 20% 20%;

  & h2 {
    color: var(--secondary);
  }

  & select {
    border: 3px solid var(--secondary);
    border-radius: 30px;
  }

  & button {
    color: var(--secondary);
    /* background-color: var(--dark); */
  }
}

.sponsored {
  /* background-color: rgba(0, 0, 255, 0.171); */

  & h3 {
    color: var(--warning);
  }
}
</style>
