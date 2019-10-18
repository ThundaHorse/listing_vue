<template>
  <div class="home">
    <br />
    <div v-if="userSignedIn === true">
      <h1>Welcome {{firstName}} {{lastName}}</h1>
    </div>
    <div v-else>
      <h1>Test</h1>
    </div>
    <p>Test page</p>
  </div>
</template>

<script>
import MessagesBox from "../components/MessagesBox";
import axios from "axios";

export default {
  name: "home",
  components: {
    // MessagesBox
  },
  data: function() {
    return {
      firstName: "",
      lastName: "",
      userSignedIn: false
    };
  },
  created: function() {
    axios
      .get("/api/users/" + localStorage.getItem("user_id"))
      .then(response => {
        if (localStorage.getItem("jwt")) {
          this.userSignedIn = true;
          this.firstName = response.data.first_name;
          this.lastName = response.data.last_name;
        }
      });
  }
};
</script>
