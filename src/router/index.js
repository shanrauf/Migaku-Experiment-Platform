import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from '@/store';

const HomeView = () => import('@/views/HomeView.vue');
const ExperimentsView = () => import('@/views/ExperimentsView.vue');
const ExperimentView = () => import('@/views/ExperimentView.vue');
const ExperimentDashboard = () => import('@/views/ExperimentDashboard.vue');
const SurveysView = () => import('@/views/SurveysView.vue');
const SurveyView = () => import('@/views/SurveyView.vue');
const ParticipantsView = () => import('@/views/ParticipantsView.vue');
const CreateExperimentView = () => import('@/views/CreateExperimentView.vue');
const ErrorView = () => import('@/views/ErrorView.vue');

const routes = [
  {
    path: '/',
    meta: {
      name: 'home',
      title: 'MIA Experiments',
      requiresAuth: false,
      requiresAdmin: false
    },
    component: HomeView
  },
  {
    path: '/experiments',
    meta: {
      name: 'experiments',
      title: 'MIA Experiments',
      requiresAuth: true,
      requiresAdmin: false
    },
    component: ExperimentsView
  },
  {
    path: '/experiments/create',
    meta: {
      name: 'createExperiment',
      title: 'Create an Experiment | MIA Experiments',
      requiresAuth: true,
      requiresAdmin: false
    },
    component: CreateExperimentView
  },
  {
    path: '/experiments/:experiment',
    meta: {
      name: 'experiments',
      title: 'MIA Experiments',
      requiresAuth: true,
      requiresAdmin: false
    },
    component: ExperimentView,
    children: [
      {
        path: '',
        meta: {
          name: 'dashboard',
          title: 'MIA Experiment Dashboard',
          requiresAuth: true,
          requiresAdmin: false
        },
        component: ExperimentDashboard
      },
      {
        path: 'edit',
        meta: {
          name: 'editExperiment',
          title: 'Edit MIA Experiment',
          requiresAuth: true,
          requiresAdmin: false
        },
        component: ExperimentDashboard
      },
      {
        path: 'participants',
        meta: {
          name: 'participants',
          title: 'Participants | MIA Experiment',
          requiresAuth: true,
          requiresAdmin: false
        },
        component: ParticipantsView
      },
      {
        path: 'surveys',
        meta: {
          name: 'surveys',
          title: 'MIA Experiment Surveys',
          requiresAuth: true,
          requiresAdmin: false
        },
        component: SurveysView
      },
      {
        path: 'surveys/:survey',
        meta: {
          name: 'dashboard',
          title: 'MIA Experiment Survey',
          requiresAuth: true,
          requiresAdmin: false
        },
        component: SurveyView
      },
      {
        path: 'surveys/create',
        meta: {
          name: 'createSurvey',
          title: 'MIA Experiment Survey Builder',
          requiresAdmin: true
        },
        component: SurveyView
      },
      {
        path: 'surveys/:survey/edit',
        meta: {
          name: 'dashboard',
          title: 'MIA Experiment Dashboard',
          requiresAdmin: true
        },
        component: SurveyView
      },
      {
        path: 'surveys/:survey/view',
        meta: {
          name: 'dashboard',
          title: 'View MIA Experiment Survey',
          requiresAdmin: true
        },
        component: SurveyView
      }
    ]
  },
  { path: '*', component: ErrorView }
];

const router = new VueRouter({ mode: 'history', routes: routes });

router.beforeEach((to, _, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!store.user.isAdmin) {
      router.push('/');
    }
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.user) {
      router.push('/');
    }
  } else {
    next();
  }
});

export default router;
