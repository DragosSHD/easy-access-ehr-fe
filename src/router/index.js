import { createRouter, createWebHistory } from 'vue-router'
import { getUser } from "../util/util.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ]
});

router.beforeEach((to) => {
  const user = getUser();
  if (to.name !== 'login' && to.name !== 'register' && !user) {
    return { name: 'login' }
  }
  if ((to.name === 'login' || to.name === 'register') && user) {
    return { name: 'home' }
  }

  return true;
})

export default router
