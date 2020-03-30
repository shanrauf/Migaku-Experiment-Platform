import ParticipantRepository from '@/api/ParticipantRepository';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { RouteConfig, Route } from 'vue-router';

Vue.use(VueRouter);

import store from '@/store';
import { AppPageNotFound } from '@/components';
import config from '@/config/index.js';

import landingRoutes from '@/features/landing/routes';
import dashboardRoutes from '@/features/dashboard/routes';
import surveyRoutes from '@/features/survey/routes';
import experimentRoutes from '@/features/experiment/routes';
import adminRoutes from '@/features/admin/routes';
import visualizationRoutes from '@/features/results-visualization/routes';

const routes: RouteConfig[] = [
  ...landingRoutes,
  ...dashboardRoutes,
  ...surveyRoutes,
  ...experimentRoutes,
  ...adminRoutes,
  ...visualizationRoutes,
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
  ParticipantRepository.me()
    .then(result => {
      next();
    })
    .catch(err => {
      window.location.replace(
        `${config.ROOT_API_URL}/api/auth/discord?redirect=${config.ROOT_FRONTEND_URL}${to.path}`
      );
    });
}

routes.forEach(route => {
  route.beforeEnter = (to, from, next) => {
    document.title = route.meta.title;
    store.dispatch('common/updateTitle', route.meta.title);
    store.dispatch('common/updateLayout', route.meta.layout);

    // Auth navigation guard.
    if (!route.meta.isPublic) {
      return guardRoute(to, from, next);
    }

    next();
  };
});

const router = new VueRouter({ mode: 'history', routes });

export default router;
