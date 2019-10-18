<template>
  <div class="newPost">
    <div v-for="(err, index) in errors" :key="index">{{ err }}</div>
    <h1>New Post</h1>
    <form v-on:submit.prevent="createListing()">
      Posting Title:
      <input type="text" v-model="newListing.title" />
      <br />Description:
      <input type="text" v-model="newItem.description" />
      <br />Item Name:
      <input type="text" v-model="newItem.name" />
      <br />Price:
      <input type="decimal" v-model="newItem.price" />
      <br />Image:
      <input type="file" v-on:change="setFile($event)" ref="fileInput" multiple />
      <br />Form submit
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
        image: []
      },
      createdItem: [],
      createdListing: [],
      newListing: {
        title: "",
        userId: parseInt(localStorage.getItem("user_id"))
      },
      errors: [],
      form: new FormData()
    };
  },
  created: function() {},
  methods: {
    createListing() {
      axios.post("/api/listings", this.newListing).then(response => {
        this.newItem.listing_id = response.data.id;
        this.submit();
      });
    },
    createItem() {
      var params = this.newItem;
      axios.post("/api/items", params).then(response => {
        this.createdItem = response.data;
      });
    },
    setFile: function(event) {
      let files = event.target.files;
      for (let file of files) {
        this.form.append("photos[]", file);
      }
    },
    submit: function() {
      this.form.append("listing_id", this.newItem.listing_id);
      this.form.append("name", this.newItem.name);
      this.form.append("description", this.newItem.description);
      this.form.append("price", this.newItem.price);
      axios
        .post("/api/items", this.form)
        .then(response => {
          this.createdItem = response.data;
          this.newItem.listing_id = "";
          this.newItem.name = "";
          this.newItem.description = "";
          this.newItem.price = "";
          this.newItem.image = [];
          this.$refs.fileInput.value = "";
        })
        .catch(errors => {
          this.errors = errors.response.data.errors;
        });
    }
  }
};
</script>