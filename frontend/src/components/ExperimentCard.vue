<template>
  <v-card raised>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>
      {{ formatDate(startDate) }} to
      <span v-if="endDate">{{ formatDate(endDate) }}</span>
      <span v-else>TBD</span>
    </v-card-subtitle>
    <v-card-text>{{ description }}</v-card-text>
    <v-card-actions>
      <v-btn :to="`/experiments/${experimentId}`">Sign up</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { formatDate } from "../utils/index";
export default {
  props: {
    experimentId: {
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
      type: Date,
      required: true
    },
    endDate: {
      type: [Date, null],
      required: true
    },
    visibility: {
      type: String,
      required: true
    }
  },
  methods: {
    formatDate
  }
};
</script>

<style lang="scss" scoped></style>
