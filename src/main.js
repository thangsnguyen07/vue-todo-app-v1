import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Validators
import "./validators";

Vue.config.productionTip = false;
// Load user
store.dispatch("auth/getUser");

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
