<template>
  <div class="navBar">
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
          <div v-if="loggedIn == true">
            <a
              class="navbar-text"
              href="/cart"
              style="padding-right: 20px;"
            >Your Cart ({{ cartQuantity() }})</a>
            <a class="navbar-text" style="cursor: pointer;" @click.prevent="logOut()">Log Out</a>
          </div>
          <div v-else>
            <a class="navbar-text" href="/login">Log In</a>
          </div>
        </span>
      </div>
    </nav>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import Login from "../views/Login";

export default {
  name: "Navbar",
  data: function() {
    return {
      loggedIn: false,
      quantity: 0,
      items: []
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
      axios.get("/api/carted_products").then(response => {
        this.items = response.data;
      });
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
    },
    cartQuantity: function() {
      return this.items.length;
    },
    logOut: function() {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("jwt");
      this.loggedIn = false;
      this.$router.push("/login");
    }
  }
};
</script>