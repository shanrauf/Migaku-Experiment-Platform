<template>
  <div>
    <h1>Results for audiovssentencecards</h1>

    <br />

    <div style="width: 700px; height: 600px;">
      <VueApexCharts :options="options" :series="series"></VueApexCharts>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

import Service from './service';

export default {
  name: 'Visualization',
  service: new Service(),
  components: {
    VueApexCharts
  },
  data() {
    return {
      options: {
        title: {
          text: 'Audio vs. Sentence Card Retention'
        },
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [
            'Survey 1',
            'Survey 2',
            'Survey 3',
            'Survey 4',
            'Survey 5',
            'Survey 6',
            'Survey 7',
            'Survey 8',
            'Survey 9',
            'Survey 10',
            'Survey 11',
            'Survey 12'
          ]
        }
      },
      series: [
        {
          name: 'Audio',
          data: this.$options.service.testData()['avgAudioRetention']
        },
        {
          name: 'Sentence',
          data: this.$options.service.testData()['avgSentenceRetention']
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
