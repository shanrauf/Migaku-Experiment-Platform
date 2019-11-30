<template>
  <v-row>
    <v-col>
      <BaseCreateNewCard to="experiments/create" />
    </v-col>
    <v-col v-for="experiment in experiments" :key="experiment.id">
      <ExperimentCard v-bind="experiment" />
    </v-col>
  </v-row>
</template>

<script>
import ExperimentCard from '@/components/ExperimentCard.vue';
import BaseCreateNewCard from '@/components/BaseCreateNewCard.vue';
export default {
  components: {
    ExperimentCard,
    BaseCreateNewCard
  },
  data() {
    return {
      experiments: [
        {
          id: 'sa54df154sa4dffpsdf', // unique identifier
          title: 'Testing Anki Retention of Audio Cards vs Sentence Cards',
          description:
            '(10 weeks) Participants rep 5 audio cards and 5 sentence card a day and fill out a weekly survey describing how they feel about the two card types.',
          startDate: 1575244800000,
          endDate: 1581206400000
        },
        {
          id: 'h9g45wj54gi90jhi9ds',
          title: 'Testing Anki Retention At Different Learning Steps',
          description:
            '(10 weeks) Participants rep 10 sentence cards a day at specific learning steps designated to them and fill out a weekly survey describing how they feel about the learning steps.',
          startDate: 1575244800000,
          endDate: 1581206400000
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
