<template>
  <div class="showPosting">
    <div id="postinfo" class="container" v-for="(list, index) in listing.items" :key="index">
      <span id="postItem">
        <div id="itemName">• {{ list.name }}</div>
        <div id="itemPrice">${{ list.price }}</div>
        <br />
      </span>
    </div>
    <br />
    <hr />
    <MessageBox />
  </div>
</template>

<style>
span#postItem {
  text-align: left;
}
div#itemName {
  float: left;
}
div#itemPrice {
  float: right;
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