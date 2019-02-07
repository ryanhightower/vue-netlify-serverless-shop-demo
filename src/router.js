import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Checkout from "./views/Checkout.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/product/:slug",
      name: "product",
      component: () => import(/* webpackChunkName: "product" */ "./views/Product.vue")
    }
  ],
  mode: "history"
});
