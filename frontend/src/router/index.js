import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import store from '@/store';

const HomeView = () =>
  import(/* webpackChunkName: "home" */ '@/views/HomeView.vue');
const ExperimentsView = () =>
  import(/* webpackChunkName: "experiments" */ '@/views/ExperimentsView.vue');
const ExperimentView = () =>
  import(/* webpackChunkName: "experiment" */ '@/views/ExperimentView.vue');
const ExperimentDashboard = () =>
  import(
    /* webpackChunkName: "experiment" */ '@/views/ExperimentDashboard.vue'
  );
const SurveysView = () =>
  import(/* webpackChunkName: "surveys" */ '@/views/SurveysView.vue');
const SurveyView = () =>
  import(/* webpackChunkName: "survey" */ '@/views/SurveyView.vue');
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
        name: 'dashboard',
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
        name: 'editExperiment',
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
        name: 'participants',
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
        name: 'surveys',
        meta: {
          name: 'surveys',
          title: 'MIA Experiment Surveys',
          requiresAuth: false,
          requiresAdmin: false
        },
        component: SurveysView
      },
      {
        path: 'surveys/:survey',
        name: 'currentSurvey',

        meta: {
          name: 'currentSurvey',
          title: 'MIA Experiment Survey',
          requiresAuth: false, // change later...
          requiresAdmin: false
        },
        component: SurveyView
      },
      {
        path: 'surveys/create',
        name: 'createSurvey',

        meta: {
          name: 'createSurvey',
          title: 'MIA Experiment Survey Builder',
          requiresAdmin: true
        },
        component: SurveyView
      },
      {
        path: 'surveys/:survey/edit',
        name: 'editSurvey',

        meta: {
          name: 'editSurvey',
          title: 'MIA Experiment Dashboard',
          requiresAdmin: true
        },
        component: SurveyView
      },
      {
        path: 'surveys/:survey/view',
        name: 'viewSurvey',
        meta: {
          name: 'viewSurvey',
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

// router.beforeEach((to, _, next) => {
//   let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   let requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

//   if (requiresAdmin) {
//     // if (!store.state.auth.user.isAdmin) {
//     router.push("/");
//     // }
//   } else if (requiresAuth) {
//     console.log(requiresAuth);
//     // if (!store.state.auth.user) {
//     router.push("/");
//     // }
//   }
//   next();
// });

export default router;
