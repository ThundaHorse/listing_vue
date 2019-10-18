<template>
  <div class="userPosts">
    <h1>Your listings</h1>
    <div v-for="(post, index) in posts" :key="index">
      <a id="postLink" @click.prevent="postPage(post.id)">{{post.id}}. {{ post.title }}</a>
      <div v-for="item in post.items" :key="item.name">
        {{ item.name }}
        <br />
      </div>
      <hr />
    </div>
  </div>
</template>

<style scoped>
a#postLink {
  cursor: pointer;
}
a#postLink:hover {
  color: rgb(29, 127, 188);
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      posts: []
    };
  },
  created: function() {
    axios.get("/api/user_listings").then(response => {
      this.posts = response.data;
    });
  },
  methods: {
    postPage(input) {
      this.$router.push("/postings/" + input);
    }
  }
};
</script>