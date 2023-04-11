import { createRouter, createWebHistory } from 'vue-router'
import { getUser } from "../util/util.js";
import routeNames from "./routeNames.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: routeNames.HOME,
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: routeNames.LOGIN,
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: routeNames.REGISTER,
      component: () => import('../views/RegisterView.vue'),
    },
  ]
});

router.beforeEach((to) => {
  const user = getUser();
  if (to.name !== routeNames.LOGIN && to.name !== routeNames.REGISTER && !user) {
    return { name: routeNames.LOGIN }
  }
  if ((to.name === routeNames.LOGIN || to.name === routeNames.REGISTER) && user) {
    return { name: routeNames.HOME }
  }

  return true;
})

export default router
