import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    name: "",
    details: "",
    start: "",
    startTime: "",
    end: "",
    endTime: "",
    color: ""
  },
  getters: {
    getEventId: state => state.id,
    getEventName: state => state.name,
    getEventDetails: state => state.details,
    getEventStart: state => state.start,
    getEventStartTime: state => state.startTime,
    getEventEnd: state => state.end,
    getEventEndTime: state => state.endTime,
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
    todayEventStartTime(state, startTime) {
      state.startTime = startTime;
    },
    todayEventEnd(state, end) {
      state.end = end;
    },
    todayEventEndTime(state, endTime) {
      state.endTime = endTime;
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
    updateStartTime(state, newStartTime) {
      state.startTime = newStartTime;
    },
    updateEnd(state, newEnd) {
      state.end = newEnd;
    },
    updateEndTime(state, newEndTime) {
      state.endTime = newEndTime;
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
    todayEventStartTime({ commit }, startTime) {
      commit("todayEventStartTime", startTime);
    },
    todayEventEnd({ commit }, end) {
      commit("todayEventEnd", end);
    },
    todayEventEndTime({ commit }, endTime) {
      commit("todayEventEndTime", endTime);
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
    updateStartTime({ commit }, newStartTime) {
      commit("updateStartTime", newStartTime);
    },
    updateEnd({ commit }, newEnd) {
      commit("updateEnd", newEnd);
    },
    updateEndTime({ commit }, newEndTime) {
      commit("updateEndTime", newEndTime);
    },
    updateColor({ commit }, newColor) {
      commit("updateColor", newColor);
    }
  }
});
