import { createRouter, createWebHistory } from 'vue-router'
import { getUser } from "../util/util.js";
import routeNames from "./routeNames.js";
import ToastifyEs from "toastify-js/src/toastify-es.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeLayout.vue'),
      children: [
        {
          path: '/home',
          name: routeNames.HOME,
          component: () => import('../views/client/HomeView.vue'),
        },
        {
          path: '/health-records/:recordType',
          name: routeNames.HEALTH_RECORDS,
          component: () => import('../views/client/HealthRecordsView.vue'),
        },
        {
          path: '/scan-qr',
          name: routeNames.SCAN_QR,
          component: () => import('../views/doctor/ScanQr.vue'),
        },
      ]
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
    {
      path: '/:pathMatch(.*)',
      redirect: { name: routeNames.HOME }
    },
  ]
});

router.beforeEach((to) => {
  const user = getUser();
  if (to.name !== routeNames.LOGIN && to.name !== routeNames.REGISTER && !user) {
    ToastifyEs({
      text: "You need to sign in first.",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#E88080FF",
      },
      onClick: function(){} // Callback after click
    }).showToast();
    return { name: routeNames.LOGIN }
  }
  if ((to.name === routeNames.LOGIN || to.name === routeNames.REGISTER || to.path === '/') && user) {
    return { name: routeNames.HOME }
  }

  return true;
})

export default router
