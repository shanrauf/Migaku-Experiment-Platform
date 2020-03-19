const requireComponent = require.context(".", false, /Base[\w-]+\.vue$/);
let components: any = {};

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // From ./BaseButton.vue to BaseButton
  const componentName = fileName.split("/")[1].split(".")[0];
  components[componentName] = componentConfig.default || componentConfig;
});

export default components;
