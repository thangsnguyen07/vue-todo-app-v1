/* eslint-disable */
import axiosClient from "@/api/axiosClient";
import router from "@/router";

const state = {
  loading: false,
};

const mutations = {
  setLoading: (state, status) => {
    state.loading = status;
  },
};

const actions = {
  async logout({ commit }) {
    try {
      commit("setLoading", true);
      const response = await axiosClient.post("/user/logout");
      if (response.data.success) {
        commit("auth/setAuth", { user: null }, { root: true });
        localStorage.removeItem("vue-todo-app");

        commit(
          "notification/triggerToast",
          { status: "success", message: "Logout succesfully" },
          { root: true }
        );

        router.push({ name: "login" });

        return true; // success
      }
    } catch (err) {
      commit(
        "notification/triggerToast",
        { status: "danger", message: "Logout failed" },
        { root: true }
      );

      return false;
    } finally {
      commit("setLoading", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
