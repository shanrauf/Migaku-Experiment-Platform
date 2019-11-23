import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

Vue.config.productionTip = false;
Vue.config.performance = true;

import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import 'material-icons';
import '@mdi/font/css/materialdesignicons.css';
import '@fortawesome/fontawesome-free/css/all.css';

require('@/assets/images/favicon.ico');

const opts = {
  icons: {
    iconfont: 'md' || 'mdi',
    values: {
      download: 'download',
      camera: 'camera_alt',
      highlight: 'border_color',
      star: 'star',
      barcode: 'mdi-barcode',
      stats: 'bar_chart',
      students: 'supervisor_account',
      flag: 'flag',
      class: 'class',
      star_border: 'star_border',
      settings: 'settings',
      blacklist: 'highlight_off',
      save: 'save_alt',
      language: 'language',
      arrow_up: 'arrow_drop_up',
      arrow_left: 'arrow_drop_left',
      arrow_right: 'arrow_drop_right',
      arrow_down: 'arrow_drop_down',
      edit: 'edit',
      offline: 'offline_bolt',
      tag: 'label',
      link: 'link',
      filter: 'filter_list',
      link_off: 'link_off',
      backup: 'backup',
      fire: 'whatshot',
      time: 'access_time',
      error: 'error',
      trash: 'trash',
      delete: 'clear',
      list: 'list',
      github: 'fab fa-github'
    }
  }
};

Vue.use(Vuetify);

new Vue({
  store,
  router,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app');
