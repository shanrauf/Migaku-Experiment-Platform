<template>
  <v-app id="vuetify">
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
export default {
  name: 'PublicLayout'
};
</script>

<style></style>
