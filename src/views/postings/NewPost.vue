<template>
  <div class="newPost">
    <h1>New Post</h1>
    <form v-on:submit.prevent="createListing()">
      Description:
      <input type="text" v-model="newItem.description" />
      <br />Name:
      <input type="text" v-model="newItem.name" />
      <br />Price:
      <input type="decimal" v-model="newItem.price" />
      <br />Title:
      <input type="text" v-model="newItem.title" />
      <br />Image:
      <input type="file" v-on:change="setFile($event)" ref="fileInput" />
      <br />
      <br />
      <input class="btn btn-primary btn-round" type="submit" value="submit" />
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
        price: "",
        title: "",
        image: ""
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
    },
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
      formData.append("listing_id", this.newItem.listing_id);
      formData.append("name", this.newItem.name);
      formData.append("description", this.newItem.description);
      formData.append("price", this.newItem.price);
      formData.append("title", this.newItem.title);
      formData.append("image", this.newItem.image);

      axios.post("/api/items", formData).then(response => {
        this.newItem = "";
      });
      //   axios.post("http://localhost:3000/api/posts", formData).then(response => {
      //     this.title = "";
    }
  }
};
</script>