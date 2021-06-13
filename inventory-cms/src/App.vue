<template>
  <div id="app">
    <div id="nav">
      <!--Navbar-->
      <nav class="navbar navbar-expand-lg navbar-light bg-info">
        <a class="navbar-brand text-white" href="#">Hacktiv Inventory</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link
                v-if="!this.$store.state.login"
                class="nav-link text-white"
                to="/login"
                tabindex="-1"
                >Login</router-link
              >
            </li>
            <li class="nav-item">
              <a
                @click.prevent="logout"
                v-if="this.$store.state.login"
                class="btn nav-link text-white"
                tabindex="-1"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  mounted() {},
};
</script>

<style>
</style>
