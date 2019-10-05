<template>
  <div class="postings">
    <h1>Postings</h1>
    <!-- {{ postings }} -->
    <div v-for="(post, index) in postings" :key="index">
      Post #: {{ post.id }}
      <br />
      <p>Products:</p>
      <div v-for="item in post.items" :key="item.name">
        <li>{{ item.name }}, ${{ item.price }}</li>
      </div>
    </div>
    <MessageBox />
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import MessageBox from "../components/MessagesBox";

export default {
  components: {
    MessageBox
  },
  data: function() {
    return {
      postings: [],
      items: []
    };
  },
  created: function() {
    if (localStorage.getItem("jwt")) {
      var itemRequest = axios.get("/api/items");
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
  methods: {}
};
</script>