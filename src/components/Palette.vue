<template>
  <div class="palette">
      <PaletteColor
      v-for="color in colors"
        v-bind:key="color.index+1"
        v-bind:color="color"></PaletteColor>
        <button @click="add">Add color</button>
  </div>
</template>

<script>

import PaletteColor from "../components/PaletteColor.vue";

export default {
  name: "Palette",
  components: {
    PaletteColor
  },
  computed: {
    colors() {
       return this.$store.state.colorsPalette
    }
  },
  methods: {
    add: function() {
      this.$store.commit('addColor')
    }
  }
};
</script>

<style scoped>


</style>
