import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import products from "./products.json";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: "heavenandhearts",
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    show: {
      minicart: true
    },
    cart: {},
    products: products,
    user: {
      fullName: "",
      email: "",
      phone: "",
      pickup: false,
      shipping: {
        address: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          postal_code: ""
        },
        name: ""
      }
    }
  },
  getters: {
    subtotalPrice: state => {
      return Object.values(state.cart).reduce((total, item) => {
        return item.price * item.count + total;
      }, 0);
    },
    totalPrice: (state, getters) => {
      const { subtotalPrice, shippingPrice } = getters;
      return subtotalPrice + shippingPrice;
    },
    shippingPrice: (state, getters) => {
      const SHIPPING_PRICE_IN_DOLLARS = 3;
      const FREE_SHIPPING_PRICE = 0;
      return getters.subtotalPrice >= 50 || state.user.pickup
        ? FREE_SHIPPING_PRICE
        : SHIPPING_PRICE_IN_DOLLARS;
    },
    cartTotal: state => {
      return Object.values(state.cart).reduce((count, item) => {
        return (count += item.count);
      }, 0);
    },
    stripeProducts: state => {
      const { cart } = state;
      const products = {};
      for (let product in cart) {
        const count = cart[product].count;
        const sku = cart[product].sku;
        products[sku] = count;
      }
      return products;
    }
  },
  mutations: {
    switchSale: state => {
      state.sale = !state.sale;
    },
    clearCartContents: state => {
      Vue.set(state, "cart", {});
    },
    setShowMinicart: (state, bool) => {
      state.show.minicart = bool;
    },
    addItem: (state, { item, qty }) => {
      // const suffix = item.year ? ` - ${item.year}` : "";
      const itemName = getItemCartName(item);

      if (itemName in state.cart) {
        state.cart[itemName].count += qty;
      } else {
        let newItem = Object.assign({}, item);
        newItem.count = qty;

        Vue.set(state.cart, itemName, newItem);
      }
    },
    removeItem: (state, item) => {
      const itemName = getItemCartName(item);
      if (itemName in state.cart) {
        console.log(state.cart[itemName].count);
        if (state.cart[itemName].count > 0) state.cart[itemName].count--;
      }
      Vue.delete(state.cart, itemName);
    },
    updateUser: (state, userObj) => {
      state.user = userObj;
    }
  },
  actions: {
    addItem({ commit }, item) {
      commit("addItem", item);
      commit("updateTotalPrice");
    },
    removeItem({ commit }, item) {
      commit("removeItem", item);
      commit("updateTotalPrice");
    }
  }
});

//helper
// const filter = (array, key, value) => array.filter(item => item[key] === value);
const getItemCartName = item => {
  const suffix = item.year ? ` - ${item.year}` : "";
  const fullName = `${item.name}${suffix}`;
  return fullName;
};
