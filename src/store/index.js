import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		customString: "Hello bitchezz",
		colorsPalette: [{
			index: 0,
			hex: '198cff'
		},
		{
			index: 1,
			hex: '999999'
		}]
	},
	mutations: {
		changePaletteColor(state, payload) {	
			state.colorsPalette[payload.index].hex = payload.hex;
			// index, newHex
		},
		addColor(state) {
			state.colorsPalette.push({
				index: state.colorsPalette.length,
				hex: state.colorsPalette[state.colorsPalette.length-1].hex
			})
		}
	},
	actions: {
		addThreeAsync({ commit }) {
			setTimeout(() => commit('add', 3), 3000);
		}
	}
})