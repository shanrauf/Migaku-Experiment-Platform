<template>
  <FlipCard :flipped="flipped">
    <template v-slot:front>
      <div>test</div>
      <v-btn @click="flipped = true">Flip</v-btn>
    </template>
    <template v-slot:back>
      <h1 style="text-align: center">Weekly Stats</h1>
      <VueApexCharts
        v-if="query"
        type="radar"
        height="500"
        :options="chartOptions"
        :series="series"
      />
      <v-btn @click="flipped = false">Flip</v-btn>
    </template>
  </FlipCard>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import FlipCard from "@/components/FlipCard.vue";
export default {
  components: {
    FlipCard,
    VueApexCharts
  },
  data() {
    return {
      series: [
        {
          name: "Shan",
          data: [1, 1, 0.5, 4]
        },
        {
          name: "Matt",
          data: [7, 3, 3, 6]
        }
      ],
      chartOptions: {
        labels: [
          "Active Immersion",
          "Passive Immersion",
          "Reading",
          "Anki Reviewing"
        ]
      },
      query: true,
      flipped: false
    };
  }
};
</script>

<style lang="scss" scoped></style>
