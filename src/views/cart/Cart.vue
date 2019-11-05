<template>
  <div class="cart">
    <h1>Your Cart</h1>
    <div v-for="(item, index) in cart" :key="index">
      <p>{{ item.quantity }} x {{ item.item.name }} @ ${{ item.item.price }}</p>
    </div>
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