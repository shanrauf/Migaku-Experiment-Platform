import { RouteConfig } from 'vue-router';

const visualizationRoutes: RouteConfig[] = [
  {
    name: 'analysis',
    path: '/admin/visualization',
    component: () =>
      import(
        /* webpackChunkName: "visualization" */ '@/features/results-visualization/main.vue'
      ),
    meta: {
      title: 'Visualization | MIA Experiments',
      layout: 'DefaultLayout',
      isPublic: true
    }
  }
];

export default visualizationRoutes;
