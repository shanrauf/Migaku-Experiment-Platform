<template>
  <v-container>
    <v-row>
      <v-col>
        <BaseCreateNewCard v-once />
      </v-col>
      <v-col v-for="survey in getSurveys" :key="survey.surveyId">
        <SurveyCard v-bind="survey" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import SurveyCard from '@/components/SurveyCard.vue';
import BaseCreateNewCard from '@/components/BaseCreateNewCard.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    SurveyCard,
    BaseCreateNewCard
  },
  created() {
    this.$store.dispatch('createSurveys');
  },
  computed: {
    ...mapGetters(['getSurveys'])
  }
};
</script>

<style lang="scss" scoped></style>
