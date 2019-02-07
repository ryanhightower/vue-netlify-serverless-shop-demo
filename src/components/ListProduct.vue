<template>
  <div class="product" @click="navigateTo(item);">
    <img :src="item.img" :alt="item.name" class="product-thumb" />
    <p class="product-name">{{ item.name }}</p>
    <p class="price">${{ item.price }}</p>
  </div>
</template>

<script>
export default {
  name: "ListProduct",
  props: {
    item: Object,
    disabled: Boolean
  },
  components: {},
  computed: {
    yearIsValid() {
      const { item } = this;
      return (
        item.year != undefined &&
        item.year != "" &&
        Number.isInteger(parseInt(item.year)) &&
        parseInt(item.year) >= 1970 &&
        parseInt(item.year) <= 2018
      );
    }
  },
  methods: {
    addItem(item) {
      this.$store.commit("addItem", item);
    },
    validateYear(item) {
      return (
        item.year != undefined &&
        item.year != "" &&
        Number.isInteger(item.year) &&
        item.year >= 1970 &&
        item.year <= 2018
      );
    },
    navigateTo(product) {
      this.$router.push({ name: "product", params: { slug: product.slug } });
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
// .product {
//   text-align: center;
// }
p.product-name {
  font-size: 20px;
  margin-bottom: 0;
}
.short-description {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.price {
  font-weight: bold;
  margin: 5px 0 20px;
}
</style>
