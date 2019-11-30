<template>
  <div>
    <v-btn to="/experiments">Back</v-btn>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>