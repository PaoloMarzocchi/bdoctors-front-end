<script>
import { state } from '../state';
import axios from "axios";

export default {
  name: 'ReviewForm',
  props: {
    doc_id: Number,
  },
  data() {
    return {
      state,

      // API varaibles
      url: state.base_url + state.send_review_url,

      // Form variables
      doctor_profile_id: this.doc_id,
      first_name: '',
      last_name: '',
      email: '',
      review_text: '',
      loading: false,
      success: false,
      errors: false
    }
  },
  methods: {

    sendReview() {
      this.loading = true;

      const data = {
        doctor_profile_id: this.doctor_profile_id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        review_text: this.review_text
      }

      console.log(data, this.url);

      axios.post(this.url, data)
        .then(response => {
          console.log(response);

          if (response.data.success) {

            // show success message
            this.first_name = '';
            this.last_name = '';
            this.email = '';
            this.review_text = '';
            this.success = response.data.message;

          } else {

            // get errors
            this.errors = response.data.errors
            console.log(this.errors);
          }

          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        })

    }
  }
}
</script>

<template>
  <div class="review_form position-relative my-5">
    <div class="shadow-lg rounded-4 p-4">

      <div class="review_form_title rounded-4 position-relative d-flex justify-content-center align-items-center">
        <h2>Leave a review</h2>
      </div>

      <template v-if="success">
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          <strong>Thank you!</strong>
          <br>
          <span>Your review has been sent!</span>
        </div>
      </template>

      <template v-if="errors">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          <strong class="">Errors</strong>
          <ul class="list-unstyled ">
            <li class="text-danger " v-for="error in errors">
              <span class="">{{ error[0] }}</span>
            </li>
          </ul>
        </div>
      </template>

      <form class="row g-3" @submit.prevent="sendReview()">

        <div class="col-12 col-md-6 form-floating has-validation">
          <input type="text" class="form-control" id="first_name" placeholder="Mario"
            :class="{ 'is-invalid': errors.first_name }" v-model="first_name">
          <label class="ms-2" for="first_name">First name</label>
        </div>

        <div class="col-12 col-md-6 form-floating has-validation">
          <input type="text" class="form-control" id="last_name" placeholder="Rossi"
            :class="{ 'is-invalid': errors.last_name }" v-model="last_name">
          <label class="ms-2" for="last_name">Last name</label>
        </div>

        <div class="col-12 form-floating has-validation">
          <input type="email" class="form-control" id="email" placeholder="mariorossi@example.it"
            :class="{ 'is-invalid': errors.email }" v-model="email">
          <label class="ms-2" for="email">Email</label>
        </div>

        <div class="col-12 form-floating has-validation">
          <textarea class="form-control" placeholder="Leave a review here" id="review_text" rows="6"
            style="height: 100px" :class="{ 'is-invalid': errors.review_text }" v-model="review_text"></textarea>
          <label class="ms-2" for="review_text">Your review</label>
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary btn_review" :disabled="loading">
            {{ loading ? 'Sending review...' : 'Send review' }}
          </button>
        </div>

      </form>
    </div>
  </div>

</template>

<style scoped>
.btn_review {
  position: relative;

  background-color: #f77b02;
  background-image: linear-gradient(to top, #f77b02 0%, #ffc107 100%);
  border: #04befe;
  transition: background-image 0.5s linear;
  z-index: 1;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f77b02;
    background-image: linear-gradient(to left, #f77b02 0%, #ffc107 100%);
    border-color: #04befe;
    border-radius: inherit;
    z-index: -1;
    transition: opacity 0.3s linear;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1
  }
}

.review_form_title {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 400px;
  height: 140px;
  background-color: #f77b02;
  background-image: linear-gradient(to top, #f77b02 0%, #ffc107 100%);

  h2 {
    font-weight: bold;
    color: #fff;
    font-size: 2rem;
  }
}
</style>