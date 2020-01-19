const experimentRoutes = [
  {
    name: 'experiment',
    path: '/experiments/:experimentId',
    component: () =>
      import(
        /* webpackChunkName: "experiment" */ '@/features/experiment/main.vue'
      ),
    title: 'Experiment | MIA Experiments',
    layout: 'DefaultLayout',
    isPublic: true
  }
];

export default experimentRoutes;
