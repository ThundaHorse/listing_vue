<template>
  <div class="newPost">
    <h1>New Post</h1>
    <form v-on:submit.prevent="createListing()">
      <br />Description:
      <input type="text" v-model="newItem.description" />
      Name:
      <input type="text" v-model="newItem.name" />
      Price:
      <input type="decimal" v-model="newItem.price" />
      <input type="submit" value="submit" />
    </form>
    <br />Created Items:
    <div v-for="created in createdItem" :key="created.name">{{ created }}</div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newItem: {
        listing_id: "",
        name: "",
        description: "",
        price: ""
      },
      createdItem: []
    };
  },
  created: function() {},
  methods: {
    createListing() {
      axios.post("/api/listings").then(response => {
        this.newItem.listing_id = response.data.id;
        this.createItem();
      });
    },
    createItem() {
      var params = this.newItem;
      axios.post("/api/items", params).then(response => {
        this.createdItem = response.data;
      });
    }
  }
};
</script>