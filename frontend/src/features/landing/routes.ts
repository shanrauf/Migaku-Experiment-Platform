const landingRoutes = [
  {
    name: 'landing',
    path: '/',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '@/features/landing/main.vue'),
    title: 'Landing | MIA Experiments',
    layout: 'DefaultLayout',
    isPublic: true
  }
];

export default landingRoutes;
