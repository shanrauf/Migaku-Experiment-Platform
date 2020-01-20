import { RouteConfig } from 'vue-router';

const dashboardRoutes: RouteConfig[] = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'
      ),
    meta: {
      title: 'Dashboard | MIA Experiments',
      layout: 'DashboardLayout',
      isPublic: true
    }
  }
];

export default dashboardRoutes;
