import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showConsole: true
  },
  mutations: {
    toggleConsole: state => { state.showConsole = !state.showConsole }
  },
  actions: {
    pushToConsole: (_, message) => { console.log(message + '\n') }
  },
  modules: {
  }
})
