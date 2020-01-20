import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import common from './common';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: '1.0.0'
  },
  strict: process.env.NODE_ENV !== 'production',
  modules: { common, ...modules }
});
