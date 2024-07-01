<script>
import { state } from "../state";
import axios from "axios";

export default {
  name: "ReviewForm",
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
      first_name: "",
      last_name: "",
      email: "",
      review_text: "",
      loading: false,
      success: false,
      errors: false,
    };
  },
  methods: {
    sendReview() {
      this.loading = true;

      const data = {
        doctor_profile_id: this.doctor_profile_id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        review_text: this.review_text,
      };

      console.log(data, this.url);

      axios
        .post(this.url, data)
        .then((response) => {
          console.log(response);
          console.log(response.data);
          console.log(response.data.errors);
          if (response.data.success) {
            // show success message
            (this.errors = ""), (this.first_name = "");
            this.last_name = "";
            this.email = "";
            this.review_text = "";
            this.success = response.data.message;
            this.loading = false;
          } else {
            // get errors
            this.errors = response.data.errors;
            console.log(this.errors);
            this.loading = false;
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validation() {
      const forms = document.querySelectorAll(".needs_validation");

      Array.from(forms).forEach((form) => {
        form.addEventListener(
          "submit",
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
              console.log("error");
              this.loading = false;
            }

            form.classList.add("was-validated");
          },
          false
        );
      });
    },
  },
  mounted() {
    this.validation();
  },
};
</script>

<template>
  <div class="review_form position-relative">
    <div class="shadow-lg rounded-4 p-4">
      <h3 class="fs-1 text_primary mb-4 text-center">
        <i class="fa-solid fa-comment-dots" style="color: #ff725e"></i>
        Leave a review
      </h3>

      <div class="card-body bg-light rounded-4 p-4">
        <template v-if="success">
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
            <strong>Review sent!</strong>
            <!-- <br />
            <span>Review sent!</span> -->
          </div>
        </template>

        <template v-if="errors">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
            <strong class="">Errors</strong>
            <!-- <ul class="list-unstyled">
              <li class="text-danger" v-for="error in errors">
                <span class="">{{ error[0] }}</span>
              </li>
            </ul> -->

            <p>Fields with (*) are required</p>
          </div>
        </template>

        <form class="row g-3 needs_validation" @submit.prevent="sendReview()" novalidate>
          <div class="col-12 col-md-6 form-floating">
            <input
              required
              :disabled="success"
              type="text"
              class="form-control"
              id="first_name"
              placeholder="Mario"
              :class="{ 'is-invalid': errors.first_name }"
              v-model="first_name"
            />
            <label class="ms-2" for="first_name">First name *</label>
            <small id="helpId" class="form-text text-muted"
              >Type your first name here
            </small>
          </div>

          <div class="col-12 col-md-6 form-floating">
            <input
              required
              :disabled="success"
              type="text"
              class="form-control"
              id="last_name"
              placeholder="Rossi"
              :class="{ 'is-invalid': errors.last_name }"
              v-model="last_name"
            />
            <label class="ms-2" for="last_name">Last name *</label>
            <small id="helpId" class="form-text text-muted"
              >Type your last name here
            </small>
          </div>

          <div class="col-12 form-floating">
            <input
              required
              :disabled="success"
              type="email"
              class="form-control"
              id="email"
              placeholder="mariorossi@example.it"
              :class="{ 'is-invalid': errors.email }"
              v-model="email"
            />
            <label class="ms-2" for="email">Email *</label>
            <small id="emailHelpId" class="form-text text-muted"
              >Insert your email here
            </small>
          </div>

          <div class="col-12 form-floating">
            <textarea
              required
              :disabled="success"
              class="form-control"
              placeholder="Leave a review here"
              id="review_text"
              rows="6"
              style="height: 100px"
              :class="{ 'is-invalid': errors.review_text }"
              v-model="review_text"
            ></textarea>
            <label class="ms-2" for="review_text">Your review *</label>
            <small id="messageHelpId" class="form-text text-muted"
              >Write here what you want to tell me
            </small>
          </div>

          <div class="col-md-12 mt-5 row text-danger">
            <p>( <span class="text-dark">*</span> ) Required fields.</p>
          </div>

          <div class="col-12 d-flex justify-content-center align-items-center">
            <button
              type="submit"
              class="btn btn-primary btn_review"
              :disabled="loading || success"
            >
              {{ loading ? "Sending review..." : "Send review" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn_review {
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

.review_form_title {
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 400px;
  height: 100px;
  background-color: var(--primary);
  background-image: linear-gradient(to top, var(--primary) 0%, var(--tertiary) 100%);

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
