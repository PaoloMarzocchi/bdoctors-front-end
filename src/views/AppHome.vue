<script>
import { state } from "../state.js";
import axios from "axios";

export default {
  name: "AppHome",
  data() {
    return {
      state,
      specializations: [
        {
          name: "Allergology",
          description:
            "The branch that deals with the effects of seasonal, contact, and medication allergies",
        },
        {
          name: "Cardiology",
          description:
            "The branch that deals with the heart and everything related to it",
        },
        {
          name: "Dermatology",
          description: "The branch that takes care of people's skin",
        },
        {
          name: "Surgery",
          description:
            "This is the most famous field of medical science, where everything converges on the practical level to save lives",
        },
        {
          name: "Gastroenterology",
          description: "Those doctors to turn to when gastrointestinal problems arise",
        },
        {
          name: "Occupational Medicine",
          description:
            "It is the branch of medicine that deals with the prevention, diagnosis, and treatment of diseases caused by work activities.",
        },
        {
          name: "Urology",
          description:
            "The medical and surgical specialty that deals with diseases of the male and female urinary tract and the male external genital organs.",
        },
      ],
      selectedSpec: null,
      sponsoredDocs: [],
      url: state.base_url + state.sponsored_url,
    };
  },
  methods: {
    goToIndex() {
      console.log(this.selectedSpec);
      this.$router.push({ name: "DoctorResults", params: { name: this.selectedSpec } });
    },
    sponsoredAPI(url) {
      axios
        .get(url)
        .then((response) => {
          this.sponsoredDocs = response.data.sponsoredDoctors;
          console.log(this.sponsoredDocs);
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
  <section class="p-5 mb-4 bg-secondary rounded-3">
    <div class="container py-5 d-flex flex-column align-items-center">
      <h2 class="text-warning mb-3">Search your doctor by specializations</h2>
      <div class="col-md-8 fs-4 text-center">
        <div class="mb-3">
          <select class="form-select form-select-lg" name="specializations" id="specializations" v-model="selectedSpec">
            <option selected disabled>Select one</option>
            <option v-for="(specialization, id) in specializations">
              {{ specialization.name }}
            </option>
          </select>
        </div>
        <button class="btn btn-dark text-warning" @click="goToIndex()">Search</button>
      </div>
    </div>
  </section>

  <section class="sponsored pb-4 text-center">
    <h3 class="text-warning pb-4">Our Doctors</h3>
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 gy-4">
        <div class="col" v-for="doc in sponsoredDocs">
          <div class="card h-100 shadow-lg rounded-4">
            <div class="card-header">
              <h5 class="card-title text-center bg-transparent">
                Dr. {{ doc.surname }} {{ doc.user.name }}
              </h5>
              <template v-if="doc.photo == null">
                <img src="/img/DoctorAvatar.png"
                  class="bg-transparent card-img-top img-fluid rounded-3 align-self-center mt-3" alt="Foto del dottore"
                  style="height: 250px; width: 280px; object-fit: cover" />
              </template>
              <template v-else>
                <img :src="`${state.base_url}/storage/${doc.photo}`"
                  class="card-img-top img-fluid rounded-3 align-self-center mt-3" alt="Foto del dottore"
                  style="height: 250px; width: 280px; object-fit: cover" />
              </template>
            </div>

            <div class="card-body d-flex flex-column text-center bg-transparent">
              <span><strong>Address:</strong> {{ doc.address }}</span>
              <span><strong>Services:</strong> {{ doc.services }}</span>
              <span><strong>Telephone:</strong> {{ doc.telephone }}</span>
              <span><strong>Email:</strong> {{ doc.user.email }}</span>

              <router-link :to="{ name: 'DoctorProfile', params: { slug: doc.slug } }" class="btn btn-primary mt-3">
                Visit doctor profile
              </router-link>
            </div>

            <div class="card-footer d-flex flex-column">
              <strong>Specializations : </strong>

              <template v-if="doc.specializations">
                <p>
                  <span v-for="spec in doc.specializations" class="badge bg-warning text-dark">{{ spec.name }}</span>
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
