import { RouteConfig } from "vue-router";

const dashboardRoutes: RouteConfig[] = [
  {
    name: "dashboard",
    path: "/dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/features/dashboard/main.vue"
      ),
    meta: {
      title: "Dashboard | MIA Experiments",
      layout: "DashboardLayout",
      isPublic: false
    }
  },
  {
    name: "experiments",
    path: "/experiments",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/features/dashboard/experiment-list/ExperimentList.vue"
      ),
    meta: {
      title: "Experiments | MIA Experiments",
      layout: "DashboardLayout",
      isPublic: false
    }
  }
];

export default dashboardRoutes;
