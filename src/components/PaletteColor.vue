<template lang="pug">
.palette-color
  .colorCircle(v-bind:style="{backgroundColor: '#' + currentColorProperties.equalizedColor}")
  .colorCircle(v-bind:style="{backgroundColor: '#' + currentHex}")
  .hexInput
    input(v-model="currentHex" placeholder="Enter HEX")
  .color-prop H = {{currentColorProperties.h}}
  .color-prop Eq C = {{currentColorProperties.equalizedChroma}}
  .color-prop C = {{currentColorProperties.c}}
  .color-prop S = {{currentColorProperties.s}}
  .color-prop L = {{currentColorProperties.l}}
  .color-prop P = {{currentColorProperties.p}}
</template>


<script>
import ColorSpaces from "color-space";
import ColorConvert from "color-convert";

export default {
  name: "PaletteColor",
  props: {
    color: Object
  },
  computed: {
    currentHex: {
      get() {
        return this.$store.state.colorsPalette[this.color.index].hex;
      },
      set(value) {
        this.$store.commit("changePaletteColor", {
          index: this.color.index,
          hex: value
        });
        //  alert(value)
      }
    },
    currentColorProperties() {
      const currentRGB = ColorConvert.hex.rgb(this.currentHex);
      // LCH PROPERTIES

      let LCHuvColorProperties = ColorSpaces.rgb.lchuv(currentRGB);
      LCHuvColorProperties = LCHuvColorProperties.map(LCHuvColorProperties =>
        Math.round(LCHuvColorProperties)
      );

      // HSP PROPERTIES

      let HSPColorProperties = ColorSpaces.rgb.hsp(currentRGB);

      HSPColorProperties[2] = (HSPColorProperties[2] * 100) / 255;

      HSPColorProperties = HSPColorProperties.map(HSPColorProperties =>
        Math.round(HSPColorProperties)
      );

      // HPLuv

      const HPLuvColor = ColorSpaces.hpluv.rgb([
        LCHuvColorProperties[2],
        HSPColorProperties[1],
        LCHuvColorProperties[0]
      ]);

      const HPLuvColorChroma = Math.round(ColorSpaces.rgb.lchuv(HPLuvColor)[1]);

      const equalizedColor = ColorConvert.rgb.hex(HPLuvColor);

      // MAKING ARRAY

      return {
        l: LCHuvColorProperties[0],
        c: LCHuvColorProperties[1],
        h: LCHuvColorProperties[2],
        s: HSPColorProperties[1],
        p: HSPColorProperties[2],
        equalizedChroma: HPLuvColorChroma,
        equalizedColor: equalizedColor
      };
    }
  }
};
</script>

<style scoped>
.hexInput {
  margin-left: 16px;
}

input {
  border: none;
  outline: none;
  background: transparent;
}

.hexInput:before {
  content: "#";
  display: inline-block;
  position: relative;
  top: 0px;
  left: 0px;
  padding-right: 2px;
  z-index: 0;
}
.palette-color {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.colorCircle {
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  display: inline-block;
}

.color-prop {
  min-width: 100px;
  color: black;
}
</style>