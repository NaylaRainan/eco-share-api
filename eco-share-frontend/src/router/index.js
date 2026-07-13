import { createRouter, createWebHistory } from "vue-router";

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Items from "../views/Items.vue";
import Rentals from "../views/Rentals.vue";
import History from "../views/History.vue";
import Profile from "../views/Profile.vue";
import Invoice from "../views/Invoice.vue"

import MainLayout from "../layouts/MainLayout.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },

  {
    path: "/",
    component: MainLayout,
    meta: { requiresAuth: true },

    children: [
      {
        path: "dashboard",
        component: Dashboard,
      },
      {
        path: "items",
        component: Items,
      },
      {
        path: "rentals",
        component: Rentals,
      },
      {
        path: "history",
        component: History,
      },
      {
        path: "profile",
        component: Profile,
      },
      {
        path:"/invoice/:id",
        component:Invoice
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return "/";
  }

  if (to.path === "/" && token) {
    return "/dashboard";
  }

  return true;
});

export default router;