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
  async register({ commit }, registerData) {
    try {
      commit("setLoading", true);
      const response = await axiosClient.post("/user/register", registerData);

      commit("auth/setAuth", response.data, { root: true });
      localStorage.setItem("vue-todo-app", JSON.stringify(response.data));

      router.push({ name: "todo" });

      commit(
        "notification/triggerToast",
        { status: "success", message: "Register successfully" },
        { root: true }
      );
    } catch (err) {
      commit(
        "notification/triggerToast",
        { status: "danger", message: "Email is already exist" },
        { root: true }
      );
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
