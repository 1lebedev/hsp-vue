import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customString: "Hello bitchezz",
    colorsPalette: [
      {
        index: 0,
        hex: "FECD50",
        h: 100,
        s: 80,
        l: 70
      },
      {
        index: 1,
        hex: "4F8EF2",
        h: 200,
        s: 80,
        l: 70
      },
      {
        index: 2,
        hex: "239F60",
        h: 50,
        s: 80,
        l: 70
      }
    ],
    backgroundColor: "f5f5f5",
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
    changePaletteHSLuv(state, payload) {
      state.colorsPalette[payload.index].h = payload.h,
      state.colorsPalette[payload.index].s = payload.s,
      state.colorsPalette[payload.index].l = payload.l
    },
    addColor(state) {
      const lastColor = state.colorsPalette[state.colorsPalette.length - 1];
      console.log(lastColor);
      // lastColor.index = lastColor.index + 1;
      // state.colorsPalette.push({
        // lastColor
      // });
      // state.colorsPalette[state.colorsPalette.length - 1].index += 1;
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
