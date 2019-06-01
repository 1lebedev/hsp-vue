<template lang="pug">
.color-spectre
  .formWrapper
    .formControl
      .controlTitle(v-bind:style="{color: sliderProcessColor}") Contrast Base {{this.c}}
      vue-slider(v-model="c" v-bind="sliderOptions")

  .colorsArray.chroma(v-bind:style="{ opacity: opacity}")
    SpectrumColor(
      v-for="color in colors"
      v-bind:key="color.index"
      v-bind:rgbColor="color.colorRGB"
      v-bind:isChromaExtremum="color.isChromaExtremum"
      v-bind:lightness="l")
</template>

<script>
import SpectrumColor from "../components/SpectrumColor.vue";
import VueSlider from "vue-slider-component";
import colorlab from "colorlab";
import ColorConvert from "color-convert";

export default {
  name: "ColorSpectrum",
  components: {
    SpectrumColor,
    VueSlider
  },
  computed: {
    colors: function() {
      const colorsArray = [];

      for (let index = 0; index < this.colorsAmount; index++) {
        let currentContrast,
          previousContrastDelta,
          currentContrastDelta = 100000,
          colorHSL,
          currentL;

        let decreasingLightness = true;
        let startingL = 50;
        let stepL = 50;

        while (currentContrastDelta > 1) {
          // start from the center of the range
          decreasingLightness ? (currentL -= stepL) : (currentL += stepL);

          colorHSL = ColorConvert.hsl.lab.raw([
            (index * 360) / this.colorsAmount,
            this.s,
            currentL
          ]);

          let color1 = new colorlab.CIELAB(...colorHSL);
          let color2 = new colorlab.CIELAB(...this.backgroundColorLab);

          currentContrast = colorlab.CIEDE2000(color1, color2);
          currentContrastDelta = Math.abs(currentContrast - this.c);

          // debugger;
          // if we have nothing to compare with — check other direction
          if (index == 0) {
            previousContrastDelta = currentContrastDelta;
            decreasingLightness = !decreasingLightness;
          }
          // if we have SOMETHING to compare with
          else {
            // if we were closer to the solution BEFORE
            if (previousContrastDelta <= currentContrastDelta) {
              // we have to change direction and make the same step
              decreasingLightness = !decreasingLightness;
            }
            // if we are closer to the solution NOW
            else {
              // go
              stepL = stepL / 2;
              startingL = currentL;
            }
          }
          console.log(
            color1 +
              " / " +
              color2 +
              " / " +
              currentContrast +
              " / " +
              currentContrastDelta
          );
        }

        // HSLUV
        let colorRGB = ColorConvert.hsl.rgb(colorHSL);

        colorsArray.push({
          colorRGB,
          index
        });
      }

      return colorsArray;
    },
    backgroundColorLab: function() {
      return ColorConvert.hex.lab.raw(this.$store.state.backgroundColor);
    },
    colorsAmount: {
      get() {
        return this.dataColorsAmount;
      },

      set(newColorsAmount) {
        this.dataColorsAmount = newColorsAmount;
      }
    },
    sliderProcessColor: function() {
      return this.l < 60 ? "#ffffff" : "#000000";
    },
    sliderOptions: function() {
      return {
        min: 0,
        max: 100,
        interval: 1,
        show: true,
        tooltip: false,
        height: 2,
        processStyle: {
          backgroundColor: this.sliderProcessColor
        },
        bgStyle: {
          backgroundColor: this.sliderProcessColor + "33"
        }
      };
    },
    ldeltaSliderOptions: function() {
      return {
        min: 0,
        max: 100 - this.l,
        interval: 1,
        show: true,
        tooltip: false,
        height: 2,
        processStyle: {
          backgroundColor: this.sliderProcessColor
        },
        bgStyle: {
          backgroundColor: this.sliderProcessColor + "33"
        }
      };
    },
    opacitySliderOptions: function() {
      return {
        min: 0,
        max: 1,
        interval: 0.05,
        show: true,
        tooltip: false,
        height: 2,
        processStyle: {
          backgroundColor: this.sliderProcessColor
        },
        bgStyle: {
          backgroundColor: this.sliderProcessColor + "33"
        }
      };
    }
  },
  methods: {
    increaseColorAmountBy(increment) {
      this.dataColorsAmount += increment;
    }
  },
  data: function() {
    return {
      s: 100,
      c: 30,
      deltaC: 10,
      l: 60,
      opacity: 1,
      dataColorsAmount: 10
    };
  }
};
</script>

<style>
.colorsArray {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.colorsArray.chroma {
  z-index: 2;
}

.formWrapper {
  position: absolute;
  z-index: 3;
  margin: auto;
  top: 92px;
  left: 36px;
  display: flex;
}

.formControl {
  margin-top: 8px;
  color: #000;
  font-size: 1em;
  line-height: 1.3em;
  font-weight: 600;
  text-align: left;
  flex-grow: 1;
  min-width: 150px;
  margin-right: 16px;
}

.controlTitle {
  padding: 16px 8px 4px;
}

.vue-slider-component .vue-slider-dot .vue-slider-dot-handle {
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
}
</style>
