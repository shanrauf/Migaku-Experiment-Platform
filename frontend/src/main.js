import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/components/_globals";

Vue.config.productionTip = false;
Vue.config.performance = true;

import Notifications from "vue-notification";
Vue.use(Notifications);

import Vuetify from "vuetify/lib/framework";
import "vuetify/dist/vuetify.min.css";
import "material-icons";
import "@fortawesome/fontawesome-free/css/all.css";
// import "@mdi/font/css/materialdesignicons.css";

const opts = {
  icons: {
    iconfont: "md",
    values: {
      add: "add",
      edit: "edit",
      close: "close",
      github: "fab fa-github",
      google: "fab fa-google",
      facebook: "fab fa-facebook",
      twitter: "fab fa-twitter"
    }
  }
};

Vue.use(Vuetify);

new Vue({
  store,
  router,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount("#app");
