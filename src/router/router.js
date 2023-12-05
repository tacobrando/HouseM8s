import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/composables/auth";
import Home from "@/pages/Home.vue";
import Chores from "@/pages/Chores.vue";
import Groceries from "@/pages/Groceries.vue";
import Login from "@/pages/Login.vue";
import Error from '@/pages/Error.vue'


export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/chores',
      name: 'Chores',
      component: Chores,
      meta: { requiresAuth: true }
    },
    {
      path: '/groceries',
      name: 'Groceries',
      component: Groceries,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Error',
      component: Error,
      meta: { requiresAuth: false }
    }
  ]
}) 

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authStore.isLoggedIn && !await authStore.isAuthenticated()) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else if (to.path === '/login') {
    if (authStore.isLoggedIn || await authStore.isAuthenticated()) {
      next({ path: '/' });
    } else {
      next();
    }
  } else if (to.matched.length === 0) {
    if (authStore.isLoggedIn || await authStore.isAuthenticated()) {
      next({ path: '/' });
    } else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
});
