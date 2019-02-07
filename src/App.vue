<template>
  <div id="app">
    <app-masthead bgcolor="#fff" title="Vue Serverless Shop" />
    <router-view />
  </div>
</template>

<script>
import AppMasthead from "@/components/AppMasthead.vue";
export default {
  components: {
    AppMasthead
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
img {
  max-width: 100%;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#app {
  padding: 0 20px;
}

.grid.container {
  display: grid;
  grid-template-columns: repeat(12, 8.333%);
}
.grid.grid-col-1 {
  grid-column-end: span 1;
}
.grid.grid-col-2 {
  grid-column-end: span 2;
}
.grid.grid-col-3 {
  grid-column-end: span 3;
}
.grid.grid-col-4 {
  grid-column-end: span 4;
}
.grid.grid-col-5 {
  grid-column-end: span 5;
}
.grid.grid-col-6 {
  grid-column-end: span 6;
}
.grid.grid-col-7 {
  grid-column-end: span 7;
}
.grid.grid-col-8 {
  grid-column-end: span 8;
}
.grid.grid-col-9 {
  grid-column-end: span 9;
}
.grid.grid-col-10 {
  grid-column-end: span 10;
}
.grid.grid-col-11 {
  grid-column-end: span 11;
}
.grid.grid-col-12 {
  grid-column-end: span 12;
}

.grid.grid-row-1 {
  grid-row-end: span 1;
}
.grid.grid-row-2 {
  grid-row-end: span 2;
}
.grid.grid-row-3 {
  grid-row-end: span 3;
}
.grid.grid-row-4 {
  grid-row-end: span 4;
}
.grid.grid-row-5 {
  grid-row-end: span 5;
}
.grid.grid-row-6 {
  grid-row-end: span 6;
}
.grid.grid-row-7 {
  grid-row-end: span 7;
}
.grid.grid-row-8 {
  grid-row-end: span 8;
}
.grid.grid-row-9 {
  grid-row-end: span 9;
}
.grid.grid-row-10 {
  grid-row-end: span 10;
}
.grid.grid-row-11 {
  grid-row-end: span 11;
}
.grid.grid-row-12 {
  grid-row-end: span 12;
}
</style>
