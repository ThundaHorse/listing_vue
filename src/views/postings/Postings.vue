<template>
  <div class="listings">
    <div v-if="listings[0] !== undefined">
      <hr />
      <h1>Listings</h1>
      <hr />
      <div id="posts">
        <div v-for="(post, index) in listings" :key="index">
          <hr />
          <a
            class="posting"
            @click.prevent="postPage(post)"
            style="cursor: pointer;"
          >{{ post.title }}</a>
          <br />
          <hr />
        </div>
      </div>
    </div>
    <div v-else>
      <h1>You have no listings!</h1>
    </div>
  </div>
</template>

<style>
div#posts {
  overflow-y: scroll;
}
div#posts::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import axios from "axios";

export default {
  name: "postings",
  data: function() {
    return {
      listings: [],
      items: []
    };
  },
  created: function() {
    if (localStorage.getItem("jwt")) {
      axios.get("/api/listings").then(response => {
        this.listings = response.data;
      });
    } else {
      alert("Sign in to view your listings!");
      this.$router.push("/login");
    }
  },
  methods: {
    postPage(input) {
      this.$router.push("/postings/" + input.id);
    }
  }
};
</script>