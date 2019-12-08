<template>
  <v-card raised>
    <v-card-title>{{title}}</v-card-title>
    <v-card-subtitle>{{formatDate(new Date(startDate))}} to {{formatDate(new Date(endDate))}}</v-card-subtitle>
    <v-card-text>{{description}}</v-card-text>
    <v-card-actions>
      <v-btn :to="`/experiments/${id}`">Sign up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { formatDate } from "@/utils/index.js";
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    startDate: {
      type: Number,
      required: true
    },
    endDate: {
      type: Number,
      required: true
    }
  },
  methods: {
    formatDate
  }
};
</script>

<style lang="scss" scoped>
</style>