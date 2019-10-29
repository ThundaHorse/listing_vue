<template>
  <div class="showPosting">
    <div v-for="item in items" :key="item.price">
      <button
        @click.prevent="editPost(item.id)"
        class="btn btn-round btn-warning"
        id="editPost"
        v-if="showButton"
      >Edit</button>
      <button
        @click.prevent="deletePost(item.id)"
        class="btn btn-round btn-danger"
        id="deletePost"
        v-if="showButton"
      >Delete</button>
      {{ item.id }}
      <h1 id="itemName">{{ item.name }}</h1>
      <div v-for="image in item.photos" :key="image.id" class="images">
        <img class="productImage" v-bind:src="image.img" v-bind:alt="image.id" />
      </div>
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
.productImage {
  width: 40%;
  height: auto;
}
button#deletePost {
  float: right;
  margin-right: 10px;
}
button#editPost {
  float: right;
  margin-right: 20px;
}
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
      items: [],
      showButton: false
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
    if (localStorage.getItem("jwt")) {
      this.showButton = true;
    }
  },
  methods: {
    deletePost(input) {
      var deleteListing = axios.delete(
        "/api/listings/" + this.$route.params.id
      );
      var deleteItem = axios.delete("/api/items/" + input);
      axios.all([deleteListing, deleteItem]).then(
        axios.spread(function(first, second) {
          alert("Posting deleted successfully");
        })
      );
      this.$router.push("/postings");
    },
    editPost(input) {
      this.$router.push("/edit/" + input);
    }
  }
};
</script>