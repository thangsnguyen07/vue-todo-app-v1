/* eslint-disable */
import axiosClient from "@/api/axiosClient";

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
  async register({ commit }, registerData) {
    try {
      const response = await axiosClient.post("/user/register", registerData);
      commit("setAuth", response.data);
      localStorage.setItem("vue-todo-app", JSON.stringify(response.data));
      return true;
    } catch (err) {
      return false;
    }
  },

  async login({ commit }, loginData) {
    try {
      const response = await axiosClient.post("/user/login", loginData);
      commit("setAuth", response.data);
      localStorage.setItem("vue-todo-app", JSON.stringify(response.data));
      console.log(response);
      return true;
    } catch (err) {
      return false;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
