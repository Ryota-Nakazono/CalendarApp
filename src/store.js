import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    name: "",
    details: "",
    start: "",
    end: "",
    color: ""
  },
  getters: {
    getEventId: state => state.id,
    getEventName: state => state.name,
    getEventDetails: state => state.details,
    getEventStart: state => state.start,
    getEventEnd: state => state.end,
    getEventColor: state => state.color
  },
  mutations: {
    todayEventId(state, id) {
      state.id = id;
    },
    todayEventName(state, name) {
      state.name = name;
    },
    todayEventDetails(state, details) {
      state.details = details;
    },
    todayEventStart(state, start) {
      state.start = start;
    },
    todayEventEnd(state, end) {
      state.end = end;
    },
    todayEventColor(state, color) {
      state.color = color;
    },
    updateName(state, newName) {
      state.name = newName;
    },
    updateDetails(state, newDetails) {
      state.details = newDetails;
    },
    updateStart(state, newStart) {
      state.start = newStart;
    },
    updateEnd(state, newEnd) {
      state.end = newEnd;
    },
    updateColor(state, newColor) {
      state.color = newColor;
    }
  },
  actions: {
    todayEventId({ commit }, Id) {
      commit("todayEventId", Id);
    },
    todayEventName({ commit }, name) {
      commit("todayEventName", name);
    },
    todayEventDetails({ commit }, details) {
      commit("todayEventDetails", details);
    },
    todayEventStart({ commit }, start) {
      commit("todayEventStart", start);
    },
    todayEventEnd({ commit }, end) {
      commit("todayEventEnd", end);
    },
    todayEventColor({ commit }, color) {
      commit("todayEventColor", color);
    },
    updateName({ commit }, newName) {
      commit("updateName", newName);
    },
    updateDetails({ commit }, newDetails) {
      commit("updateDetails", newDetails);
    },
    updateStart({ commit }, newStart) {
      commit("updateStart", newStart);
    },
    updateEnd({ commit }, newEnd) {
      commit("updateEnd", newEnd);
    },
    updateColor({ commit }, newColor) {
      commit("updateColor", newColor);
    }
  }
});
