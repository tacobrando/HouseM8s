import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Chores from "@/pages/Chores.vue";
import Groceries from "@/pages/Groceries.vue";
import Login from "@/pages/Login.vue";


export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/chores',
      name: 'Chores',
      component: Chores
    },
    {
      path: '/groceries',
      name: 'Groceries',
      component: Groceries
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
}) 