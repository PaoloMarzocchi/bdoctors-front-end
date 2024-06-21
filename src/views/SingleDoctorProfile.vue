<script>
import axios from "axios";
import { state } from "../state.js";

export default {
  name: "SingleDoctorProfile",

  data() {
    return {
      state,
      doctorProfile: "",
      success: "",
      loading: true,
      ButtonA: false,
      ButtonB: false,
    };
  },

  methods: {
    getDoctor(url) {
      axios.get(url).then((response) => {
        //console.log(response.data);
        this.doctorProfile = response.data.doctor;
        //console.log(this.doctorProfile);

        if (response.data.success) {
          this.success = response.data.success;
          this.project = response.data.doctor;
        } else {
          //console.log(this.doctorProfile, this.success);
          this.$router.push({ name: "notFound" });
        }
        //console.log(this.state.base_url + "/storage/" + this.doctorProfile.cv);
      });
    },
  },

  mounted() {
    //console.log(this.$route.params.slug);
    let url = this.state.base_url + this.state.doctors_url + "/" + this.$route.params.slug;
    this.getDoctor(url);
    /* this.getDoctorsBySpec(this.$route.params.name); */

    //console.log(typeof (document.referrer));
    //console.log(document.referrer);
    //console.log(document.referrer.includes('/admin'));

    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');

    if (source === 'back-end') {
      this.ButtonA = true;
      //console.log("A " + this.ButtonA);
    } else {
      this.ButtonB = true;
      //console.log("B " + this.ButtonB);
    }
  },
};
</script>

<template>
  <div>
    <main>
      <template v-if="this.success">
        <div class="container my-5">
          <div class="row">
            <div class="col">
              <div>
                <template v-if="!this.doctorProfile.photo">
                  <img class="img-fluid" src="/img/DoctorAvatar.png" alt="" />
                </template>

                <template v-else="this.doctorProfile.photo.startsWith('uploads')">
                  <img class="img-fluid" :src="this.state.base_url + '/storage/' + this.doctorProfile.photo" alt="" />
                </template>
              </div>
            </div>
            <div class="col d-flex flex-column justify-content-between">
              <!-- <div class="card">
                <div class="card-title">
                  <h3>
                    Dr {{ this.doctorProfile.user.name }} {{ this.doctorProfile.surname }}
                  </h3>
                </div>
                <div class="card-body">
                  <p>
                    Hi! You can find me at my studio here :
                    {{ this.doctorProfile.address }}
                  </p>
                  <p>
                    Or, if you want to get in touch with me, feel free to call at the :
                    <a href="tel:+">{{ this.doctorProfile.telephone }}</a>
                  </p>
                  <p>Otherwise, you can send me a message here:</p>
                </div>
              </div> -->
              <div class="card h-75 shadow-lg rounded-4">
                <div class="card-header">
                  <h5 class="card-title text-center bg-transparent">
                    Dr {{ this.doctorProfile.user.name }} {{ this.doctorProfile.surname }}
                  </h5>
                </div>

                <div class="card-body d-flex flex-column justify-content-center  text-center bg-transparent">
                  <span><strong>Address:</strong> {{ this.doctorProfile.address }}</span>
                  <span><strong>Services:</strong> {{ this.doctorProfile.services }}</span>
                  <span><strong>Telephone:</strong>
                    <a href="tel:+">{{ this.doctorProfile.telephone }}</a></span>
                  <span><strong>Email:</strong>
                    <a href="mailto:">{{ this.doctorProfile.user.email }}</a></span>
                </div>

                <div class="card-footer bg-transparent d-flex flex-column">
                  <template v-if="this.doctorProfile.specializations">
                    <p>
                      <strong>Specializations : </strong>
                      <span v-for="spec in this.doctorProfile.specializations"
                        class="badge bg-warning text-dark mx-1">{{
                          spec.name }}</span>
                    </p>
                  </template>
                </div>
              </div>

              <!-- <div class="card mt-5">
                <template v-if="this.doctorProfile.cv == null">
                  <p>Doctor still has to upload his cv</p>
                </template>

                <template v-else="this.doctorProfile.cv.startsWith('cv')">
                  <object
                    class="pdf"
                    height="300"
                    :data="this.state.base_url + '/storage/' + this.doctorProfile.cv"
                    type=""
                  ></object>
                </template>
              </div> -->

              <div class="actions d-flex justify-content-between mt-4">
                <!-- <button @click="$router.back()" class="btn btn-dark text-warning">
                  BACK
                </button> -->

                <a v-if="ButtonA" target="_blank" rel="noopener noreferrer" class="btn btn-dark text-warning"
                  href="http://127.0.0.1:8000/dashboard">
                  DASHBOARD
                </a>
                <button v-if="ButtonB" @click="$router.back()" class="btn btn-dark text-warning">
                  BACK
                </button>

                <button class="btn btn-warning text-dark fw-semibold">
                  <router-link class="nav-link" :to="{ name: 'contact-me' }">Send me a message</router-link>
                </button>
              </div>

            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <p>Sorry, nothing to show here. Retry with another doctor.</p>
      </template>
    </main>
  </div>
</template>

<style>
* {
  background-color: white;
  color: black;
}
</style>
