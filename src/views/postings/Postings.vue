<template>
  <div class="postings">
    <div v-if="postings[0] !== undefined">
      <hr />
      <h1>Postings</h1>
      <hr />
      <div id="posts">
        <div v-for="(post, index) in postings" :key="index">
          <hr />
          <a
            @click.prevent="postPage(post)"
            style="cursor: pointer;"
          >{{ post.lister.first_name }}'s Post</a>
          <br />
          <hr />
        </div>
      </div>
    </div>
    <div v-else>
      <h1>You have no posts!</h1>
    </div>
  </div>
</template>

<style>
div#posts {
  /* height: 450px; */
  overflow-y: scroll;
}
div#posts::-webkit-scrollbar {
  display: none;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      postings: [],
      items: []
    };
  },
  created: function() {
    if (localStorage.getItem("jwt")) {
      var itemRequest = axios.get("/api/items/");
      var listRequest = axios.get("/api/listings");
      axios.all([itemRequest, listRequest]).then(
        axios.spread((firstResponse, secondResponse) => {
          this.postings = secondResponse.data;
          this.items = firstResponse.data;
        })
      );
    } else {
      alert("Sign in to view your postings and items");
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