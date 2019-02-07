<template>
  <div class="navarea">
    <nav>
      <div class="capsule">
        <ul>
          <router-link :to="{ name: 'checkout' }" tag="li">
            <a>Checkout</a>
          </router-link>
          <router-link :to="{ name: 'about' }" tag="li">
            <a>About</a>
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    cartTotal() {
      return this.$store.state.cartTotal;
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.navarea {
  overflow: hidden;
}

.capsule {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

nav {
  /* width: 100vw; */
  height: 60px;
  background: white;
}

ul {
  padding-left: 0;
  display: flex;
  list-style: none outside none;
  justify-content: center;
  align-items: center;
}

li {
  padding: 0 50px;
}
li:first-child {
  padding-left: 30px;
}

a,
a:visited,
a:active {
  text-decoration: none;
  color: black;
}
</style>
