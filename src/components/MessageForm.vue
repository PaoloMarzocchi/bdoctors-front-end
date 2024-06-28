<script>
import { state } from "../state";
import axios from "axios";

export default {
  name: "MessageForm",
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
      sender_first_name: "",
      sender_last_name: "",
      email: "",
      message: "",
      sender_first_nameError: "",
      sender_last_nameError: "",
      emailError: "",
      messageError: "",
      loading: false,
      success: false,
      errors: false,
    };
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

      axios
        .post(this.url, data)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.errors);

          if (response.data.success) {
            (this.sender_first_name = ""),
              (this.sender_last_name = ""),
              (this.email = ""),
              (this.message = ""),
              (this.success = response.data.message);
          } else {
            (this.firstNameError = response.data.errors.sender_first_name),
              (this.lastNameError = response.data.errors.sender_last_name),
              (this.emailError = response.data.errors.email),
              (this.messageError = response.data.errors.message_text);
            this.loading = false;
          }

        })
        .catch((err) => {
          console.log(err);
        });
    },

    validation() {

      const forms = document.querySelectorAll('.needs_validation')

      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
    }
  },
  mounted() {
    this.validation();
  }
};
</script>

<template>
  <div class="message_form position-relative mt-5">
    <div class="shadow-lg rounded-4 p-4">
      <div class="d-flex align-items-center justify-content-center">
        <div class="my_form_title p-4">
          <h3 class="fs-1">
            <i class="fa-solid fa-envelope" style="color: #ff725e;"></i>
            Send a message
          </h3>
        </div>
      </div>
      <div class="card-body bg-light rounded-4 p-4">
        <template v-if="success">
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <strong>Message sent!</strong>
            <!-- <br />
            <span></span> -->
          </div>
        </template>

        <template v-if="errors">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <strong class="">Errors</strong>
            <ul class="list-unstyled">
              <li class="text-danger" v-for="error in errors">
                <span class="">{{ error[0] }}</span>
              </li>
            </ul>
          </div>
        </template>

        <form @submit.prevent="sendMessage()" class="row g-3 needs_validation" novalidate>
          <div class="col-12 col-md-6 form-floating">
            <input type="text" class="form-control" id="sender_first_name" aria-describedby="helpId"
              placeholder="Your first name here" v-model="sender_first_name" required :disabled="success" />

            <label for="sender_first_name" class="ms-2">First Name *</label>

            <small id="helpId" class="form-text text-muted">Type your first name here </small>
          </div>

          <div class="col-12 col-md-6 form-floating">
            <input type="text" class="form-control" name="sender_last_name" id="sender_last_name"
              aria-describedby="helpId" placeholder="Your last name here" v-model="sender_last_name" required
              :disabled="success" />
            <label for="sender_last_name" class="ms-2">Last Name *</label>


            <small id="helpId" class="form-text text-muted">Type your last name here </small>
          </div>

          <div class="col-12 form-floating">
            <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelpId"
              placeholder="abc@mail.com" v-model="email" required :disabled="success" />
            <label for="email" class="ms-2">Email *</label>


            <small id="emailHelpId" class="form-text text-muted">Insert your email here </small>
          </div>

          <div class="col-12 form-floating">
            <textarea class="form-control" placeholder="Leave a message here" name="message" id="message" rows="10"
              style="height: 100px" v-model="message" required :disabled="success"></textarea>
            <label for="message" class="ms-2">Your message *</label>

            <small id="messageHelpId" class="form-text text-muted">Write here what you want to tell me </small>
          </div>

          <div class="col-md-12 mt-5 row text-danger">
            <p>( <span class="text-dark">*</span> ) Required fields.</p>
          </div>

          <div class="col-12 d-flex justify-content-center align-items-center">
            <button type="submit" class="btn btn-primary btn_message" :disabled="loading || success">
              {{ loading ? "Sending message..." : "Send message" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn_message {
  position: relative;

  background-color: var(--primary);
  background-image: linear-gradient(to top, var(--primary) 0%, var(--tertiary) 100%);
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
    background-color: var(--primary);
    background-image: linear-gradient(to left, var(--primary) 0%, var(--tertiary) 100%);
    border-color: #04befe;
    border-radius: inherit;
    z-index: -1;
    transition: opacity 0.3s linear;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }
}

.message_form_title {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 400px;
  height: 100px;
  background-color: var(--primary);
  background-image: linear-gradient(to top, var(--primary) 0%, #ffc107 100%);

  h2 {
    font-weight: bold;
    color: #fff;
    font-size: 2rem;
  }
}

.my_form_title {
  font-size: 35px;
  color: var(--primary);
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 30px;

  /* h2 {
    font-weight: bold;
    font-size: 3rem;
  } */
}

/* .my_form_title::before,
.my_form_title::after {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  border-radius: 50%;
  left: -10px;
  bottom: 44%;
  background-color: var(--primary);
}

.my_form_title::before {
  width: 20px;
  height: 20px;
  background-color: var(--primary);
}

.my_form_title::after {
  width: 20px;
  height: 20px;
  animation: pulse 1s linear infinite;
}

@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 1;
  }

  to {
    transform: scale(2);
    opacity: 0;
  }
} */
</style>
