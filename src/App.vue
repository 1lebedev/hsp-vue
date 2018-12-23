<template>
  <div id="app" v-bind:class="'mode-' + currentTabComponent">
    <div class="button-group">
      <button
        v-for="tab in tabs"
        v-bind:key="tab"
        v-bind:class="['tab-button', { active: currentTab === tab }]"
        v-on:click="currentTab = tab">
        {{ tab }}
      </button>
    </div>

<transition name="fade">
  <keep-alive>
    <component
      v-bind:is="currentTabComponent"
      class="tab">
    </component>
  </keep-alive>
</transition>


  </div> <!--app end -->
</template>

<script>
import Spectrum from "./components/Spectrum.vue";
import Palette from "./components/Palette.vue";

export default {
  name: "app",
  components: {
    Spectrum,
    Palette
  },
  data: function()  {
    return {
    currentTab: 'Palette',
    tabs: ['Palette', 'Spectrum']
    }
  },
  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase();
    }
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
  font-size: 12px;
}

body {
  margin: 0;
  padding: 0;
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
  transition: all ease-out .3s;
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
    position: absolute;
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
  padding: 96px 44px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
