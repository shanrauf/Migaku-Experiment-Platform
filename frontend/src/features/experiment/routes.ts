import { RouteConfig } from 'vue-router';

const experimentRoutes: RouteConfig[] = [
  {
    name: 'experiment',
    path: '/experiments/:experimentId',
    component: () =>
      import(
        /* webpackChunkName: "experiment" */ '@/features/experiment/main.vue'
      ),
    meta: {
      title: 'Experiment | MIA Experiments',
      layout: 'DefaultLayout',
      isPublic: false
    }
  },
  {
    name: 'surveys',
    path: '/experiments/:experimentId/surveys',
    component: () =>
      import(
        /* webpackChunkName: "experiment" */ '@/features/experiment/survey-list/SurveyList.vue'
      ),
    meta: {
      title: 'Surveys | MIA Experiments',
      layout: 'DefaultLayout',
      isPublic: false
    }
  }
];

export default experimentRoutes;
