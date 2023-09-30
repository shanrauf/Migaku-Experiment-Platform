<template>
  <div class="article-container">
    <div>
      <router-link to="/">Back To Homepage</router-link>
    </div>
    <h1 class="article-title">Audio vs. Text Cards Experiment Results</h1>
    <div class="article-content">
      <p>
        The audio cards resulted in a significantly higher retention rate than
        text cards.
      </p>

      <div class="graph-container">
        <div class="graph">
          <VueApexCharts :options="options1" :series="series1" />
        </div>
      </div>

      <p>
        NOTE: Keep in mind that all the data in these graphs may change slightly
        over time, as we further analyze the data, remove outliers, etc.
      </p>

      <p>
        Here is a graph analyzing how the # of months participants had done MIA
        for affected their overall retention:
      </p>

      <div class="graph-container">
        <div class="graph">
          <VueApexCharts :options="options2" :series="series2" />
        </div>
      </div>
      <p>
        Here is a graph analyzing the effect of participants' # of hours of
        active listening on their overall retention:
      </p>

      <div class="graph-container">
        <div class="graph">
          <VueApexCharts :options="options3" :series="series3" />
        </div>
      </div>

      <!-- <p>
        Here is a graph comparing participants' JCAT scores to their overall
        retention:
      </p>

      <div class="graph-container">
        <div class="graph">
          <VueApexCharts :options="options4" :series="series4" />
        </div>
      </div>
      <p>
        Here is a graph analyzing the effect of participants' # of hours of
        reading on their overall retention:
      </p>

      <div class="graph-container">
        <div class="graph">
          <VueApexCharts :options="options5" :series="series5" />
        </div>
      </div> -->
      <p>
        This page will continue to be updated as the data analysis continues and
        insights are discovered.
      </p>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

import { monthsOfMIAToTextOverallRetention } from './utils';
import { monthsOfMIAToAudioOverallRetention } from './utils';
import {
  jcatScoresToTextOverallRetention,
  jcatScoresToAudioOverallRetention,
  avgActiveListeningToTextOverallRetention,
  avgActiveListeningToAudioOverallRetention,
  avgReadingToTextOverallRetention,
  avgReadingToAudioOverallRetention
} from './utils';

export default {
  transition: 'page',
  components: {
    VueApexCharts
  },
  data() {
    return {
      options1: {
        title: {
          text: 'Overall Card Retention'
        },
        chart: {
          id: 'vuechart-example',
          width: 700,
          height: 400
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
      series1: [
        {
          name: 'Audio',
          data: [
            81.8474,
            83.348,
            82.8633,
            81.7403,
            79.448,
            84.67228,
            83.3725,
            84.098,
            84.259,
            84.529,
            84.52957
          ]
        },
        {
          name: 'Text',
          data: [
            75.685,
            75.0839,
            74.51955,
            73.90533,
            72.680776,
            75.1235,
            74.867,
            75.734,
            75.8317,
            76.246,
            76.2599
          ]
        }
      ],
      options2: {
        title: {
          text: 'Months Doing MIA vs Overall Card Retention'
        },
        chart: {
          id: 'vuechart-example2',
          width: 700,
          height: 400
        },
        xaxis: {
          categories: ['1', '3', '6', '8', '11', '12'],
          title: {
            text: 'Months Doing MIA'
          }
        }
      },
      series2: [
        {
          name: 'Text',
          data: Object.values(monthsOfMIAToTextOverallRetention).map(
            participant => {
              return participant[1];
            }
          )
        },
        {
          name: 'Audio',
          data: Object.values(monthsOfMIAToAudioOverallRetention).map(
            participant => {
              return participant[1];
            }
          )
        }
      ],
      options3: {
        title: {
          text: 'Avg. Active Listening vs Overall Card Retention'
        },
        chart: {
          id: 'vuechart-example2',
          width: 700,
          height: 400
        },
        xaxis: {
          type: 'numeric',
          title: {
            text: 'Avg. Active Listening (hrs)',
            offsetY: 10
          }
        }
      },
      series3: [
        {
          name: 'Text',
          data: Object.values(avgActiveListeningToTextOverallRetention)
        },
        {
          name: 'Audio',
          data: Object.values(avgActiveListeningToAudioOverallRetention)
        }
      ],
      options4: {
        title: {
          text: 'JCAT Score vs Overall Card Retention'
        },
        chart: {
          id: 'vuechart-example2',
          width: 700,
          height: 400
        },
        xaxis: {
          type: 'numeric',
          title: {
            text: 'JCAT Score',
            offsetY: 10
          }
        }
      },
      series4: [
        {
          name: 'Text',
          data: Object.values(jcatScoresToTextOverallRetention)
        },
        {
          name: 'Audio',
          data: Object.values(jcatScoresToAudioOverallRetention)
        }
      ],
      options5: {
        title: {
          text: 'Avg. Reading vs Overall Card Retention'
        },
        chart: {
          id: 'vuechart-example2',
          width: 700,
          height: 400
        },
        xaxis: {
          type: 'numeric',
          title: {
            text: 'Avg. Reading (hrs)',
            offsetY: 10
          }
        }
      },
      series5: [
        {
          name: 'Text',
          data: Object.values(avgReadingToTextOverallRetention)
        },
        {
          name: 'Audio',
          data: Object.values(avgReadingToAudioOverallRetention)
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.article-container {
  margin: 25px auto;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.article-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
img {
  height: auto;
  max-width: 100%;
  display: block;
  margin: 0 auto;
  box-sizing: border-box;
  clear: both;
}
@media screen and (max-width: 600px) {
  .article-container {
    width: 80%;
  }
  .article-content img {
    max-width: 400px;
  }
}
.graph-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.graph {
  width: 80%;
  height: auto;
}
</style>
