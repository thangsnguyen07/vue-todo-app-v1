/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import TodoView from "../views/TodoView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todo",
    component: TodoView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RegisterView.vue"),
  },
  {
    path: "*",
    redirect: {
      name: "login",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
