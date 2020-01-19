const dashboardRoutes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'
      ),
    title: 'Dashboard | MIA Experiments',
    layout: 'DashboardLayout',
    isPublic: true
  }
];

export default dashboardRoutes;
