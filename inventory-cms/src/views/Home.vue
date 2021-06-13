<template>
  <div class="row justify-content-start">
    <Product
      v-for="product in this.$store.state.inventories"
      :key="product.id"
      :product="product"
    ></Product>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from "../components/Product.vue";

export default {
  name: "Home",
  components: {
    Product,
  },
  mounted() {
    this.$store.dispatch("getInventories");
  },
};
</script>
