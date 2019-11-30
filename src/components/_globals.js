import Vue from 'vue';

const requireComponent = require.context('./base', false, /Base[\w-]+\.vue$/);

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // From ./BaseButton.vue to BaseButton
  const componentName = fileName.split('/')[1].split('.')[0];

  // Register component globally
  Vue.component(componentName, componentConfig.default || componentConfig);
});
