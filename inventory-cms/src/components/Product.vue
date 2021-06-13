<template>
  <div class="col-4">
    <div class="card mx-auto my-2" style="width: 12rem">
      <img :src="product.image_url" class="card-img-top" :alt="product.name" />
      <div class="card-body card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">Quantity: {{ product.quantity }}</p>
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: Object,
  },
};
</script>

<style>
</style>
