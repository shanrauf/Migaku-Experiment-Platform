import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const SurveyView = () => import("@/views/SurveyView.vue");

const routes = [
  {
    path: "/",
    meta: {
      name: "survey",
      title: "MIA Survey",
      requiresAuth: true
    },
    component: SurveyView
  },
  {
    path: "/participants",
    meta: {
      name: "participants",
      title: "Participants | MIA Experiment",
      requiresAuth: true
    },
    component: ParticipantsView
  },
  {
    path: "/custom",
    meta: {
      name: "customQuery",
      title: "Custom Query | MIA Experiment",
      requiresAuth: true
    },
    component: CustomQueryView
  },
  { path: "*", component: ErrorView }
];

const router = new VueRouter({ mode: "history", routes: routes });

export default router;
