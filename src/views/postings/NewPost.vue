<template>
  <div class="newPost">
    <div v-for="(err, index) in errors" :key="index">{{ err }}</div>
    <h1>New Post</h1>
    {{ createdItem }}
    <form v-on:submit.prevent="submit()">
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
      <!-- Submit function
      <button class="btn btn-info btn-round" v-on:click="submit()">Submit</button>-->
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
      errors: []
    };
  },
  created: function() {},
  methods: {
    createListing() {
      axios.post("/api/listings", this.newListing).then(response => {
        this.newItem.listing_id = response.data.id;
        // this.submit();
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
        // this.image = event.target.files[0];
        this.newItem.image = event.target.files;
        // var files = event.target.files;
        // var output = [];
        // for (var i = 0; i < files.length; i++) {
        //   output.push(files[i]);
        // }
        // this.newItem.image.push(event.target.files);
        // this.newItem.image = output;
      }
    },
    submit: function() {
      // this.createListing();
      // if (!this.createdListing.id) {
      // setTimeout(() => {}, 1000);
      // } else {
      var formData = new FormData();
      // formData.append("listing_id", this.newItem.listing_id);
      formData.append("listing_id", parseInt("1"));
      formData.append("name", this.newItem.name);
      formData.append("description", this.newItem.description);
      formData.append("price", this.newItem.price);
      formData.append("photos", this.newItem.image);

      var params = {
        listing_id: 1,
        name: this.newItem.name,
        description: this.newItem.description,
        price: this.newItem.price,
        photos: this.newItem.image
      };
      axios
        .post("/api/items", params)
        .then(response => {
          this.createdItem = response.data;
          // console.log(this.createdItem);
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
      // }
    }
  }
};
</script>