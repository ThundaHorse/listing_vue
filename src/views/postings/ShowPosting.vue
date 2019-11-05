<template>
  <div class="showPosting">
    <div v-for="item in items" :key="item.price">
      <div v-if="listing.user_id == user">
        <br />
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
      </div>
      <div v-else>
        <br />
        <button
          class="btn btn-round btn-primary"
          id="addToCart"
          @click.prevent="addToCart(item)"
        >Add To Cart</button>
      </div>
      {{ item.id }}
      {{ items }}
      user: {{ listing.user_id }}
      <h1 id="itemName">{{ item.name }}</h1>
      <div class="col-md-12">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators" v-for="(item, index) in item.photos" :key="item.id">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              :class="{active: index == 0}"
            ></li>
          </ol>
          <div class="carousel-inner">
            <div
              class="carousel-item"
              v-for="(image, idx) in item.photos"
              :key="idx"
              :class="{ active: idx == 0 }"
            >
              <img :src="image.img" alt class="productImage" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <br />
      <h1 id="itemPrice">${{item.price}}</h1>
    </div>
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
button#addToCart {
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
      user: localStorage.getItem("user_id")
    };
  },
  computed: {},
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

      if (localStorage.getItem("user_id") === this.listing.user_id) {
        axios.all([deleteListing, deleteItem]).then(
          axios.spread(function(first, second) {
            alert("Posting deleted successfully");
          })
        );
        this.$router.push("/postings");
      }
    },
    editPost(input) {
      this.$router.push("/edit/" + input);
    },
    addToCart(input) {
      var params = {
        item_id: input.id,
        quantity: 1,
        status: 1
      };
      axios.post("/api/carted_products", params).then(response => {
        console.log(response.data);
        alert("Successfully added to cart");
      });
    }
  }
};
</script>