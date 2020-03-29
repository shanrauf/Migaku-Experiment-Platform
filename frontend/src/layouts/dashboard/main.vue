<template>
  <v-app id="vuetify">
    <BaseNotification />
    <TopNavigation />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
    <BaseFooter />
  </v-app>
</template>

<script>
import TopNavigation from '@/components/TopNavigation.vue';
import BaseFooter from '@/components/BaseFooter.vue';

export default {
  name: 'DashboardLayout',

  components: { TopNavigation, BaseFooter }
};
</script>

<style></style>
