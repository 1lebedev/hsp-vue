<template lang="pug">
.palette
  BackgroundColorInput
  PaletteColor(v-for="color in paletteColors" v-bind:key="color.index+1" v-bind:color="color")
  button(@click="add") Add color
</template>

<script>
import PaletteColor from "../components/PaletteColor.vue";
import BackgroundColorInput from "../components/BackgroundColorInput.vue";

export default {
  name: "Palette",
  components: {
    PaletteColor,
    BackgroundColorInput
  },
  computed: {
    paletteColors() {
      return this.$store.state.colorsPalette;
    }
  },
  methods: {
    add: function() {
      this.$store.commit("addColor");
    }
  }
};
</script>

<style scoped>
</style>
