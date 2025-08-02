import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ProfilePage from '../views/ProfilePage.vue'



const routes = [
  { path: '/login', component: LoginPage },
  { path: '/products', component: ProductsPage, meta: { requiresAuth: true } },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
  //{ path: '/profile', component: { template: '<div>Profile page</div>' }, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard pre chránené stránky
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
