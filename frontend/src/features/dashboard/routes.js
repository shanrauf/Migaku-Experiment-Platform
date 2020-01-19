const dashboardRoutes = [
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'
      ),
    title: 'Dashboard | MIA Experiments',
    layout: 'PublicLayout',
    isPublic: true
    // children: [
    //   {
    //     name: 'experiments',
    //     path: '/dashboard',
    //     component: () =>
    //       import(
    //         /* webpackChunkName: "dashboard" */ '@/features/dashboard/main.vue'
    //       ),
    //     title: 'Dashboard | MIA Experiments',
    //     layout: 'PublicLayout',
    //     isPublic: true,
    //   }
    // ]
  }
];

export default dashboardRoutes;
