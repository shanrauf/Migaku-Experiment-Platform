import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const HomeView = () => import('@/views/HomeView.vue');
const ExperimentsView = () => import('@/views/ExperimentsView.vue');
const ExperimentView = () => import('@/views/ExperimentView.vue');
const ExperimentDashboard = () => import('@/views/ExperimentDashboard.vue');
const SurveysView = () => import('@/views/SurveysView.vue');
const SurveyView = () => import('@/views/SurveyView.vue');
const ParticipantsView = () => import('@/views/ParticipantsView.vue');
const CustomQueryView = () => import('@/views/CustomQueryView.vue');
const ErrorView = () => import('@/views/ErrorView.vue');

const routes = [
  {
    path: '/',
    meta: {
      name: 'survey',
      title: 'MIA Survey',
      requiresAuth: true
    },
    component: HomeView
  },
  {
    path: '/experiments',
    meta: {
      name: 'experiments',
      title: 'MIA Experiments',
      requiresAuth: true
    },
    component: ExperimentsView
  },
  {
    path: '/experiments/:experiment',
    meta: {
      name: 'experiments',
      title: 'MIA Experiments',
      requiresAuth: true
    },
    component: ExperimentView,
    children: [
      {
        path: '',
        component: ExperimentDashboard
      },
      {
        path: 'surveys',
        component: SurveysView
      },
      {
        path: 'surveys/:survey',
        component: SurveyView
      }
    ]
  },
  {
    path: '/survey',
    meta: {
      name: 'survey',
      title: 'MIA Survey',
      requiresAuth: true
    },
    component: SurveyView
  },
  {
    path: '/participants',
    meta: {
      name: 'participants',
      title: 'Participants | MIA Experiment',
      requiresAuth: true
    },
    component: ParticipantsView
  },
  {
    path: '/custom',
    meta: {
      name: 'customQuery',
      title: 'Custom Query | MIA Experiment',
      requiresAuth: true
    },
    component: CustomQueryView
  },
  { path: '*', component: ErrorView }
];

const router = new VueRouter({ mode: 'history', routes: routes });

export default router;
