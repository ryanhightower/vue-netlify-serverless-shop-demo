<template>
  <div class="product">
    <div class="image-viewer">
      <ul class="list-thumbs">
        <li class="thumb" v-for="(image, index) in product.images" :key="index">
          <img :src="image.thumb" alt="" @click="updateImage(image);" />
        </li>
      </ul>
      <div class="image"><img :src="image.src" alt="" /></div>
    </div>

    <div class="product-description">
      <h1 class="product-name">{{ product.name }}</h1>
      <p class="product-description">{{ product.description }}</p>
    </div>

    <div class="add-to-cart">
      <h3 class="title is-4">${{ product.price }}.00 / each</h3>
      <form @sumbmit.stop.prevent="addToCart">
        <b-field label="Quantity">
          <b-select v-model="qty" v-if="qty <= 10">
            <option
              v-for="(qty, i) in [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                { label: '10+', amount: 11 }
              ]"
              :key="i"
              :value="qty.amount || qty"
              >{{ qty.label || qty }}</option
            >
          </b-select>
        <b-input
          class="qty-input"
          v-if="qty > 10"
          type="number"
          v-model="qty"
        />
        </b-field>
        <p class="title is-6">Subtotal: ${{ subtotal }}.00</p>
        <button type="submit" class="button is-success" @click="addToCart">
          Add to Cart
        </button>
      </form>
    </div>

    <div class="modal" v-show="show.modal" @click="closeModal">
      <div class="modal-content">Checkout</div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState } from "vuex";
import { EventBus } from "@/components/EventBus";

export default {
  name: "home",
  components: {},
  data() {
    return {
      qty: 1,
      show: {
        modal: false
      },
      currentImage: "",
      product: {}
    };
  },
  computed: {
    ...mapState(["products", "cart", "cartTotal"]),
    // product() {
    //   return this.products[0];
    // },
    image() {
      return this.currentImage || { src: this.product.mainImage };
    },
    subtotal() {
      return this.product.price * this.qty;
    }
  },
  methods: {
    openModal(item) {
      this.modal.src = item.img;
      this.show.modal = true;
    },
    closeModal() {
      this.modal.src = "";
      this.show.modal = false;
    },
    updateImage(image) {
      this.currentImage = image;
    },
    addToCart(e) {
      e.preventDefault();
      const { product, qty } = this;
      if (product.year !== undefined && _.get(product, "year", "") === "") {
        product.year = "2013";
      }
      this.$store.commit("addItem", { item: product, qty });
      EventBus.$emit("item-added");
    }
  },
  mounted() {},
  watch: {
    $route: {
      handler(to, from) {
        // Fetch product data
        if (
          to.name === "product" &&
          to.params.slug !== _.get(from, "params.slug", "")
        ) {
          this.product = this.products.filter(function(item) {
            return item.slug === to.params.slug;
          })[0];
        }

        // Redirect if not found
        if (!this.product) this.$router.push({ name: "home" }); // TODO: redirect to 404 page
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  padding: 0 30px;
  display: grid;
  grid-template-columns: 38% auto 260px;
  grid-column-gap: 20px;

  @media (max-width: 768px) {
    & {
      grid-template-columns: 100%;
    }
    .add-to-cart {
      grid-row-start: 1;
    }
  }
  .image-viewer,
  .product-description,
  .add-to-cart {
    margin: 20px 0;
  }
  // font-family: 'Avenir', Arial, Helvetica, sans-serif;

  h1 {
    margin: 0;
    font-size: 24px;
  }
  .image-viewer {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .list-thumbs {
      width: 60px;
      float: left;
    }
    .thumb {
      margin-bottom: 10px;

      img {
        display: block;
      }
    }
    .image {
      float: right;
      width: calc(100% - 60px);
      padding-left: 10px;
    }
  }

  .add-to-cart {
    border: 1px solid #ccc;
    padding: 15px;

    .penny {
      img {
        display: block;
        width: 116px;
        margin: 0 auto 10px;
      }
      input {
        font-size: 24px;
        padding: 10px;
        width: 100%;
        margin: 20px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
      }
    }

    label {
      font-size: 18px;
    }
    label.qty-label {
      font-size: 24px;
    }

    select {
      border: 1px solid #3a393e;
      // margin: 20px 0;
      padding: 12px;
      width: 50%;
      height: 50px;
      font-size: 24px;
      font-family: "Avenir", Helvetica, Arial, sans-serif;
    }
    input.qty-input {
      font-size: 24px;
      padding: 10px;
      width: 50%;
    }

    button.add-to-cart {
      border: 1px solid #3a393e;
      border-radius: 4px;
      margin: 20px 0;
      padding: 12px;
      background-color: #a58fa4;
      color: white;
      display: block;
      width: 100%;
      font-size: 24px;
      font-family: "Avenir", Helvetica, Arial, sans-serif;
    }

    p.subtotal {
      font-size: 24px;
      text-align: center;
    }
  }
}

// .product-list {
//   .product {
//     width: 350px;
//     // height: 400px;
//     border: 1px #eee solid;
//     border-radius: 3px;
//     padding: 10px;
//   }
// }
// input {
//   font-size: 14px;
//   padding: 3px 5px;
//   border-radius: 3px;
//   border: 1px solid #eee;
//   text-align: center;
// }

.modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(100, 100, 100, 0.8);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  .modal-content {
    padding: 5px;
    border-radius: 5px;
    width: calc(100% - 100px);
  }
}
</style>
