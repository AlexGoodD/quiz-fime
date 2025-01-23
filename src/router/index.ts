import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AuthView from '../views/AuthView.vue';
import QuizView from '../views/QuizView.vue';
import AboutView from '../views/AboutView.vue';
import ResultView from '../views/ResultView.vue';
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
    path: '/about',
    name: 'about',
    component: AboutView,
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  auth.onAuthStateChanged(user => {
    const isAuthenticated = !!user;

    if (requiresAuth && !isAuthenticated) {
      next('/auth');
    } else {
      next();
    }
  });
});

export default router;