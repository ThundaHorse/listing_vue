<template>
  <div class="showPosting">
    <h1>Show</h1>
    {{ listing }}
    <br />
    <hr />
    <MessageBox />
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import MessageBox from "../../components/MessagesBox";

export default {
  components: {
    MessageBox
  },
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