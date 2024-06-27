<script>
import router from "../router";

export default {
  name: "AppHeader",
  data() {
    return {
      routeBack: "",
      ButtonA: false,
      ButtonB: false,
    };
  },

  created() {
    this.routeBack = this.$router.options.history.state.back;
    // this.currentRoute =
  },

  mounted() {
    //console.log(this.$router.options.history.state.back);
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
  <nav class="navbar navbar-expand-sm navbar-light">
    <div class="container d-flex justify-content-between rounded-5 px-5">
      <img width="80" class="img-fluid mw-100" src="/img/logo-transparent.png" alt="" />

      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse nav_elements" id="collapsibleNavId">
        <ul class="navbar-nav gap-2 ms-auto d-flex align-items-center mt-2 mt-lg-0 me-1">
          <li class="nav-item px-2 rounded-4" v-if="this.ButtonA">
            <a class="nav-link" target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:8000/logout/">
              Log-out
            </a>
          </li>
          <li class="nav-item px-2 rounded-4" v-if="this.ButtonB">
            <a class="nav-link" target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:8000/login">
              Sign-in
            </a>
          </li>
          <li class="nav-item px-2 rounded-4" :class="$route.name == 'home' ? 'my_active' : ''">
            <RouterLink class="nav-link nav_element" :to="{ name: 'home' }" href="#" aria-current="page">
              Home
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.my_active {
  font-weight: bold;
  border: 2px solid var(--secondary);

  &>a {
    color: var(--secondary);
  }
}

nav {
  position: absolute;
  top: 0;
  width: 100%;
  /* background-image: url('/img/bg_doctors.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover; */
  background-color: transparent;

  .container {
    .nav_elements {
      background-color: transparent;

      & ul {
        background-color: transparent !important;

        &li {
          background-color: transparent !important;

          .nav-link.nav-element {
            background-color: transparent !important;
            border-radius: 20px;
          }
        }
      }
    }
  }
}
</style>
