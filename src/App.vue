<template>
  <div id="app">
    <v-app id="vuetify">
      <v-content>
        <div class="form-banner" />

        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </v-content>
      <BaseFooter />
    </v-app>
  </div>
</template>

<script>
import BaseFooter from "@/components/BaseFooter.vue";

export default {
  name: "App",
  components: {
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
.form-banner {
  height: 200px;
  background-color: #204f70;
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
