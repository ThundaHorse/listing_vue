<template>
  <div class="showPosting">
    <h1>Show</h1>
    {{ listing }}
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      listing: []
    };
  },
  created: function() {
    axios.get("/api/listings/" + this.$route.params.id).then(response => {
      this.listing = response.data;
    });
  },
  methods: {}
};
</script>