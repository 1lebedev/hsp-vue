<template>
  <div id="color-spectre">
    <div class="formWrapper">
      <!-- <button @click="increaseColorAmountBy(10)">More colors!</button> -->
      <div class="formControl">
        Saturation {{this.s}}
        <vue-slider v-model="s" v-bind="sliderOptions"></vue-slider>
      </div>
      <div class="formControl">
        Lightness {{this.l}}
        <vue-slider v-model="l" v-bind="sliderOptions"></vue-slider>
      </div>

      <div class="formControl">
        <div class="controlTitle">Chroma +{{opacity}}</div>
        <div class="controlElement">
          <vue-slider v-model="opacity" v-bind="opacitySliderOptions"></vue-slider>
        </div>
      </div>
    </div>

    <div class="colorsArray">
      <Color v-for="color in colors" v-bind:key="color.index" v-bind:rgbColor="color.RGBfromHPLuv"></Color>
    </div>
    <div class="colorsArray chroma" v-bind:style="{ opacity: opacity}">
      <Color
        v-for="color in colors"
        v-bind:key="color.index"
        v-bind:rgbColor="color.RGBfromHSLuv"
        v-bind:isChromaExtremum="color.isChromaExtremum"
        v-bind:lightness="l"
      ></Color>
    </div>
  </div>
</template>

<script>
// import { store } from "./store.js";
import Color from "../components/Color.vue";
import ColorSpaces from "color-space";
import VueSlider from "vue-slider-component";

export default {
  name: "app",
  components: {
    Color,
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
      dataColorsAmount: 360,
      sliderOptions: {
        min: 0,
        max: 100,
        interval: 1,
        show: true,
        tooltip: false,
        height: 2,
        processStyle: {
          backgroundColor: "#4d4d4d"
        },
        bgStyle: {
          backgroundColor: "#cccccc"
        }
      },
      colorsSliderOptions: {
        min: 0,
        max: 360,
        interval: 1,
        show: true,
        tooltip: false,
        height: 2,
        processStyle: {
          backgroundColor: "#4d4d4d"
        },
        bgStyle: {
          backgroundColor: "#cccccc"
        }
      },
      opacitySliderOptions: {
        min: 0,
        max: 1,
        interval: 0.05,
        show: true,
        tooltip: false,
        height: 2,
        processStyle: {
          backgroundColor: "#4d4d4d"
        },
        bgStyle: {
          backgroundColor: "#cccccc"
        }
      }
    };
  }
};
</script>

<style>
@import "https://cdn.rawgit.com/h-ibaldo/Raleway_Fixed_Numerals/master/css/rawline.css";

#app {
  font-family: "rawline", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #999;
  font-size: 13px;
}

.colorsArray {
  display: flex;
}

.colorsArray.chroma {
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
}

.formWrapper {
  position: absolute;
  width: 400px;
  z-index: 3;
  background: #fff;
  max-width: 200px;
  text-align: center;
  margin: auto;
  padding: 20px 24px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 12px #00000033;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}

.formControl {
  margin-top: 8px;
  font-weight: 500;
  color: #000;
  text-align: left;
}
.vue-slider-component .vue-slider-dot .vue-slider-dot-handle {
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
}
</style>
