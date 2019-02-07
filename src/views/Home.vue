<template>
  <div class="home">
    <div class="product-list">
      <list-product
        :item="item"
        :key="item.name"
        v-for="item in products"
      ></list-product>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ListProduct from "@/components/ListProduct.vue";

export default {
  name: "home",
  components: {
    ListProduct
  },
  data() {
    return {
      show: {
        modal: false
      },
      modal: {
        src: ""
      }
    };
  },
  computed: {
    ...mapState(["products", "cart", "cartTotal"])
  },
  mounted() {}
};
</script>

<style lang="scss">
.product-list {
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: 700px) {
    & {
      grid-template-columns: repeat(2, 50%);
    }
  }

  @media (min-width: 1050px) {
    & {
      grid-template-columns: repeat(3, 33.333%);
    }
  }

  @media (min-width: 1400px) {
    & {
      grid-template-columns: repeat(4, 25%);
    }
  }

  .product {
    width: 100%;
    // height: 400px;
    padding: 30px;
    float: left;
  }

  input {
    font-size: 14px;
    padding: 3px 5px;
    border-radius: 3px;
    border: 1px solid #eee;
    text-align: center;
  }
}
</style>
