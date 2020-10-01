import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: ""
  },
  mutations: {
    eventCommit(state, name) {
      state.name = name;
    }
  }
});
