<template>
  <div id="app">
    <v-app id="vuetify">
      <v-content>
        <TopNavigation />
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-content>
      <BaseFooter />
    </v-app>
  </div>
</template>

<script>
import TopNavigation from "@/components/TopNavigation.vue";
import BaseFooter from "@/components/BaseFooter.vue";

export default {
  name: "App",
  components: {
    BaseFooter,
    TopNavigation
  },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "MIA Experiments";
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

#vuetify {
  font-size: 100%;
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f2f3f4;
}

/* Router transitions */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
