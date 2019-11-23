<template>
  <div id="app">
    <v-app id="vuetify">
      <v-content>
        <BaseNav />
        <v-container>
          <transition name="fade" mode="out-in">
            <router-view />
          </transition>
        </v-container>
      </v-content>
      <BaseFooter />
    </v-app>
  </div>
</template>

<script>
import BaseNav from "@/components/BaseNav.vue";
import BaseFooter from "@/components/BaseFooter.vue";

export default {
  name: "App",
  components: {
    BaseNav,
    BaseFooter
  }
};
</script>

<style>
body {
  font-size: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fafafa;
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
