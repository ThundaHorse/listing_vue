<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">Home</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/postings">
              Postings
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/newpost">New Post</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/signup">Sign Up</a>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <a class="nav-link" href="/user_listings">Your Listings</a>
          </li>
        </ul>
        <span class="navbar-text">
          <div v-if="loggedIn">
            <a class="navbar-text" href="/cart" style="padding-right: 20px;">Your Cart</a>
            <a class="navbar-text" href="/logout">Log Out</a>
          </div>
          <div v-else>
            <a class="navbar-text" href="/login">Log In</a>
          </div>
        </span>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #3e4954;
  height: 100vh;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data: function() {
    return {
      loggedIn: false
    };
  },
  watch: {
    loggedIn: function() {
      this.checkLoggedIn();
    }
  },
  created: function() {
    if (localStorage.getItem("jwt")) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  },
  methods: {
    checkLoggedIn: function() {
      if (localStorage.getItem("jwt")) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }
  }
};
</script>
