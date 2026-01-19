import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginPortal from '../components/LoginPortal.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Portfolio | Creative Developer',
      description: 'Welcome to my portfolio',
      requiresAuth: false
    }
  },
  {
    path: '/secret-portal',
    name: 'LoginPortal',
    component: LoginPortal,
    meta: {
      title: 'Portal Access',
      description: 'Secure portal access',
      requiresAuth: false,
      hideFromNav: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Simple navigation guard - no async operations
router.beforeEach((to, from, next) => {
  // Just allow navigation, auth check happens in component
  next()
})

// Update document title on route change
router.afterEach((to) => {
  document.title = to.meta.title || 'Portfolio'
})

export default router
