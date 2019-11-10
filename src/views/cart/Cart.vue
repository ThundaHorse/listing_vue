<template>
  <div class="cart">
    <h1>Your Cart</h1>
    <div v-if="cart.length == 0">
      <h1>Your cart is currently empty!</h1>
    </div>
    <div v-for="(item, index) in cart" :key="index">
      {{ item.item.id }}
      <a
        style="cursor: pointer;"
        @click.prevent="itemPage(item)"
      >{{ item.quantity }} x {{ item.item.name }} @ ${{ item.item.price }}</a>
      <p @click.prevent="removeItem(item)">Remove</p>
    </div>
    <br />
    <h1>Total</h1>
    <hr />
    <h1>${{total}}</h1>
    <button @click.prevent="createOrder()">Create Order</button>
    <br />
    <br />
    <RecentlyRemoved></RecentlyRemoved>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import RecentlyRemoved from "../../components/RecentlyRemoved";

export default {
  name: "cart",
  components: {
    RecentlyRemoved
  },
  data: function() {
    return {
      cart: [],
      total: 0
    };
  },
  created: function() {
    axios.get("/api/carted_products").then(response => {
      this.cart = response.data;
      if (this.cart[0]) {
        this.total = this.cart[0].total;
      } else {
        this.total = 0;
      }
    });
  },
  methods: {
    itemPage: function(input) {
      this.$router.push("/postings/" + input.item.listing_id);
    },
    removeItem: function(input) {
      axios.delete("/api/carted_products/" + input.id).then(response => {
        console.log("removed");
      });
    },
    createOrder() {
      var params = {
        user_id: parseInt(localStorage.getItem("user_id"))
      };
      axios.post("/api/orders", params).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>