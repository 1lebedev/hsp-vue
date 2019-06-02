<template lang="pug">
.single
  .color-picker
    color-picker(v-model="hexWithoutSharp")
    .colorInput
    input(v-model="currentHex" placeholder="Enter HEX")
    .currentColor(v-bind:style="{ backgroundColor: '#' + currentHex}")

  .buttons  
    .button(v-bind:style="{ backgroundColor: '#' + babiAlgoritmBackground, color: '#' + babiAlgoritmText}") Hello
    .button(v-bind:style="{ backgroundColor: '#' + lightenedhslVsWhite, color: '#' + lightenedhsvVsbackground}") Hello
</template>

<script>
import colorlab from "colorlab";
import ColorConvert from "color-convert";
import ColorSpaces from "color-space";
import ColorPicker from 'vue-color-picker-wheel';

export default {
  name: "Single",
  components: {ColorPicker},
  computed: {
    hexWithoutSharp: {
      get() {
        return '#' + this.currentHex;
      },
      set(value) {
        this.currentHex = value.substring(1);
      }
    },

    babiAlgoritmBackground: function() {
      const currentHexHSL = ColorConvert.hex.hsl(this.currentHex);
      let resultHEX;
      if (currentHexHSL[2] > 90) resultHEX = ColorConvert.hsl.hex([currentHexHSL[0], currentHexHSL[1], 85]);
      else if (currentHexHSL[2] < 32) resultHEX = ColorConvert.hsl.hex([currentHexHSL[0], currentHexHSL[1], 95]);
      else resultHEX = ColorConvert.hsl.hex([currentHexHSL[0], currentHexHSL[1], 95]);

      return resultHEX;
    },


    babiAlgoritmText: function() {
      const currentHexHSL = ColorConvert.hex.hsl(this.currentHex);
      return ColorConvert.hsl.hex([currentHexHSL[0], currentHexHSL[1], 30]);
    },

    hspBackground: function() {
      const currentHexLab = ColorConvert.hex.lab.raw(this.currentHex);
      
      return ColorConvert.rgb.hex(
          ColorSpaces.hsluv.rgb([this.color.h, this.color.s, this.color.l])
        );




    },

    lightenedhslVsWhite: function() {
      // Check current contrast; decide if we should go dark or go light
      const baseHex = "ffffff";
      const currentHexLab = ColorConvert.hex.lab.raw(this.currentHex);
      const baseLab = ColorConvert.hex.lab.raw(baseHex);

      let color1 = new colorlab.CIELAB(...currentHexLab);
      let color2 = new colorlab.CIELAB(...baseLab);

      let currentContrast = colorlab.CIEDE2000(color1, color2);

      const currentHexhsl = ColorConvert.hex.hsl(this.currentHex);

      let k = 1;
      let darkenedhslLab;

      if (currentContrast >= 15) {
        while (currentContrast >= 15) {
          darkenedhslLab = ColorConvert.hsl.lab.raw([
            currentHexhsl[0],
            currentHexhsl[1],
            currentHexhsl[2] + k
          ]);

          color1 = new colorlab.CIELAB(...darkenedhslLab);
          color2 = new colorlab.CIELAB(...baseLab);
          currentContrast = colorlab.CIEDE2000(color1, color2);
          k++;
        }
      } else {
        while (currentContrast <= 15) {
          darkenedhslLab = ColorConvert.hsl.lab.raw([
            currentHexhsl[0],
            currentHexhsl[1],
            currentHexhsl[2] - k
          ]);

          color1 = new colorlab.CIELAB(...darkenedhslLab);
          color2 = new colorlab.CIELAB(...baseLab);
          currentContrast = colorlab.CIEDE2000(color1, color2);
          k++;
        }
      }
      console.log("background contrast = " + currentContrast);
      return ColorConvert.lab.hex(darkenedhslLab);
    },

    lightenedhslVsbackground: function() {
      // Check current contrast; decide if we should go dark or go light
      const baseHex = this.lightenedhslVsWhite;
      const currentHexLab = ColorConvert.hex.lab.raw(this.currentHex);
      const baseLab = ColorConvert.hex.lab.raw(baseHex);

      let color1 = new colorlab.CIELAB(...currentHexLab);
      let color2 = new colorlab.CIELAB(...baseLab);

      let currentContrast = colorlab.CIEDE2000(color1, color2);

      const currentHexhsl = ColorConvert.hex.hsl(this.currentHex);

      let k = 1;
      let darkenedhslLab;

      if (currentContrast > 60) {
        while (currentContrast > 60) {
          darkenedhslLab = ColorConvert.hsl.lab.raw([
            currentHexhsl[0],
            currentHexhsl[1],
            currentHexhsl[2] + k
          ]);

          color1 = new colorlab.CIELAB(...darkenedhslLab);
          color2 = new colorlab.CIELAB(...baseLab);
          currentContrast = colorlab.CIEDE2000(color1, color2);
          k++;
        }
      } else {
        while (currentContrast <= 60) {
          darkenedhslLab = ColorConvert.hsl.lab.raw([
            currentHexhsl[0],
            currentHexhsl[1],
            currentHexhsl[2] - k
          ]);

          color1 = new colorlab.CIELAB(...darkenedhslLab);
          color2 = new colorlab.CIELAB(...baseLab);
          currentContrast = colorlab.CIEDE2000(color1, color2);
          k++;
        }
      }

      console.log("text contrast = " + currentContrast);
      return ColorConvert.lab.hex(darkenedhslLab);
    },

    lightenedhsvVsbackground: function() {
      const baseHex = this.lightenedhslVsWhite;
      const baseLab = ColorConvert.hex.lab.raw(baseHex);

      // let color1 = new colorlab.CIELAB(...currentHexLab);
      // let color2 = new colorlab.CIELAB(...baseLab);

      let currentContrast = 0;

      const currentHexhsv = ColorConvert.hex.hsv(this.lightenedhslVsWhite);

      // const currentHexhsl = ColorConvert.hex.hsl(this.currentHex);
      const originalHexhsv = ColorConvert.hex.hsv(this.currentHex);

      // console.log("hello 2 " + currentHexhsv);
      // console.log("hello 3 " + currentHexhsl);

      let k = 1;
      let darkenedhslLab;
      let darkenedHSV;

      while (currentContrast <= 60) {
        darkenedHSV = [
          currentHexhsv[0],
          originalHexhsv[1] * 0.75,
          currentHexhsv[2] - k
        ];

        darkenedhslLab = ColorConvert.hsv.lab.raw(darkenedHSV);

        const color1 = new colorlab.CIELAB(...darkenedhslLab);
        const color2 = new colorlab.CIELAB(...baseLab);
        currentContrast = colorlab.CIEDE2000(color1, color2);
        k++;
      }

      console.log("text contrast = " + currentContrast);
      return ColorConvert.hsv.hex(darkenedHSV);
    }
  },
  methods: {},
  data: function() {
    return {
      currentHex: "198cff",
      colors: "#1CA085"
    };
  }
};
</script>

<style scoped>

.single {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.color-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.colorInput {
  margin: 0 16px 16px;
}

.currentColor {
  display: block;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin: 16px;
}

.buttons {

}

.button {
  display: inline-block;
  padding: 16px 20px;
  border-radius: 8px;
  color: black;
  font-size: 24px;
  line-height: 32px;
  font-family: "rawline", Helvetica Neue, Arial, sans-serif;
  font-weight: 700;
}

.button:not(:first-child) {
  margin-left: 16px;
}


</style>
