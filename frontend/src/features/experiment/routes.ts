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
    isPublic: false
  },
  {
    name: 'surveys',
    path: '/experiments/:experimentId/surveys',
    component: () =>
      import(
        /* webpackChunkName: "experiment" */ '@/features/experiment/survey-list/SurveyList.vue'
      ),
    title: 'Surveys | MIA Experiments',
    layout: 'DefaultLayout',
    isPublic: false
  }
];

export default experimentRoutes;
