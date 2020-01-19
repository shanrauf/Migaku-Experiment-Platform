import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from '@/store';
import { AppPageNotFound } from '@/components';

import landingRoutes from '@/features/landing/routes';
import dashboardRoutes from '@/features/dashboard/routes';
import surveyRoutes from '@/features/survey/routes';
import experimentRoutes from '@/features/experiment/routes';

const routes = [
  ...landingRoutes,
  ...dashboardRoutes,
  ...surveyRoutes,
  ...experimentRoutes,
  {
    path: '*',
    name: 'page-not-found',
    component: AppPageNotFound,
    title: '404 Page | MIA Experiments',
    layout: 'DefaultLayout',
    isPublic: true
  }
];

/**
 * Guard the route from unauthorized users.
 *
 * @param  {Route}    to   The route we want to access.
 * @param  {Route}    from The route from which we are coming from.
 * @param  {Function} next Callback for passing a route to be called next.
 * @return {void}
 */
function guardRoute(to, from, next) {
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
    // Setup some per-page stuff.
    document.title = route.title;
    store.dispatch('common/updateTitle', route.title);
    store.dispatch('common/updateLayout', route.layout);

    // Auth navigation guard.
    if (!route.isPublic) return guardRoute(to, from, next);

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
