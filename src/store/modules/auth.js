/* eslint-disable */
import axiosClient from "@/api/axiosClient";

const state = {
  user: null,
  token: "",
};

const getters = {};

const mutations = {
  setAuth(state, auth) {
    state.user = auth.user;
    state.token = auth.token;
  },
};

const actions = {
  async register({ commit }, registerData) {
    const response = await axiosClient.post("/user/register", registerData);
    commit("setAuth", response.data);

    localStorage.setItem("vue-todo-app", JSON.stringify(response.data));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
