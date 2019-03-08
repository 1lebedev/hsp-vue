<template lang="pug">
.equalized-palette
  BackgroundColorInput
//-   .color(v-for="color in paletteColors") hello
</template>

<script>
import BackgroundColorInput from "../components/BackgroundColorInput.vue";
import ColorSpaces from "color-space";

export default {
  name: "EqualizedPalette",
  components: {
    BackgroundColorInput
  },
  computed: {
    paletteColors() {
      let colorsArray = [];

      for (let h = 0; h < 360; h + 10) {
        //     let maxChroma = 0;
        //     let maxChromaL = 0;

        //     for (let index = 0; index < 100; index++) {
        //       let chroma = ColorSpaces.hsluv.lchuv([h, 100, index])[1];
        //       if (chroma > maxChroma) {
        //         maxChroma = chroma;
        //       } else {
        //         if (maxChromaL == 0 && index != 0) {
        //           maxChromaL = index - 1;
        //         }
        //       }
        //     }

        let rgb = ColorSpaces.lchuv.rgb([50, 59, h]);

        colorsArray.push(rgb);
      }
      //   console.log(colorsArray);

      return colorsArray;
    }
  }
};
</script>

<style scoped>
.color {
  min-width: 96px;
  margin-right: 8px;
  min-height: 32px;
  border-radius: 4px;
  display: inline-block;
}
</style>
