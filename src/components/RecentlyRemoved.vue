<template>
  <div class="recentlyRemoved">
    <h1>Recently Removed Items</h1>
    <div v-for="(item, index) in removedItems" :key="index">
      <a @click.prevent="reAddItem(item.id)">{{ item.item.name }}</a>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  name: "RecentlyRemoved",
  data: function() {
    return {
      removedItems: []
    };
  },
  created: function() {
    axios.get("/api/carted_products/re_add").then(response => {
      this.removedItems = response.data;
    });
  },
  methods: {
    reAddItem(input) {
      axios.patch("/api/carted_products/" + input).then(response => {
        console.log(response.data);
      });
    }
  }
};
</script>