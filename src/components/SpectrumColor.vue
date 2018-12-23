<template>
  <div class="colorBlock" v-bind:style="{ backgroundColor: 'rgb(' + rgbColor + ')'}">
    <div
      v-if="isChromaExtremum"
      class="extremumPiska"
      v-bind:style="{backgroundColor: 'rgb(' + extremumDotColor + ')'}"
    ></div>
  </div>
</template>


<script>
export default {
  name: "SpectrumColor",
  props: {
    rgbColor: Array,
    isChromaExtremum: Boolean,
    lightness: Number
  },
  computed: {
    extremumDotColor: function() {
      return (this.lightness < 60 ? [255, 255, 255] : [0, 0, 0])
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
