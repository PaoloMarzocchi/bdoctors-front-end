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
    };
  },

  methods: {
    getDoctor(url) {
      axios.get(url).then((response) => {
        console.log(response.data);

        this.doctorProfile = response.data.doctor;
        console.log(this.doctorProfile);

        if (response.data.success) {
          this.success = response.data.success;
          this.project = response.data.doctor;
        } else {
          console.log(this.doctorProfile, this.success);
          this.$router.push({ name: "notFound" });
        }
      });
    },
  },

  mounted() {
    // console.log(this.$route.params.slug);

    let url =
      this.state.base_url + this.state.doctors_url + "/" + this.$route.params.slug;
    this.getDoctor(url);
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
                <template v-if="this.doctorProfile.photo.startsWith('uploads')">
                  <img
                    :src="this.state.base_api + '/storage/' + this.doctorProfile.photo"
                    alt=""
                /></template>

                <template v-else>
                  <img :src="this.doctorProfile.photo" alt="" />
                </template>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-title">
                  <h3>
                    Dr {{ this.doctorProfile.user.name }} {{ this.doctorProfile.surname }}
                  </h3>
                </div>
                <div class="card-body">
                  <p>
                    Hi! You can find me at my studio, here :
                    {{ this.doctorProfile.address }}
                  </p>
                  <p>
                    Or, if you want to get in touch with me, feel free to call at the :
                    <a href="tel:+">{{ this.doctorProfile.telephone }}</a>
                  </p>
                  <p>
                    Otherwise, you can send me a message here:
                    <button class="btn btn-primary">
                      <router-link class="nav-link" :to="{ name: 'contact-me' }"
                        >Send me a message</router-link
                      >
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <p>Burodogah</p>
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
