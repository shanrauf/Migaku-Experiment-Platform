<template>
  <div style="margin: auto; width: 80%;">
    <h1>Experiment Data Analysis</h1>

    <br />

    <h2>Select an experiment to analyze:</h2>

    <v-radio-group v-model="selectedExperiment">
      <v-radio
        v-for="experiment in experiments"
        :key="experiment.experimentId"
        :label="experiment.title"
        :value="experiment.experimentId"
      ></v-radio>
    </v-radio-group>

    <div v-if="selectedExperiment">
      <h2>What type of data analysis are you doing?</h2>

      <v-radio-group v-model="analysisMode">
        <v-radio
          v-for="mode in analysisModes"
          :key="mode.key"
          :label="mode.value"
          :value="mode.key"
        ></v-radio>
      </v-radio-group>
    </div>

    <div v-if="analysisMode == 0">
      <h2>Text Responses</h2>

      <br />

      <h3>Select a question to analyze:</h3>

      <v-combobox
        v-model="selectedTextQuestion"
        :items="textQuestionIds"
        label="Select a text question"
      ></v-combobox>

      <div v-if="selectedTextQuestion">
        <v-col
          v-for="response in textQuestionResponses"
          :key="response.responseId"
        >
          <v-card>
            <v-card-text>{{ response.answerText }}</v-card-text>
          </v-card>
        </v-col>
      </div>
    </div>

    <div v-if="analysisMode == 1 || analysisMode == 2">
      <h2>
        <!-- {{
          analysisMode === 1
            ? 'Analyzing change over time'
            : 'Analyzing relationships between questions'
        }} -->
        Analyzing change over time
      </h2>

      <h3>Select questions to analyze:</h3>
      <p>
        Note: "c" refers to categorical questions (e.x a yes/no question), as
        opposed to numerical questions (e.x totalKnownWords)
      </p>

      <v-combobox
        v-model="selectedQuestions"
        :items="experimentQuestions"
        label="Questions"
        multiple
      >
        <template v-slot:item="{ index, item }">
          <v-chip color="`white lighten-3`" label small>
            {{ item.questionId }} {{ item.categorical ? '(c)' : '' }}
          </v-chip>
        </template>
        <template v-slot:selection="{ index, item }">
          <v-chip color="`white lighten-3`" label small>
            {{ item.questionId }} {{ item.categorical ? '(c)' : '' }}
          </v-chip>
        </template>
      </v-combobox>

      <v-btn @click="fetchDataAndDisplayGraph">Analyze</v-btn>

      <div v-if="analyze">
        <!-- <div style="width: 1500px; height: 700px;"> -->
        <VueApexCharts :options="options" :series="series"></VueApexCharts>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import QuestionRepository from '@/api/QuestionRepository';
import { mapGetters } from 'vuex';

import Service from './service';
import SurveyRepository from '@/api/SurveyRepository';
import ExperimentRepository from '@/api/ExperimentRepository';
import QuestionResponseRepository from '@/api/QuestionResponseRepository';
import { capitalize } from '@/utils/index';
export default {
  name: 'Visualization',
  service: new Service(),
  components: {
    VueApexCharts,
  },
  async created() {
    let { experiments } = await ExperimentRepository.get();

    experiments.forEach((experiment) => {
      // format ISO strings into Date objects
      if (experiment.startDate) {
        experiment.startDate = new Date(experiment.startDate);
      }
      if (experiment.endDate) {
        experiment.endDate = new Date(experiment.endDate);
      }
    });

    this.experiments = experiments;
  },
  data() {
    return {
      selectedTextQuestion: null,
      experiments: [],
      analyze: false,
      analysisMode: null,
      questionResponsesCache: {},
      selectedExperiment: null,
      experimentQuestions: [],
      experimentSurveys: [],
      textQuestionResponses: [],
      experimentQuestionIds: [],
      selectedQuestions: [],
      options: {},
      series: [],
      changeOverTimeSeries: [],
      changeOverTimeOptions: {
        title: {
          text: '',
        },
        chart: {
          id: '',
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
            'Survey 12',
          ],
        },
      },
      analysisModes: [
        {
          key: 0,
          value:
            "Reading text responses (e.x manually reading through users' descriptions of their Japanese studies)",
        },
        {
          key: 1,
          value:
            'Analyzing the changes in data over the course of the experiment (e.x observing the change in overall retention over time)',
        },
      ],
    };
  },
  methods: {
    async fetchDataAndDisplayGraph() {
      this.analyze = false;
      this.changeOverTimeSeries = [];
      for (const question of this.selectedQuestions) {
        if (!this.questionResponsesCache?.[question.questionId]) {
          let { questionresponses } = await QuestionResponseRepository.get({
            questionId: question.questionId,
            experimentId: this.selectedExperiment,
          });
          this.questionResponsesCache[question.questionId] = questionresponses;
        }
        this.changeOverTimeOptions.title.text += question.questionId + ', ';
      }

      console.log(this.questionResponsesCache);

      this.changeOverTimeOptions.chart.id = 'vuechart-example';
      this.changeOverTimeOptions.xaxis.categories = this.experimentSurveys.map(
        (survey) => survey.title
      );

      this.selectedQuestions.forEach((question) => {
        // for everey question, get its responses, avg the values for each survey, and set that as data attribute for a series
        const responses = this.questionResponsesCache[question.questionId];
        const data = [];

        console.log(responses);

        this.experimentSurveys.forEach((survey) => {
          // avg values
          let total = 0;
          let count = 0;

          const responsesForThisSurvey = this.questionResponsesCache[
            question.questionId
          ].filter((response) => response.surveyId === survey.surveyId);

          for (let response of responsesForThisSurvey) {
            const { dataType } = this.selectedQuestions.find(
              (question) => question.questionId === response.questionId
            );
            total +=
              response[
                'answer' + dataType.charAt(0).toUpperCase() + dataType.slice(1)
              ];
            count += 1;
          }

          const average = total / count;
          data.push(average);
        });

        this.changeOverTimeSeries.push({
          name: question.questionId,
          data,
        });
      });

      this.options = this.changeOverTimeOptions;
      this.series = this.changeOverTimeSeries;

      console.log(this.series);

      this.analyze = true;
    },
  },
  computed: {
    textQuestions() {
      return this.experimentQuestions.filter(
        (question) => question.dataType === 'text'
      );
    },
    textQuestionIds() {
      return this.textQuestions.map((question) => question.questionId);
    },
  },
  watch: {
    selectedExperiment: async function(experimentId) {
      // removing change over time for mia-community-census
      if (experimentId === 'mia-community-census') {
        this.analysisModes = [
          {
            key: 0,
            value:
              "Reading text responses (e.x manually reading through users' descriptions of their Japanese studies)",
          },
        ];
      } else {
        this.analysisModes = [
          {
            key: 0,
            value:
              "Reading text responses (e.x manually reading through users' descriptions of their Japanese studies)",
          },
          {
            key: 1,
            value:
              'Analyzing the changes in data over the course of the experiment (e.x observing the change in overall retention over time)',
          },
        ];
      }

      this.experimentQuestions = [];
      const { questions } = await QuestionRepository.get({
        experimentId,
      });
      questions.forEach((question) => {
        if (question?.items && question?.dataType === 'varchar') {
          question['categorical'] = true;
        }

        if (this.selectedExperiment === 'mia-community-census') {
          this.experimentQuestions.push(question);
        } else if (
          !question.question.includes('Cloze') &&
          !question.question.includes('char') &&
          !question.question.includes('col') &&
          !question.question.includes('noChar')
        ) {
          // remove questions that shouldn't be in this schema (I should just delete them from the db...)
          this.experimentQuestions.push(question);
        }
      });
      const { surveys } = await SurveyRepository.get({ experimentId });
      surveys.sort(
        (surveyOne, surveyTwo) =>
          Date.parse(surveyOne.startDate) - Date.parse(surveyTwo.startDate)
      );
      this.experimentSurveys = surveys;
    },
    selectedTextQuestion: async function(questionId) {
      const { questionresponses } = await QuestionResponseRepository.get({
        experimentId: this.selectedExperiment,
        questionId,
      });
      console.log(questionresponses);
      this.textQuestionResponses = questionresponses;
      console.log(this.textQuestionResponses);
    },
  },
};
</script>

<style lang="scss" scoped></style>
