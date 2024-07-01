<script>
import axios from "axios";
import { state } from "../state.js";
import { RouterLink, RouterView } from "vue-router";
import ReviewForm from "../components/ReviewForm.vue";
import MessageForm from "../components/MessageForm.vue";
import DoctorContacts from "../components/DoctorContacts.vue";
import DoctorServices from "../components/DoctorServices.vue";
import DoctorReviews from "../components/DoctorReviews.vue";
import VoteForm from "../components/VoteForm.vue";

export default {
  name: "SingleDoctorProfile",
  components: {
    ReviewForm,
    MessageForm,
    DoctorContacts,
    DoctorServices,
    DoctorReviews,
    VoteForm,
  },
  data() {
    return {
      state,
      success: "",
      ButtonA: false,
      ButtonB: false,
      vote: "",
      votes: [],
      reviews: [],
      loading: false,
      sumVote: null,
      avgVote: null,
      sumReview: null,
      avgReview: null,
    };
  },

  methods: {
    getDoctor(url) {
      axios.get(url).then((response) => {
        this.doctorProfile = response.data.doctor;
        this.votes = response.data.doctor.votes;
        this.reviews = response.data.doctor.reviews;

        for (let i = 0; i < this.votes.length; i++) {
          this.sumVote += this.votes[i].vote;
        }

        this.avgVote = this.sumVote / this.votes.length;

        /*         console.log(this.doctorProfile)
                console.log(typeof this.votes, this.votes)
                console.log(typeof this.reviews, this.reviews) */

        if (response.data.success) {
          this.success = response.data.success;
          this.project = response.data.doctor;
        } else {
          this.$router.push({ name: "notFound" });
        }
      });
    },
  },

  mounted() {
    window.onload = function () {
      window.scrollTo(0, 0);
    };

    let url =
      this.state.base_url + this.state.doctors_url + "/" + this.$route.params.slug;
    this.getDoctor(url);

    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("source");

    if (source === "back-end") {
      this.ButtonA = true;
    } else {
      this.ButtonB = true;
    }
  },
};
</script>

<template>
  <div>
    <main>
      <template v-if="this.success">
        <div class="container py-3">
          <div class="row">
            <div class="col-12 col-lg-6 d-flex flex-column gap-4">
              <div class="card doc_profile shadow-lg rounded-4 mt-5 border-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 col-sm-4 text-center text-sm-start">
                      <div class="doc_photo mx-auto mx-sm-0">
                        <template v-if="!this.doctorProfile.photo">
                          <img class="img-fluid" src="/img/doc_avatar.png" alt="" />
                        </template>

                        <template v-else="this.doctorProfile.photo.startsWith('uploads')">
                          <img
                            class="img-fluid"
                            :src="
                              this.state.base_url + '/storage/' + this.doctorProfile.photo
                            "
                            alt=""
                          />
                        </template>
                      </div>
                    </div>

                    <div class="col-12 col-sm-8 mt-3 mt-sm-0">
                      <div
                        class="doc_info d-flex flex-column justify-content-center gap-3"
                      >
                        <div class="doc_name">
                          <h3 class="fs-1">
                            Dr {{ this.doctorProfile.surname }}
                            {{ this.doctorProfile.user.name }}
                          </h3>
                        </div>

                        <div>
                          <span>
                            <template v-for="i in 5" :key="i">
                              <i
                                v-if="i <= this.avgVote"
                                class="text_primary fa-solid fa-star"
                              ></i>
                              <i v-else class="text_primary fa-regular fa-star"></i>
                            </template>
                          </span>

                          <!-- <span>
                            ({{ this.reviews.length }})
                          </span> -->
                        </div>

                        <div>
                          <strong>Specializations: </strong>
                          <br />
                          <span
                            v-for="spec in this.doctorProfile.specializations"
                            class="badge bg_primary text-white mx-1"
                          >
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
                    <button
                      class="nav-link active"
                      id="contacts-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contacts-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="contacts-tab-pane"
                      aria-selected="true"
                    >
                      Contacts
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="services-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#services-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="services-tab-pane"
                      aria-selected="false"
                    >
                      Services
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link"
                      id="reviews-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#reviews-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="reviews-tab-pane"
                      aria-selected="false"
                    >
                      Reviews ({{ this.reviews.length }})
                    </button>
                  </li>
                </ul>

                <!-- Tabs content -->
                <div class="tab-content" id="myTabContent">
                  <!-- Contacts tab -->
                  <div
                    class="tab-pane fade show active"
                    id="contacts-tab-pane"
                    role="tabpanel"
                    aria-labelledby="contacts-tab"
                    tabindex="0"
                  >
                    <DoctorContacts
                      :address="this.doctorProfile.address"
                      :telephone="this.doctorProfile.telephone"
                      :email="this.doctorProfile.user.email"
                    />
                  </div>

                  <!-- Services tab -->
                  <div
                    class="tab-pane fade"
                    id="services-tab-pane"
                    role="tabpanel"
                    aria-labelledby="services-tab"
                    tabindex="0"
                  >
                    <DoctorServices :services="this.doctorProfile.services" />
                  </div>

                  <!-- Reviews tab -->
                  <div
                    class="tab-pane fade"
                    id="reviews-tab-pane"
                    role="tabpanel"
                    aria-labelledby="reviews-tab"
                    tabindex="0"
                  >
                    <DoctorReviews :reviews="this.doctorProfile.reviews" />
                  </div>
                </div>
              </div>

              <!-- Vote doctor -->
              <VoteForm
                :doc_id="this.doctorProfile.id"
                :doc_name="this.doctorProfile.user.name"
                :doc_surname="this.doctorProfile.surname"
              />
            </div>

            <div class="col-12 col-lg-6 d-flex flex-column gap-4">
              <MessageForm :doc_id="this.doctorProfile.id" />
              <ReviewForm :doc_id="this.doctorProfile.id" />
            </div>
            <!-- Navigation button -->
            <div class="actions mt-4 d-flex justify-content-center align-items-center">
              <a
                v-if="ButtonA"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn_back"
                href="http://127.0.0.1:8000/dashboard"
              >
                Dashboard
              </a>
              <button v-if="ButtonB" @click="$router.back()" class="btn btn_back">
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
    font-size: 0.9rem;
  }

  .nav-link {
    color: #2d2d2d;

    &.active {
      background-image: linear-gradient(to top, #fff 0%, var(--primary) 90%);
      color: #2d2d2d;
    }
  }
}

.btn_back {
  border: none;
  padding: 0.9rem 2rem;
  letter-spacing: 0.05rem;
  font-weight: 700;
  font-size: 17px;
  border-radius: 500px;
  color: #fff;
  background-color: var(--primary);
  transition: all ease-in-out 0.3s;
}
</style>
