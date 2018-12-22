<template>
  <div id="app">
    <color-spectrum></color-spectrum>
  </div>
</template>

<script>
import ColorSpectrum from "./components/ColorSpectrum.vue";

export default {
  name: "app",
  components: {
    ColorSpectrum
  }
};
</script>

<style>
@import "https://cdn.rawgit.com/h-ibaldo/Raleway_Fixed_Numerals/master/css/rawline.css";

#app {
  font-family: "rawline", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #999;
  font-size: 13px;
}

body {
  margin: 0;
  padding: 0;
}
</style>
