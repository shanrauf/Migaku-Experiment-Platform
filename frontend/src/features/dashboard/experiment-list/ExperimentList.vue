<template>
  <v-row>
    <v-col>
      <BaseCreateNewCard v-once to="experiments/create" />
    </v-col>
    <v-col v-for="experiment in getExperiments" :key="experiment.experimentId">
      <ExperimentCard v-bind="experiment" />
    </v-col>
  </v-row>
</template>

<script>
import ExperimentCard from '@/components/ExperimentCard.vue';
import BaseCreateNewCard from '@/components/BaseCreateNewCard.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    ExperimentCard,
    BaseCreateNewCard
  },
  created() {
    this.$store.dispatch('createExperiments');
  },
  computed: {
    ...mapGetters(['getExperiments'])
  }
};
</script>

<style lang="scss" scoped></style>
