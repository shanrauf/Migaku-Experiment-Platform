<template>
  <v-card raised>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-subtitle>{{ dateToTimeUntil(new Date(endDate)) }}</v-card-subtitle>
    <v-card-text>{{ description }}</v-card-text>
    <v-card-actions>
      <v-btn :to="`${surveyId}`" append>Complete Survey</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { dateToTimeUntil } from "../utils/index";
export default {
  props: {
    surveyId: {
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
      // currently not using?
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    }
  },
  methods: {
    dateToTimeUntil
  }
};
</script>

<style lang="scss" scoped></style>
