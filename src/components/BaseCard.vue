<template>
  <v-card raised>
    <v-card-title v-if="title"></v-card-title>
    <v-card-text v-if="description">{{description}}</v-card-text>
    <slot name="body"></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
</style>