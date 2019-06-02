<template>
  <div
    id="app"
    v-bind:class="'mode-' + currentTabComponent"
    v-bind:style="{backgroundColor: '#' + backgroundColor}"
  >
    <!-- <div class="sticky-header" v-bind:style="{backgroundColor: '#' + backgroundColor}">
      <div class="button-group">
        <button
          v-for="tab in tabs"
          v-bind:key="tab"
          v-bind:class="['tab-button', { active: currentTab === tab }]"
          v-on:click="currentTab = tab"
        >{{ tab }}</button>
      </div>
    </div> -->

    <transition name="fade">
      <keep-alive>
        <component v-bind:is="currentTabComponent" class="tab"></component>
      </keep-alive>
    </transition>
  </div>
  <!--app end -->
</template>

<script>
// import Spectrum from "./components/Spectrum.vue";
import SpectrumLightness from "./components/SpectrumLightness.vue";
import SpectrumContrast from "./components/SpectrumContrast.vue";
import Palette from "./components/Palette.vue";
import Single from "./components/Single.vue";

export default {
  name: "app",
  components: {
    SpectrumContrast,
    SpectrumLightness,
    Palette,
    Single
  },
  data: function() {
    return {
      currentTab: "Single",
      tabs: ["Single", "Palette", "SpectrumContrast", "SpectrumLightness"]
    };
  },
  computed: {
    currentTabComponent: function() {
      return this.currentTab;
    },
    backgroundColor() {
      return this.$store.state.backgroundColor;
    }
  }
};
</script>

<style>
@import "https://cdn.rawgit.com/h-ibaldo/Raleway_Fixed_Numerals/master/css/rawline.css";

#app {
  font-family: "rawline", Helvetica Neue, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #999;
  font-size: 12px;
}

html,
body,
#app {
  min-height: 100%;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.tab-button {
  padding: 0.6em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
  outline: none;
  color: #666;
  font-size: 1em;
  line-height: 1.3em;
  font-weight: 600;
  transition: all ease-out 0.3s;
}

.tab-button:hover {
  color: #000;
}

.tab-button:pressed {
  transform: scale(0.7);
}

.tab-button.active {
  background: #4d4d4d;
  color: #fff;
}

.button-group {
  /* position: fixed; */
  top: 24px;
  left: 28px;
  padding: 4px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 6px 0 #00000033;
  z-index: 9999;
}

.mode-palette .button-group {
  box-shadow: none;
  background: transparent;
}

.tab {
  padding: 32px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.sticky-header {
  position: fixed;
  top: 0px;
  width: 100%;
  padding: 24px 24px;
  box-sizing: border-box;
  z-index: 9000;
  display: flex;
}

.mode-spectrum .sticky-header {
  background: transparent !important;
}
</style>
