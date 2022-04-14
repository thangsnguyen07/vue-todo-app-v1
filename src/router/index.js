/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import TodoView from "../views/TodoView.vue";
import getUserFromLocal from "@/utils/getUserFromLocal";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todo",
    component: TodoView,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ProfileView.vue"),
    meta: {
      requireAuth: true,
    },
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

router.beforeEach((to, from, next) => {
  const user = getUserFromLocal();
  if ((to.name === "login" || to.name === "register") && user) {
    next({ name: "todo" });
    return;
  }

  if ((to.name === "login" || to.name === "register") && !user) {
    next();
    return;
  }

  if (to.meta.requireAuth) {
    if (user) {
      next();
    } else {
      next({ name: "login" });
    }
  }
});

export default router;
