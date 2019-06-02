<template lang="pug">
.single
  .colorInput
    input(v-model="currentHex" placeholder="Enter HEX")
  .button(v-bind:style="{ backgroundColor: '#' + currentHex}") Hello world
  .button(v-bind:style="{ backgroundColor: '#' + lightenedhslVsWhite, color: '#' + lightenedhslVsbackground}") Hello world
  .button(v-bind:style="{ backgroundColor: '#' + lightenedhslVsWhite, color: '#' + lightenedhsvVsbackground}") Hello world
  //- .button(v-bind:style="{ backgroundColor: '#' + lightenedhslVsbackground}") Hello world
  //- .label {{lightenedhsl}}
</template>

<script>
import colorlab from "colorlab";
import ColorConvert from "color-convert";

export default {
  name: "Single",
  components: {},
  computed: {
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
      currentHex: "198cff"
    };
  }
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 16px 20px;
  border-radius: 8px;
  color: black;
  font-size: 18px;
  line-height: 24px;
  font-family: "rawline", Helvetica Neue, Arial, sans-serif;
  font-weight: 600;
  margin-right: 8px;
}

.colorInput {
  margin-bottom: 32px;
}
</style>
