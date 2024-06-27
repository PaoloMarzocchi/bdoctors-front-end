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
  <header class="w-100 navbar navbar-expand-sm bg_primary z-3" :class="$route.name != 'home' ? 'my_shadow' : ''">
    <div class="container d-flex justify-content-between rounded-5 px-5">
      <img width="50" class="img-fluid mw-100 me-4" src="/img/logo-header.png" alt="" />

      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse nav_elements" id="collapsibleNavId">
        <ul class="navbar-nav gap-2 d-flex w-100 align-items-center justify-content-between mt-2 mt-lg-0 me-1">
          <li class="nav-item px-1 rounded-2" :class="$route.name == 'home' ? 'my_active' : ''">
            <RouterLink class="nav-link nav_element text-white" :to="{ name: 'home' }" href="#" aria-current="page">
              Home
            </RouterLink>
          </li>

          <li class="nav-item ms-auto" v-if="this.ButtonA">
            <button class="my_button_light py-0 px-3">
              <a class="nav-link" target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:8000/logout/">
                Log-out
              </a>
            </button>
          </li>
          <li class="nav-item " v-if="this.ButtonB">
            <button class="my_button_light py-0 px-3">
              <a class="nav-link" target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:8000/login">
                Sign-in
              </a>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.my_shadow {
  box-shadow: 0px 2px 10px 0px var(--dark-1-active);
  padding-bottom: 0.5rem;
}

.my_active {
  font-weight: bold;

  a::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: var(--light-3);
    bottom: 0;
    left: 0;
  }
}

nav {
  position: absolute;
  top: 0;
  width: 100%;

}

.nav-item {
  a {
    position: relative;
  }

  a::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    background-color: var(--light-3);
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform .3s ease-in-out;
  }

  a:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }
}
</style>
