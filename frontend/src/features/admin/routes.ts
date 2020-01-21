import { RouteConfig } from 'vue-router';

const adminRoutes: RouteConfig[] = [
  {
    name: 'status',
    path: '/admin/dashboard',
    component: () =>
      import(/* webpackChunkName: "admin" */ '@/features/dashboard/main.vue'),
    meta: {
      title: 'Admin Dashboard | MIA Experiments',
      layout: 'DefaultLayout',
      isPublic: true
    }
  }
];

export default adminRoutes;
