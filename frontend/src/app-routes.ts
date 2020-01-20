import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouteConfig, Route } from 'vue-router';

Vue.use(VueRouter);

import store from '@/store';
import { AppPageNotFound } from '@/components';

import landingRoutes from '@/features/landing/routes';
import dashboardRoutes from '@/features/dashboard/routes';
import surveyRoutes from '@/features/survey/routes';
import experimentRoutes from '@/features/experiment/routes';

const routes: RouteConfig[] = [
  ...landingRoutes,
  ...dashboardRoutes,
  ...surveyRoutes,
  ...experimentRoutes,
  {
    path: '*',
    name: 'page-not-found',
    component: AppPageNotFound,
    meta: {
      title: '404 Page | MIA Experiments',
      layout: 'DefaultLayout',
      isPublic: true
    }
  }
];

/**
 * Guard the route from unauthorized users.
 */
function guardRoute(to: Route, from: Route, next: Function): void {
  // work-around to get to the Vuex store (as of Vue 2.0)
  const isLoggedIn = true;
  if (!isLoggedIn) {
    next({ path: '/', query: { redirect: to.fullPath } });
  } else {
    next();
  }
}

routes.forEach(route => {
  route.beforeEnter = (to, from, next) => {
    document.title = route.meta.title;
    store.dispatch('common/updateTitle', route.meta.title);
    store.dispatch('common/updateLayout', route.meta.layout);

    // Auth navigation guard.
    if (!route.meta.isPublic) return guardRoute(to, from, next);

    next();
  };
});

const router = new VueRouter({ mode: 'history', routes });

// Isn't the following hook better to change document title, etc instead of looping over the routes?

router.beforeEach((to, _, next) => {
  const isAuthenticated = true; // implement
  if (to.name === 'landing' && isAuthenticated) {
    router.push('/dashboard');
  }
  next();
});

export default router;
