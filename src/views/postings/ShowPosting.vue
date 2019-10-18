<template>
  <div class="showPosting">
    <!-- <img v-bind:src="items[2].photos[0].img" v-bind:alt="items[2].name" /> -->
    <div v-for="(item, index) in items" :key="index">
      <div v-for="image in item.photos" :key="image.img">
        <img v-bind:src="image.img" v-bind:alt="image" />
      </div>
      <h1 id="itemName">{{ item.name }}</h1>
      <br />
      <p id="itemPrice">{{item.price}}</p>
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
      listing: [],
      items: []
    };
  },
  created: function() {
    axios
      .all([
        axios.get("/api/listings/" + this.$route.params.id),
        axios.get("/api/user_items/" + this.$route.params.id)
      ])
      .then(
        axios.spread((first, second) => {
          this.listing = first.data;
          this.items = second.data;
        })
      );
  },
  methods: {}
};
</script>