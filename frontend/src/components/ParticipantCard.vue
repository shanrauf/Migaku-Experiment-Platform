<template>
  <FlipCard :flipped="flipped">
    <template v-slot:front>
      <v-card width="550px" height="500px">
        <h1>{{ participant.name }}</h1>
        <p>{{ participant.email }}</p>
        <p>
          Studying Japanese for
          {{ displayMonths(participant.timeStudyingJapanese) }}
        </p>
        <p>Doing MIA for {{ displayMonths(participant.timeDoingMIA) }}</p>
        <p>{{ participant.summaryOfJapaneseStudies }}</p>
        <v-btn @click="flipped = true">Flip</v-btn>
      </v-card>
    </template>
    <template v-slot:back>
      <v-card width="550px" height="500px">
        <h1 style="text-align: center">Weekly Stats</h1>
        <VueApexCharts
          v-if="query"
          type="radar"
          :options="chartOptions"
          :series="series"
        />
        <v-btn @click="flipped = false">Flip</v-btn>
      </v-card>
    </template>
  </FlipCard>
</template>

<script lang="ts">
const VueApexCharts = () => import('vue-apexcharts');
import FlipCard from '@/components/FlipCard.vue';
export default {
  components: {
    FlipCard,
    VueApexCharts
  },
  props: {
    participant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      series: [
        {
          name: 'Shan',
          data: [
            this.participant.avgActiveImmersion,
            this.participant.avgPassiveImmersion,
            this.participant.avgReading,
            this.participant.avgAnkiReviewing
          ]
        },
        {
          name: 'Matt',
          data: [7, 3, 3, 6]
        }
      ],
      chartOptions: {
        labels: [
          'Active Immersion',
          'Passive Immersion',
          'Reading',
          'Anki Reviewing'
        ]
      },
      query: true,
      flipped: false
    };
  },
  methods: {
    displayMonths(numOfMonths) {
      if (numOfMonths < 12) {
        return numOfMonths + ' months';
      } else {
        return parseFloat((numOfMonths / 12).toFixed(2)) + ' years.';
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
