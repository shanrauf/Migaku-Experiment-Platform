import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const DashboardView = () => import("@/views/DashboardView.vue");
const ParticipantsView = () => import("@/views/ParticipantsView.vue");
const CustomQueryView = () => import("@/views/CustomQueryView.vue");
const ErrorView = () => import("@/views/ErrorView.vue");

const routes = [
  {
    path: "/",
    meta: {
      name: "dashboard",
      title: "Dashboard | MIA Experiment",
      requiresAuth: true
    },
    component: DashboardView
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
