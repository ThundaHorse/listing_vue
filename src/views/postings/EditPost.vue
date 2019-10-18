<template>
  <div class="editPost">
    <h1>Placeholder</h1>
    {{ item.id }} •
    {{ item.listing_id }}
    <br />
    <form v-on:submit.prevent="submit()">
      <label for="editedInfo.name">Name:</label>
      <input type="text" v-model="editedInfo.name" />
      <br />
      <label for="editedInfo.description">Description:</label>
      <br />
      <textarea type="text" v-model="editedInfo.description" />
      <br />
      <label for="editedInfo.price">Price:</label>
      <input type="decimal" v-model="editedInfo.price" />
      <br />
      <label for="editedInfo.images">Images</label>
      <input type="file" v-on:change="setFile($event)" ref="fileInput" multiple />
      <br />
      <input type="submit" value="submit" class="btn btn-round btn-info" />
    </form>
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
    axios.get("/api/items/" + this.$route.params.id).then(response => {
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