<template>
  <div class="cart">
    <h1>{{ cart[0].quantity }} x {{ cart[0].product.name }} @ {{ cart[0].product.price }}</h1>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  name: "cart",
  data: function() {
    return {
      cart: []
    };
  },
  created: function() {
    axios.get("/api/carted_products").then(response => {
      this.cart = response.data;
    });
  },
  methods: {}
};
</script>