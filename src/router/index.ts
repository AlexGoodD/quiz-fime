import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import QuizView from '../views/QuizView.vue'
import ResultView from '../views/ResultView.vue'
import AdminView from '../views/AdminView.vue'
import ResultPage from '../components/pages/resultPage.vue'
import ClosePage from '../components/pages/closePage.vue'
import { auth } from '@/firebase'
import QuestionsPage from '@/components/pages/questionsPage.vue'
import PosgradosPage from '@/components/pages/posgradosPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizView,
    meta: { requiresAuth: true },
  },
  {
    path: '/result',
    name: 'results',
    component: ResultView,
    meta: { requiresAuth: true },
  },
  {
    path: '/close',
    name: 'close',
    component: ClosePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/result/:id',
    name: 'result',
    component: ResultPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/questions',
    name: 'Admin questions',
    component: QuestionsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/postgrados',
    name: 'Admin postgrados',
    component: PosgradosPage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

let isAuthChecked = false

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (!isAuthChecked) {
    auth.onAuthStateChanged((user) => {
      const isAuthenticated = !!user
      isAuthChecked = true

      if (requiresAuth && !isAuthenticated) {
        next('/auth')
      } else if (to.path === '/admin') {
        const isAdmin = localStorage.getItem('isAdmin') === 'true'
        if (!isAdmin) {
          next('/')
        } else {
          next()
        }
      } else {
        next()
      }
    })
  } else {
    const isAuthenticated = !!auth.currentUser

    if (requiresAuth && !isAuthenticated) {
      next('/auth')
    } else if (to.path === '/admin') {
      const isAdmin = localStorage.getItem('isAdmin') === 'true'
      if (!isAdmin) {
        next('/')
      } else {
        next()
      }
    } else {
      next()
    }
  }
})

export default router
