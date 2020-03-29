<template>
  <v-container>
    <v-row>
      <v-col v-for="survey in getSurveys" :key="survey.surveyId">
        <SurveyCard v-bind="survey" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SurveyCard from '@/components/SurveyCard.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    SurveyCard
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
