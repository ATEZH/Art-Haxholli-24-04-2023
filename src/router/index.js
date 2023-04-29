import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import Archive from '../views/Archive.vue'
import Help from '../views/Help.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/students',
    name: 'Students',
    component: Students,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let isAuthenticated = sessionStorage.getItem('admin')
  if (requiresAuth) {
    if (!isAuthenticated && requiresAuth) {
      router.push({ name: "Login" })
    } else {
      next()
    }
  } else {
    next()
  }
  if (!requiresAuth && isAuthenticated){
    router.push({ name: "Home" })
  }
})

export default router
