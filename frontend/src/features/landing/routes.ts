import { RouteConfig } from 'vue-router';

const landingRoutes: RouteConfig[] = [
  {
    name: 'landing',
    path: '/',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/features/landing/main.vue'),
    meta: {
      title: 'Landing | MIA Experiments',
      layout: 'DefaultLayout',
      isPublic: true
    }
  }
];

export default landingRoutes;
