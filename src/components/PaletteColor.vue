<template lang="pug">
.palette-color
  .colorCircle(v-bind:style="{backgroundColor: '#' + currentColorProperties.equalizedColor}")
  .colorCircle(v-bind:style="{backgroundColor: '#' + currentHex}")
  .hexInput
    input(v-model="currentHex" placeholder="Enter HEX")
  .color-prop H = {{currentH}}
    vue-slider(v-model="currentH" v-bind="sliderOptionsHue")
  .color-prop S = {{currentS}}
    vue-slider(v-model="currentS" v-bind="sliderOptions")
  .color-prop L = {{currentL}}
    vue-slider(v-model="currentL" v-bind="sliderOptions")
  button(@click="setMaxChromaL") Optimize L ({{currentColorProperties.maxChromaL}})
  .color-prop Eq S = {{currentSEqualized}}
    vue-slider(v-model="currentSEqualized" v-bind="sliderOptions")
  .color-prop Eq C = {{currentColorProperties.equalizedChroma}}
  .color-prop C = {{currentColorProperties.c}}
  .color-prop P = {{currentColorProperties.p}}
  
</template>


<script>
import ColorSpaces from "color-space";
import ColorConvert from "color-convert";
import VueSlider from "vue-slider-component";

export default {
  name: "PaletteColor",
  components: {
    VueSlider
  },
  props: {
    color: Object
  },
  computed: {
    currentHex: {
      get() {
        return ColorConvert.rgb.hex(
          ColorSpaces.hsluv.rgb([this.color.h, this.color.s, this.color.l])
        );
      },
      set(value) {
        // const hex =
        this.$store.commit("changePaletteColor", {
          index: this.color.index,
          hex: value
        });
        //  alert(value)
      }
    },
    currentH: {
      get() {
        return this.$store.state.colorsPalette[this.color.index].h;
      },
      set(value) {
        this.$store.commit("changePaletteHSLuv", {
          index: this.color.index,
          h: value,
          s: this.color.s,
          l: this.color.l
        });
      }
    },

    currentS: {
      get() {
        return this.$store.state.colorsPalette[this.color.index].s;
      },
      set(value) {
        this.$store.commit("changePaletteHSLuv", {
          index: this.color.index,
          h: this.color.h,
          s: value,
          l: this.color.l
        });
      }
    },

    currentL: {
      get() {
        return this.$store.state.colorsPalette[this.color.index].l;
      },
      set(value) {
        this.$store.commit("changePaletteHSLuv", {
          index: this.color.index,
          h: this.color.h,
          s: this.color.s,
          l: value
        });
      }
    },

    currentSEqualized: {
      get() {
        const treshold = this.currentColorProperties.equalizedColorSaturation;
        const s = Math.round(
          ((this.color.s - treshold) / (100 - treshold)) * 100
        );
        return s;
      }
    },
    currentColorProperties() {
      const currentRGB = ColorConvert.hex.rgb(this.currentHex);

      // Chroma (from LCH)
      let LCHuvColorProperties = ColorSpaces.rgb.lchuv(currentRGB);
      LCHuvColorProperties = LCHuvColorProperties.map(LCHuvColorProperties =>
        Math.round(LCHuvColorProperties)
      );

      // P (from HSP)

      let HSPColorProperties = ColorSpaces.rgb.hsp(currentRGB);

      HSPColorProperties[2] = (HSPColorProperties[2] * 100) / 255;

      HSPColorProperties = HSPColorProperties.map(HSPColorProperties =>
        Math.round(HSPColorProperties)
      );

      // Equalized color (HPLuv) & equalized chroma

      const HPLuvColor = ColorSpaces.hpluv.rgb([
        this.color.h,
        this.color.s,
        this.color.l
      ]);

      const equalizedColor = ColorConvert.rgb.hex(HPLuvColor);
      const HPLuvColorChroma = Math.round(ColorSpaces.rgb.lchuv(HPLuvColor)[1]);
      const HPLuvColorSaturation = Math.round(
        ColorSpaces.rgb.hsluv(HPLuvColor)[1]
      );

      // L with maximum Chroma

      let maxChroma = 0;
      let maxChromaL = 0;
      for (let index = 0; index < 100; index++) {
        let chroma = ColorSpaces.hsluv.lchuv([this.color.h, 100, index])[1];
        if (chroma > maxChroma) {
          maxChroma = chroma;
        } else {
          if (maxChromaL == 0 && index != 0) {
            maxChromaL = index - 1;
          }
        }
      }

      return {
        c: LCHuvColorProperties[1],
        p: HSPColorProperties[2],
        equalizedColor: equalizedColor,
        equalizedChroma: HPLuvColorChroma,
        equalizedColorSaturation: HPLuvColorSaturation,
        maxChromaL: maxChromaL
      };
    },
    sliderOptions: function() {
      return {
        min: 0,
        max: 100,
        interval: 1,
        show: true,
        tooltip: false,
        width: 100,
        height: 2,
        processStyle: {
          backgroundColor: "000000"
        },
        bgStyle: {
          backgroundColor: "00000033"
        }
      };
    },
    sliderOptionsHue: function() {
      return {
        min: 0,
        max: 360,
        interval: 1,
        show: true,
        tooltip: false,
        width: 100,
        height: 2,
        processStyle: {
          backgroundColor: "000000"
        },
        bgStyle: {
          backgroundColor: "00000033"
        }
      };
    }
  },
  methods: {
    setMaxChromaL: function() {
      this.$store.commit("changePaletteHSLuv", {
        index: this.color.index,
        h: this.color.h,
        s: this.color.s,
        l: this.currentColorProperties.maxChromaL
      });
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
  min-width: 96px;
  margin-right: 8px;
  min-height: 32px;
  border-radius: 4px;
  display: inline-block;
}

.color-prop {
  min-width: 100px;
  color: black;
}
</style>