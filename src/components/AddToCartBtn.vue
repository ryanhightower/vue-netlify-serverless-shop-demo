<template>
  <button class="add" @click="addItem(item)" :disabled="disabled">Add To Cart</button>
</template>

<script>
export default {
  name: 'AddToCartBtn',
  props: {
    item: Object,
    disabled: Boolean
  },
  methods: {
    addItem(item) {
      this.$store.commit('addItem', item);
    },
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
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
</style>
