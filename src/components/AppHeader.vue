<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      routeBack: '',
      ButtonA: false,
      ButtonB: false,
    }
  },
  created() {
    this.routeBack = this.$router.options.history.state.back
  },
  mounted() {
    //console.log(this.$router.options.history.state.back);
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');

    if (source === 'back-end') {
      this.ButtonA = true;
      //console.log("A " + this.ButtonA);
    } else {
      this.ButtonB = true;
      //console.log("B " + this.ButtonB);
    }
  },
}
</script>

<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-secondary">
    <div class="container d-flex justify-content-between rounded-5 px-5 border border-warning">

      <img width="80" class="img-fluid mw-100 rounded-5" src="/img/logo.png" alt="">

      <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav ms-auto d-flex align-items-center mt-2 mt-lg-0 me-1">
          <li class="nav-item px-2">
            <RouterLink class="nav-link" :class="$route.name == 'home' ? 'my_active' : ''" :to="{ name: 'home' }"
              href="#" aria-current="page">
              Home
            </RouterLink>

          </li>
          <li class="nav-item" v-if="this.ButtonA">
            <a class="nav-link" target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:8000/logout/">
              Log-out
            </a>
          </li>
          <li class="nav-item" v-if="this.ButtonB">
            <a class="nav-link" target="_blank" rel="noopener noreferrer" href="http://127.0.0.1:8000/login">
              Sign-in
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<style scoped>
.my_active {
  color: #ffc107;
  border-bottom: 4px double #ffc107;
}
</style>
