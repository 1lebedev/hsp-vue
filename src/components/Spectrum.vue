<template lang="pug">
.color-spectre
  .formWrapper
    .formControl
      .controlTitle(v-bind:style="{color: sliderProcessColor}") Lightness {{this.l}}
      vue-slider(v-model="l" v-bind="sliderOptions")

    .formControl
      .controlTitle(v-bind:style="{color: sliderProcessColor}") Saturation {{this.s}}
      vue-slider(v-model="s" v-bind="sliderOptions")

    .formControl
      .controlTitle(v-bind:style="{color: sliderProcessColor}") Chroma +{{opacity}}
      .controlElement
        vue-slider(v-model="opacity" v-bind="opacitySliderOptions")

  .colorsArray
    SpectrumColor(v-for="color in colors" v-bind:key="color.index" v-bind:rgbColor="color.RGBfromHPLuv")
  .colorsArray.chroma(v-bind:style="{ opacity: opacity}")
    SpectrumColor(
      v-for="color in colors"
      v-bind:key="color.index"
      v-bind:rgbColor="color.RGBfromHSLuv"
      v-bind:isChromaExtremum="color.isChromaExtremum"
      v-bind:lightness="l")
</template>

<script>
import SpectrumColor from "../components/SpectrumColor.vue";
import ColorSpaces from "color-space";
import VueSlider from "vue-slider-component";

export default {
  name: "ColorSpectrum",
  components: {
    SpectrumColor,
    VueSlider
  },
  computed: {
    colors: function() {
      const colorsArray = [];
      let chromaisRising = true;

      for (let index = 0; index < this.colorsAmount; index++) {
        const initialHSL = [
          (index * 360) / this.colorsAmount,
          Number(this.s),
          Number(this.l)
        ];

        const LCHuv = ColorSpaces.hsluv.lchuv(initialHSL);

        // FIND CHROMA EXTREMUMS
        // CHECK ALL COLORS AFTER THE VERY FIRST
        if (index > 0) {
          const currentChroma = LCHuv[1];
          const previousChroma = colorsArray[index - 1].LCHuv[1];

          // IF CHROMA WAS RISING AND WE SUDDENLY GO DOWN
          if (chromaisRising && currentChroma < previousChroma) {
            chromaisRising = false;
            // HERE IS OUR EXTREMUM
            colorsArray[index - 1].isChromaExtremum = true;
            // colorsArray[index - 1].RGBfromHSLuv = [0, 0, 0];
            // colorsArray[index - 1].RGBfromHPLuv = [0, 0, 0];
          }

          if (currentChroma > previousChroma) {
            chromaisRising = true;
          }
        }
        // HSLUV
        let RGBfromHSLuv = ColorSpaces.hsluv.rgb(initialHSL);
        RGBfromHSLuv = RGBfromHSLuv.map(RGBfromHSLuv =>
          Math.round(RGBfromHSLuv)
        );

        // HPLUV
        let RGBfromHPLuv = ColorSpaces.hpluv.rgb(initialHSL);
        RGBfromHPLuv = RGBfromHPLuv.map(RGBfromHPLuv =>
          Math.round(RGBfromHPLuv)
        );

        colorsArray.push({
          initialHSL,
          LCHuv,
          RGBfromHSLuv,
          RGBfromHPLuv,
          index
        });
      }

      return colorsArray;
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
    colorsSliderOptions: function() {
      return {
        min: 0,
        max: 360,
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
      l: 70,
      opacity: 1,
      dataColorsAmount: 360
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
