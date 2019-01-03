import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customString: "Hello bitchezz",
    colorsPalette: [
      {
        index: 0,
        hex: "FECD50"
      },
      {
        index: 1,
        hex: "4F8EF2"
      },
      {
        index: 2,
        hex: "239F60"
      },
      {
        index: 3,
        hex: "DB5149"
      }
    ],
    backgroundColor: "cccccc",
    dayThemeColors: {
      ff: "111111ff",
      33: "11111133",
      66: "11111166"
    },
    nightThemeColors: {
      ff: "ffffffff",
      33: "ffffff33",
      66: "ffffff66"
    }
  },
  mutations: {
    changePaletteColor(state, payload) {
      state.colorsPalette[payload.index].hex = payload.hex;
      // index, newHex
    },
    addColor(state) {
      state.colorsPalette.push({
        index: state.colorsPalette.length,
        hex: state.colorsPalette[state.colorsPalette.length - 1].hex
      });
    },
    changeBackgroundColor(state, payload) {
      state.backgroundColor = payload;
    }
  },
  actions: {
    addThreeAsync({ commit }) {
      setTimeout(() => commit("add", 3), 3000);
    }
  },
  getters: {}
});
