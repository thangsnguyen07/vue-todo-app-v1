/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoView from "../views/TodoView.vue";
import ProfileView from "../views/ProfileView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import getUserFromLocal from "@/utils/getUserFromLocal";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HomeView,
    children: [
      {
        path: "",
        name: "todo",
        component: TodoView,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: ProfileView,
        meta: {
          requireAuth: true,
        },
      },
      {
        path: "/login",
        name: "login",
        component: LoginView,
      },
      {
        path: "/register",
        name: "register",
        component: RegisterView,
      },
    ],
  },
  {
    path: "*",
    redirect: {
      name: "todo",
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

  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (user) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    if (!user) {
      next();
    } else {
      next({ name: "todo" });
    }
  }
});

export default router;
