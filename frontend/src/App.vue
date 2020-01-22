<template>
  <div id="app">
    <BaseNotification />
    <component :is="component">
      <slot></slot>
    </component>
  </div>
</template>

<script>
import PublicLayout from "@/layouts/public/main.vue";
import DefaultLayout from "@/layouts/default/main.vue";
import DashboardLayout from "@/layouts/dashboard/main.vue";

export default {
  name: "App",
  components: {
    PublicLayout,
    DefaultLayout,
    DashboardLayout
  },
  computed: {
    component() {
      return this.$store.state.common.layout;
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

#app {
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
