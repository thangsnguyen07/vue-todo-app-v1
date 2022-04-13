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
      return true;
    } catch (err) {
      return false;
    }
  },

  async logout({ commit }) {
    try {
      const response = await axiosClient.post("/user/logout");
      if (response.data.success) {
        commit("setAuth", { auth: null });
        localStorage.removeItem("vue-todo-app");
      }

      return response.data;
    } catch (err) {
      return err.response.data;
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
