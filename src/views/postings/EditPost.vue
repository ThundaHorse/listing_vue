<template>
  <div class="editPost">
    <h1>Placeholder</h1>
    <br />
    <div class="card bg-dark text-light mr-audo ml-auto mb-3">
      <div class="container">
        <form v-on:submit.prevent="submit()">
          <div class="form-group">
            <label for="itemName">Name</label>
            <input
              class="form-control"
              type="text"
              v-model="editedInfo.name"
              :placeholder="item.name"
            />
            <label for="itemDesc">Description</label>
            <input
              class="form-control"
              type="text"
              v-model="editedInfo.description"
              :placeholder="item.description"
            />
            <label for="itemPrice">Price</label>
            <input
              class="form-control"
              type="decimal"
              v-model="editedInfo.price"
              :placeholder="item.price"
            />
          </div>
          <div class="form-group">
            <label for="itemImages">Images</label>
            <br />
            <input type="file" v-on:change="setFile($event)" ref="fileInput" multiple />
          </div>
          <div class="form-group">
            <input class="btn btn-primary btn-round" type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      item: [],
      editedInfo: {
        price: "",
        description: "",
        name: "",
        images: []
      },
      form: new FormData()
    };
  },
  created: function() {
    let itemFetch = axios.get("/api/items/" + this.$route.params.id);
    itemFetch.then(response => {
      this.item = response.data;
    });
  },
  methods: {
    setFile: function(event) {
      let files = event.target.files;
      for (let file of files) {
        this.form.append("photos[]", file);
      }
    },
    submit: function() {
      this.form.append("listing_id", this.item.listing_id);
      this.form.append("name", this.editedInfo.name);
      this.form.append("description", this.editedInfo.description);
      this.form.append("price", this.editedInfo.price);
      axios
        .patch("/api/items/" + this.item.id, this.form)
        .then(response => {
          this.createdItem = response.data;
          this.editedInfo.name = "";
          this.editedInfo.description = "";
          this.editedInfo.price = "";
          this.editedInfo.images = [];
          this.$refs.fileInput.value = "";
        })
        .catch(errors => {
          this.errors = errors.response.data.errors;
        });
    }
  }
};
</script>