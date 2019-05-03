<template>
  <div
    class="colorBlock"
    v-bind:style="{ backgroundColor: 'rgb(' + rgbColor + ')'}"
    v-clipboard:copy="hex"
  >
    <div
      v-if="isChromaExtremum"
      class="extremumPiska"
      v-bind:style="{backgroundColor: 'rgb(' + extremumDotColor + ')'}"
    >></div>
  </div>
</template>


<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import ColorConvert from "color-convert";

Vue.use(VueClipboard);

export default {
  name: "SpectrumColor",
  props: {
    rgbColor: Array,
    isChromaExtremum: Boolean,
    lightness: Number
  },
  computed: {
    extremumDotColor: function() {
      return this.lightness < 60 ? [255, 255, 255] : [0, 0, 0];
    },
    hex: function() {
      return ColorConvert.rgb.hex(this.rgbColor);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.colorBlock {
  height: 100vh;
  display: block;
  width: 100%;
  position: relative;
}

.extremumPiska {
  position: absolute;
  z-index: 5;
  top: 400px;
  left: 50%;
  transform: translate(-50%, 0);
  min-width: 4px;
  min-height: 4px;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
}
</style>
