/* eslint-disable */
import getUserFromLocal from "@/utils/getUserFromLocal";

const state = {
  user: null,
};

const getters = {};

const mutations = {
  setAuth(state, auth) {
    state.user = auth.user;
  },
};

const actions = {
  async getUser({ commit }) {
    const user = getUserFromLocal();
    commit("setAuth", { user: user });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
