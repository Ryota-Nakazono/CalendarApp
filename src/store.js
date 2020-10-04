import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    name: "",
    details: "",
    start: "",
    end: ""
  },
  getters: {
    getEventId: state => state.id,
    getEventName: state => state.name,
    getEventDetails: state => state.details,
    getEventStart: state => state.start,
    getEventEnd: state => state.end
  },
  mutations: {
    eventId(state, todayEventId) {
      state.id = todayEventId;
    },
    eventName(state, todayEventName) {
      state.name = todayEventName;
    },
    eventDetails(state, todayEventDetails) {
      state.details = todayEventDetails;
    },
    eventStart(state, todayEventStart) {
      state.start = todayEventStart;
    },
    eventEnd(state, todayEventEnd) {
      state.end = todayEventEnd;
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
    }
  },
  actions: {
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
    }
  }
});
