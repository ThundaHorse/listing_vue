<template>
  <div class="showPosting">
    <div id="postinfo" class="container" v-for="(list, index) in listing.items" :key="index">
      <h1 id="itemName">{{ list.name }}</h1>
      <br />
      <p id="itemPrice">{{ list.price }}</p>
      <br />
    </div>
    <br />
    <hr />
    <MessageBox />
  </div>
</template>

<style>
h1#postItem {
  text-align: center;
}
div#postinfo {
  width: 500px;
  height: auto;
  border: solid 2px;
}
div.showPosting {
  overflow-y: scroll;
}
div.showPosting::-webkit-scrollbar {
  display: none;
}
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