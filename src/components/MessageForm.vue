<script>
import { state } from '../state';
import axios from "axios";

export default {
  name: 'MessageForm',
  props: {
    doc_id: Number,
  },
  data() {
    return {
      state,

      // API varaibles
      url: state.base_url + state.send_message_url,

      // Form variables
      doctor_profile_id: this.doc_id,
      sender_first_name: '',
      sender_last_name: '',
      email: '',
      message: '',
      sender_first_nameError: '',
      sender_last_nameError: '',
      emailError: '',
      messageError: '',
      loading: false,
      success: false,
      errors: false
    }
  },
  methods: {

    sendMessage() {
      this.loading = true;

      const data = {
        doctor_profile_id: this.doctor_profile_id,
        sender_first_name: this.sender_first_name,
        sender_last_name: this.sender_last_name,
        email: this.email,
        message_text: this.message,
      };

      console.log(data, this.url);

      axios.post(this.url, data)
        .then(response => {
          console.log(response);
          console.log(response.data.errors);

          if (response.data.success) {
            this.sender_first_name = '',
              this.sender_last_name = '',
              this.email = '',
              this.message = '',
              this.success = response.data.message;
          } else {
            this.firstNameError = response.data.errors.sender_first_name,
              this.lastNameError = response.data.errors.sender_last_name,
              this.emailError = response.data.errors.email,
              this.messageError = response.data.errors.message_text;
          }

          this.loading = false;

        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<template>
  <div class="message_form position-relative my-5">
    <div class="shadow-lg rounded-4 p-4">

      <div class="message_form_title rounded-4 position-relative d-flex justify-content-center align-items-center">
        <h2>Leave a message</h2>
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

      <form @submit.prevent="sendMessage()" class="row g-3">

        <div class="col-12 col-md-6 form-floating">
          <input type="text" class="form-control" id="sender_first_name" aria-describedby="helpId"
            placeholder="Your first name here" v-model="sender_first_name" />

          <label for="sender_first_name" class="ms-2">First Name *</label>

          <p class="text-danger mt-3" v-show="this.sender_first_nameError">
            {{ this.sender_first_nameError }}
          </p>
          <small id="helpId" class="form-text text-muted">Type your first name here <i
              class="fa-solid fa-arrow-up"></i></small>

        </div>

        <div class="col-12 col-md-6 form-floating">
          <input type="text" class="form-control" name="sender_last_name" id="sender_last_name"
            aria-describedby="helpId" placeholder="Your last name here" v-model="sender_last_name" />
          <label for="sender_last_name" class="ms-2">Last Name *</label>

          <p class="text-danger mt-3" v-show="this.sender_last_nameError">
            {{ this.sender_last_nameError }}
          </p>
          <small id="helpId" class="form-text text-muted">Type your last name here <i
              class="fa-solid fa-arrow-up"></i></small>

        </div>

        <div class="col-12 form-floating">
          <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelpId"
            placeholder="abc@mail.com" v-model="email" />
          <label for="email" class="ms-2">Email *</label>

          <p class="text-danger mt-3" v-show="this.emailError">
            {{ this.emailError }}
          </p>
          <small id="emailHelpId" class="form-text text-muted">Insert your email here <i
              class="fa-solid fa-arrow-up"></i></small>

        </div>

        <div class="col-12 form-floating">
          <textarea class="form-control" placeholder="Leave a message here" name="message" id="message" rows="10"
            style="height: 100px" v-model="message"></textarea>
          <label for="message" class="ms-2">Your message *</label>

          <p class="text-danger mt-3" v-show="this.messageError">
            {{ this.messageError }}
          </p>
          <small id="messageHelpId" class="form-text text-muted">Write here what you want to tell me
            <i class="fa-solid fa-arrow-up"></i></small>

        </div>

        <div class="col-md-12 mt-5 row text-danger">
          <p>( <span class="text-dark">*</span> ) Required fields.</p>
        </div>

        <div class="col-12 d-flex justify-content-center align-items-center">
          <button type="submit" class="btn btn-primary btn_message" :disabled="loading">
            {{ loading ? 'Sending message...' : 'Send message' }}
          </button>
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>
.btn_message {
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

.message_form_title {
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