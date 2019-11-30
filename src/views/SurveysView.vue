<template>
  <v-container>
    <v-row>
      <v-col>
        <BaseCreateNewCard v-once />
      </v-col>
      <v-col v-for="survey in surveys" :key="survey.id">
        <SurveyCard v-bind="survey" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SurveyCard from '@/components/SurveyCard.vue';
import BaseCreateNewCard from '@/components/BaseCreateNewCard.vue';

export default {
  components: {
    SurveyCard,
    BaseCreateNewCard
  },
  data() {
    return {
      surveys: [
        {
          id: 'sa54df154sa4dffpsdf',
          title: 'MIA Mid-Experiment Survey Week 1',
          description:
            'This is the first weekly survey to gauge your progress during the experiment.',
          startDate: 1575849600000,
          endDate: 1576108800000
        },
        {
          id: 'h9g45wj54gi90jhi9ds',
          title: 'Testing Anki Retention At Different Learning Steps',
          description:
            'This is the second weekly survey to gauge your progress during the experiment.',
          startDate: Date.now(),
          endDate: Date.now() + 2.68e9
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
