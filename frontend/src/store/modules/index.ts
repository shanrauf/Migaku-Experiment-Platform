const requireModule = require.context('.', false, /\.ts$/); //extract js files inside modules folder
const modules: any = {};

requireModule.keys().forEach(fileName => {
  if (fileName === './index.ts') return; //reject the index.ts file

  const moduleName = fileName.replace(/(\.\/|\.ts)/g, '');

  modules[moduleName] = requireModule(fileName).default;
});
export default modules;
