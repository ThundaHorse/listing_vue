<template>
  <div class="home">
    <br />
    <h1>Welcome {{firstName}} {{lastName}}</h1>
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
      lastName: ""
    };
  },
  created: function() {
    axios
      .get("/api/users/" + localStorage.getItem("user_id"))
      .then(response => {
        this.firstName = response.data.first_name;
        this.lastName = response.data.last_name;
      });
  }
};
</script>
