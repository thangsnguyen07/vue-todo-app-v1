/* eslint-disable */

const state = {
  showToast: false,
  message: "Toast",
  status: "",
};

const getters = {};

const mutations = {
  triggerToast(state, { status, message }) {
    state.message = message;
    state.status = status;
    state.showToast = true;
    setTimeout(() => {
      state.showToast = false;
      state.message = "";
      state.status = "";
    }, 3000);
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
