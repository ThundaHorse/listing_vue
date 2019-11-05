<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <form v-on:submit.prevent="submit()">
            <h1>Login</h1>
            <ul>
              <li class="text-danger" v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" id="email" class="form-control" v-model="email" />
            </div>
            <div class="form-group">
              <label>Password:</label>
              <input type="password" id="password" class="form-control" v-model="password" />
            </div>
            <input type="submit" id="loginButton" class="btn btn-primary" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
      this.$router.push("/");
    }
  }
};
</script>