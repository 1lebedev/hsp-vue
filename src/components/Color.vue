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
  name: "Color",
  props: {
    rgbColor: Array,
    isChromaExtremum: Boolean,
    lightness: Number
  },
  computed: {
    extremumDotColor: function() {
      if (this.lightness < 60) return [255, 255, 255];
      else return [0, 0, 0];
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* background: #fff; */
  min-width: 4px;
  min-height: 4px;
  border-radius: 50%;
  /* border: 1px solid #00000033; */
  /* box-sizing: border-box; */
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
}
</style>
