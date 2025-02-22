import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import QuizView from '../views/QuizView.vue';
import ResultView from '../views/ResultView.vue';
import AdminView from '../views/AdminView.vue';
import ResultPage from '../components/ResultPage.vue';
import ClosePage from '../components/ClosePage.vue';
import { auth } from '../firebase';

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
    path: '/close',
    name: 'close',
    component: ClosePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

let isAuthChecked = false;

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (!isAuthChecked) {
    auth.onAuthStateChanged(user => {
      const isAuthenticated = !!user;
      isAuthChecked = true;

      if (requiresAuth && !isAuthenticated) {
        next('/auth');
      } else if (to.path === '/admin') {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
          next('/');
        } else {
          next();
        }
      } else {
        next();
      }
    });
  } else {
    const isAuthenticated = !!auth.currentUser;

    if (requiresAuth && !isAuthenticated) {
      next('/auth');
    } else if (to.path === '/admin') {
      const isAdmin = localStorage.getItem('isAdmin') === 'true';
      if (!isAdmin) {
        next('/');
      } else {
        next();
      }
    } else {
      next();
    }
  }
});

export default router;