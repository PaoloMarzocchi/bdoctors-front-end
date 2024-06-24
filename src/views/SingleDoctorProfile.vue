<script>
import axios from "axios";
import { state } from "../state.js";
import { RouterLink, RouterView } from "vue-router";
import ReviewForm from "../components/ReviewForm.vue";
import MessageForm from "../components/MessageForm.vue";
import DoctorContacts from "../components/DoctorContacts.vue";
import DoctorServices from "../components/DoctorServices.vue";
import VoteForm from '../components/VoteForm.vue';

export default {
  name: "SingleDoctorProfile",
  components: {
    ReviewForm,
    MessageForm,
    DoctorContacts,
    DoctorServices,
    VoteForm,
  },
  data() {
    return {
      state,
      success: "",
      ButtonA: false,
      ButtonB: false,
      vote: '',
      loading: false,
    };
  },

  methods: {
    getDoctor(url) {
      axios.get(url).then((response) => {
        //console.log(response.data);
        this.doctorProfile = response.data.doctor;
        console.log(this.doctorProfile);

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
    let url =
      this.state.base_url + this.state.doctors_url + "/" + this.$route.params.slug;
    this.getDoctor(url);
    /* this.getDoctorsBySpec(this.$route.params.name); */

    //console.log(typeof (document.referrer));
    //console.log(document.referrer);
    //console.log(document.referrer.includes('/admin'));

    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("source");

    if (source === "back-end") {
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
        <div class="container py-5 my-5">
          <div class="row">

            <div class="col-12 col-md-6 d-flex flex-column gap-3">
              <div class="card doc_profile shadow-lg rounded-4 mt-5 border-0">

                <div class="card-body">
                  <div class="row">
                    <div class="col-4">
                      <div class="doc_photo">
                        <template v-if="!this.doctorProfile.photo">
                          <img class="img-fluid" src="/img/DoctorAvatar.png" alt="" />
                        </template>

                        <template v-else="this.doctorProfile.photo.startsWith('uploads')">
                          <img class="img-fluid" :src="this.state.base_url + '/storage/' + this.doctorProfile.photo"
                            alt="" />
                        </template>
                      </div>
                    </div>

                    <div class="col-8">
                      <div class="doc_info d-flex flex-column justify-content-center gap-3">
                        <div class="doc_name">
                          <h5>
                            Dr {{ this.doctorProfile.user.name }} {{ this.doctorProfile.surname }}
                          </h5>

                          <div>
                            <span class="doc_specialist" v-for="(spec, id) in this.doctorProfile.specializations">
                              {{ id !=
                                this.doctorProfile.specializations.length - 1 ? spec.specialist + ','
                              + ' ' :
                                spec.specialist }}
                            </span>
                          </div>
                        </div>

                        <div>
                          <strong>Specializations : </strong>
                          <br>
                          <span v-for="spec in this.doctorProfile.specializations"
                            class="badge bg-warning text-dark mx-1">
                            {{ spec.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Page tabs -->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="contacts-tab" data-bs-toggle="tab"
                      data-bs-target="#contacts-tab-pane" type="button" role="tab" aria-controls="contacts-tab-pane"
                      aria-selected="true">Contacts</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="services-tab" data-bs-toggle="tab" data-bs-target="#services-tab-pane"
                      type="button" role="tab" aria-controls="services-tab-pane" aria-selected="false">Services</button>
                  </li>
                </ul>

                <!-- Tabs content -->
                <div class="tab-content" id="myTabContent">
                  <div class="tab-pane fade show active" id="contacts-tab-pane" role="tabpanel"
                    aria-labelledby="contacts-tab" tabindex="0">
                    <DoctorContacts :address="this.doctorProfile.address" :telephone="this.doctorProfile.telephone"
                      :email="this.doctorProfile.user.email" />
                  </div>
                  <div class="tab-pane fade" id="services-tab-pane" role="tabpanel" aria-labelledby="services-tab"
                    tabindex="0">
                    <DoctorServices :services="this.doctorProfile.services" />
                  </div>
                </div>
              </div>

              <!-- Vote doctor -->
              <VoteForm :doc_id="this.doctorProfile.id" :doc_name="this.doctorProfile.user.name"
                :doc_surname="this.doctorProfile.surname" />
            </div>

            <div class="col-12 col-md-6 d-flex flex-column gap-3">

              <MessageForm :doc_id="this.doctorProfile.id" />
              <ReviewForm :doc_id="this.doctorProfile.id" />

            </div>
            <!-- Navigation button -->
            <div class="actions mt-4 d-flex justify-content-center align-items-center">
              <a v-if="ButtonA" target="_blank" rel="noopener noreferrer" class="btn btn-dark text-warning"
                href="http://127.0.0.1:8000/dashboard">
                Dashboard
              </a>
              <button v-if="ButtonB" @click="$router.back()" class="btn btn-dark text-warning">
                Back
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <p class="py-5">Sorry, nothing to show here. Retry with another doctor.</p>
      </template>

    </main>
  </div>
</template>

<style scoped>
.doc_profile {

  .doc_photo {
    width: 150px;
    aspect-ratio: 1;
  }

  .doc_specialist {
    font-size: 0.90rem;
  }

  .nav-link {
    color: #2d2d2d;

    &.active {
      background-image: linear-gradient(to top, #fff 0%, #ffd149 90%);
      color: #2d2d2d;
    }
  }
}
</style>