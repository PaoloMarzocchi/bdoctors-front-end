<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      routeBack: '',
    }
  },
  created() {
    this.routeBack = this.$router.options.history.state.back
  },
  mounted() {
    //console.log(this.$router.options.history.state.back);
  },
}
</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container d-flex justify-content-between">

      <img width="80" class="img-fluid mw-100" src="/img/logo.png" alt="">

      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
          <li class="nav-item" :class="$route.name == 'home' ? 'active' : ''">
            <RouterLink class="nav-link" :to="{ name: 'home' }" href="#" aria-current="page">
              Home
            </RouterLink>
          </li>
          <li class="nav-item">
            <a class="nav-link" target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:8000/login">
              Sign-in
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<style></style>
