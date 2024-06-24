<script>
import axios from "axios";
import { state } from "../state.js";
import { RouterLink, RouterView } from "vue-router";
import ReviewForm from "../components/ReviewForm.vue";
import MessageForm from "../components/MessageForm.vue";
import DoctorContacts from "../components/DoctorContacts.vue";
import DoctorServices from "../components/DoctorServices.vue";

export default {
  name: "SingleDoctorProfile",
  components: {
    ReviewForm,
    MessageForm,
    DoctorContacts,
    DoctorServices,
  },
  data() {
    return {
      state,
      success: "",
      ButtonA: false,
      ButtonB: false,
      vote: '',
      loading: false,
      rating: 0,
      hoverRating: 0,
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

    sendVote() {
      this.loading = true;
      const data =
      {
        vote_id: this.vote,
        doctor_profile_id: this.doctorProfile.id,
      };
      console.log(data);

      const url = `${this.state.base_url}/api/votes`;
      axios.post(url, data).then(response => {
        console.log(response);
        if (response.data.success) {
          this.vote = '';
          n = 0;
        }
        else {
          /* this.$router.push({ name: 'not-found' }); */
        }
      }
      ).catch(err => {
        //console.log(err.message);
        this.error_message = err.message;
      })
    },
    getStarIcon(n) {
      return {
        icon: this.hoverRating >= n || this.rating >= n ? ['fas', 'star'] : ['far', 'star'],
        style: { color: '#FFD700 !important' }
      };
    },
    hoverStar(n) {
      this.hoverRating = n;
      //console.log(this.hoverRating);
    },
    leaveStar() {
      this.hoverRating = 0;
      //console.log(this.hoverRating);
    },
    setRating(n) {
      this.rating = n;
      //console.log(this.rating);
      this.vote = this.rating;
      //console.log(this.vote);
    }
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


            <div class="col d-flex flex-column gap-3">
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
                <div class="right_actions">
                  <button class="btn btn-warning text-dark fw-semibold">
                    <router-link class="nav-link" :to="{ name: 'vote-doctor' }">Vote the doctor</router-link>
                  </button>
                </div>
              </div>

            </div>

            <div class="col d-flex flex-column justify-content-between">

              <MessageForm :doc_id="this.doctorProfile.id" />
              <ReviewForm :doc_id="this.doctorProfile.id" />


              <div class="card shadow rounded-3 p-3 py-5">
                <h2 class="fw-bold fs-1">
                  Hello visitor ! <br>
                  Do you want to leave a vote for the Doctor ?
                </h2>
                <form @submit.prevent="sendVote()" action="" method="post">
                  <div class="stars py-5">
                    <span v-for="n in 5" :key="n" @mouseover="hoverStar(n)" @mouseleave="leaveStar"
                      @click="setRating(n)" class="vote_stars">
                      <font-awesome-icon :icon="getStarIcon(n).icon" size="xl" :style="getStarIcon(n).style" />
                    </span>
                  </div>
                  <button type="submit" class="btn btn-dark text-success" :disabled="loading">Send</button>
                </form>
              </div>
            </div>
            <div class="col d-flex flex-column justify-content-between">
              <div class="card h-75 shadow-lg rounded-4 mb-3">
                <div class="card-header">
                  <h5 class="card-title text-center bg-transparent">Send me a message</h5>
                </div>
                <div class="card-body d-flex flex-column justify-content-center text-center bg-transparent">
                  <form @submit.prevent="sendMessage()" action="" method="post">
                    <div class="mb-3">
                      <label for="firstName" class="form-label">First Name *</label>
                      <input type="text" class="form-control" name="firstName" id="firstName" aria-describedby="helpId"
                        placeholder="Your first name here" v-model="firstName" />
                      <p class="text-danger mt-3" v-show="this.firstNameError">
                        {{ this.firstNameError }}
                      </p>
                      <small id="helpId" class="form-text text-muted">Type your first name here <i
                          class="fa-solid fa-arrow-up"></i></small>
                    </div>
                    <div class="mb-3">
                      <label for="lastName" class="form-label">Last Name *</label>
                      <input type="text" class="form-control" name="lastName" id="lastName" aria-describedby="helpId"
                        placeholder="Your last name here" v-model="lastName" />
                      <p class="text-danger mt-3" v-show="this.lastNameError">
                        {{ this.lastNameError }}
                      </p>
                      <small id="helpId" class="form-text text-muted">Type your last name here <i
                          class="fa-solid fa-arrow-up"></i></small>
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email *</label>
                      <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelpId"
                        placeholder="abc@mail.com" v-model="email" />
                      <p class="text-danger mt-3" v-show="this.emailError">
                        {{ this.emailError }}
                      </p>
                      <small id="emailHelpId" class="form-text text-muted">Insert your email here <i
                          class="fa-solid fa-arrow-up"></i></small>
                    </div>
                    <div class="mb-3">
                      <label for="message" class="form-label">Your message *</label>
                      <textarea class="form-control" name="message" id="message" rows="6" v-model="message"></textarea>
                      <p class="text-danger mt-3" v-show="this.emailError">
                        {{ this.emailError }}
                      </p>
                      <small id="messageHelpId" class="form-text text-muted">Write here what you want to tell me
                        <i class="fa-solid fa-arrow-up"></i></small>
                    </div>
                    <div class="col-md-12 mt-5 row text-danger">
                      <p>( <span class="text-dark">*</span> ) Required fields.</p>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button>
                  </form>
                </div>
              </div>
              <ReviewForm :doc_id="this.doctorProfile.id" />
            </div>
            <div class="actions d-flex justify-content-center mt-4">
              <a v-if="ButtonA" target="_blank" rel="noopener noreferrer" class="btn btn-dark text-warning"
                href="http://127.0.0.1:8000/dashboard">
                DASHBOARD
              </a>
              <button v-if="ButtonB" @click="$router.back()" class="btn btn-dark text-warning">
                BACK
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

.stars {
  display: flex;
}

.vote_stars {
  cursor: pointer;
  margin: 5px;
}
</style>