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
  }
];

const router = new VueRouter({ mode: "history", routes: routes });

export default router;
