<script>
export default {
  name: "AppFooter",
  data() {
    return {
      servicesLinks: [
        "Privacy and Cookies",
        "About Us",
        "Contact Us",
        "Careers",
        "Terms of Service",
        "Press Office",
        "How We Rank Results",
        "Events",
      ],
      patientsLinks: [
        "Doctors",
        "General Practitioners",
        "Facilities",
        "Ask the Doctor",
        "Services",
        "Conditions",
        "FAQ",
        "Mobile App",
      ],
      doctorsLinks: [
        "Prices",
        "Healthcare Professionals Area",
        "Free Resources",
        "Support Center for Professionals",
      ],
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<template>
  <footer class="mt-5 grad">
    <div
      class="text-warning py-5 d-flex flex-column align-items-center text-center"
      @click="scrollToTop"
    >
      <span
        ><strong><i class="fa-solid fa-chevron-up"></i></strong
      ></span>
      <span><strong class="color_primary">UP</strong></span>
    </div>
    <div class="container d-flex justify-content-between">
      <div>
        <ul>
          <h5 class="color_primary">Services</h5>
          <li v-for="link in servicesLinks">
            <a href="#">{{ link }}</a>
          </li>
        </ul>
      </div>

      <div>
        <ul>
          <h5 class="color_primary">For the patients</h5>
          <li v-for="link in patientsLinks">
            <a href="#">{{ link }}</a>
          </li>
        </ul>
      </div>

      <div>
        <ul>
          <h5 class="color_primary">For the doctors</h5>
          <li v-for="link in doctorsLinks">
            <a href="#">{{ link }}</a>
          </li>
        </ul>
      </div>

      <div>
        <ul>
          <li>
            <img
              width="100"
              class="img-fluid mw-100 pb-3"
              src="/img/logo-transparent.png"
              alt=""
            />
          </li>
          <li>
            <a class="" href="#">
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-twitter"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-linkedin"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="py-3 text-center">
      <div class="text-white">Made by Boolean team #4 class 119</div>
      <div class="text-white">All rights reserved &copy;</div>
    </div>
  </footer>
</template>

<style scoped>
.color_primary {
  color: #f77b02;
}

.grad {
  background-image: linear-gradient(rgba(255, 0, 0, 0), rgba(47, 116, 146));
}

span {
  cursor: pointer;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: underline;
  }

  i {
    padding: 5px;
  }
}
</style>
