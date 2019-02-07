<template>
  <div class="masthead" :style="`background:${bgcolor}`">
    <h1>
      <a href="/" @click.prevent="navigateTo('home');">{{ title }}</a>

      <v-popover
        placement="bottom-start"
        trigger="click"
        :open="showMinicart"
        @hide="showMinicart = false;"
        @show="showMinicart = true;"
        boundariesElement="#app"
        popoverClass="minicart"
      >

        <cart-icon style="float:right;" />

        <template slot="popover">
          <div class="minicart">
            <ul>
              <li v-for="item in cart" :key="item.fullName">
                <h4>
                  {{ item.year ? `${item.name} | ${item.year}` : item.name }}
                </h4>
                <p>{{ item.count }}</p>
              </li>
              <li>
                <h4>Total</h4>
                <p>${{ subtotalPrice }}.00</p>
              </li>
            </ul>

            <router-link :to="{ name: 'checkout' }" class="button is-primary"
              >Checkout</router-link
            >
          </div>
        </template>
      </v-popover>
    </h1>
    <app-navigation />
  </div>
</template>

<script>
import AppNavigation from "@/components/AppNavigation";
import CartIcon from "@/components/CartIcon";
import { EventBus } from "@/components/EventBus";
import { mapGetters } from "vuex";

export default {
  components: {
    AppNavigation,
    CartIcon
  },
  props: {
    bgcolor: {
      type: String,
      default: "#3b60ed"
    },
    title: {
      type: String,
      default: "Shoppity"
    },
    img: {
      type: String
      //   default: 'banner-ppl'
    }
  },
  data() {
    return {
      show: { minicart: true }
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    showMinicart: {
      get: function() {
        return this.$store.state.show.minicart;
      },
      set: function(val) {
        this.$store.commit("setShowMinicart", val);
      }
    },
    ...mapGetters(["subtotalPrice", "totalPrice", "shippingPrice"])
  },
  methods: {
    navigateTo(name) {
      this.showMinicart = false;
      this.$router.push({ name });
    }
  },
  mounted() {
    EventBus.$on("item-added", () => {
      this.showMinicart = true;
    });
  }
};
</script>

<style lang="scss">
.masthead {
  width: 100%;
  height: 100px;
  color: white;
  position: relative;
  overflow: hidden;
  margin: 10px 0;

  h1 {
    color: #39af78;
    position: relative;
    z-index: 100;
    font-size: 24px;
    padding: 8px 30px;
    margin: 0px;
    font-weight: 400;
    border-bottom: 1px solid #979797;
  }

  h1,
  h1 a,
  h1 a:hover,
  h1 a:visited {
    color: #39af78;
  }

  .bk {
    position: absolute;
    top: 0;
    left: 0;
  }

  .ppl-banner {
    position: absolute;
    z-index: 10;
    right: 100px;
  }

  .v-popover {
    float: right;
  }
}

.popover-arrow {
  border-color: #ccc;
}
.popover.minicart {
  background: white;
  padding: 20px 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 999;

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }
  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }

  h4 {
    font-weight: 400;
  }
  p.count,
  p.total,
  p {
    font-weight: bold;
    margin-left: 20px;
  }

  ul {
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 15px 0px;

      &:last-child {
        border: none;
      }
    }
  }

}
</style>
