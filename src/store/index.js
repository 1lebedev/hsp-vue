import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    customString: "Hello bitchezz",
    colorsPalette: [
      {
        index: 0,
        h: 100,
        s: 95,
        l: 70
      },
      {
        index: 1,
        h: 200,
        s: 95,
        l: 70
      },
      {
        index: 2,
        h: 50,
        s: 95,
        l: 70
      }
    ],
    backgroundColor: "fff",
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
    },
    changePaletteHSLuv(state, payload) {
      (state.colorsPalette[payload.index].h = payload.h),
        (state.colorsPalette[payload.index].s = payload.s),
        (state.colorsPalette[payload.index].l = payload.l);
    },
    addColor(state) {
      let lastColor = Object.assign(
        {},
        state.colorsPalette[state.colorsPalette.length - 1]
      );
      lastColor.index += 1;
      // console.log(lastColor);

      state.colorsPalette.push(lastColor);
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
