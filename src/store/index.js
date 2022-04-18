import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import todo from "./modules/todo";
import account from "./modules/account";
import notification from "./modules/notification";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    account,
    todo,
    notification,
  },
  devtools: true,
});
