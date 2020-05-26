import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '@/types';
import Vue from 'vue';

const experimentSurveys: any = {
  g6cy8p0yrmnclxyv6co2o: require('@/g6cy8p0yrmnclxyv6co2o.json'),
  gpaaw7d4nuq3bzu40o0zls: require('@/gpaaw7d4nuq3bzu40o0zls.json'),
  abcde3qmvtbuqwd1abcde: require('@/abcde3qmvtbuqwd1abcde.json'),
  fmqisvqe9z64dndlk6xkpg: require('@/fmqisvqe9z64dndlk6xkpg.json'),
};
import router from '@/app-routes';
import SurveyRepository from '@/api/SurveyRepository';

const defaults = {
  surveys: [],
  currentSurvey: {
    title: '',
    description: '',
    surveyId: '',
    sections: [
      {
        title: '',
        questions: [
          {
            questionId: '',
            key: '',
            label: '',
            questionType: '',
            dataType: '',
            rules: '',
            question: '?',
            value: null,
            required: true,
          },
        ],
      },
    ],
  },
  questions: [{}],
};

const getters: GetterTree<typeof defaults, RootState> = {
  getSurveys: (state) => state.surveys,
  getCurrentSurvey: (state) => state.currentSurvey,
  getNumberOfSections: (state) => state.currentSurvey.sections.length,
  getCurrentSurveySectionTitles: (state) =>
    state.currentSurvey.sections.map((section) => section.title),
};

const actions: ActionTree<typeof defaults, RootState> = {
  async createSurveys({ commit }) {
    const { surveys } = await SurveyRepository.get();

    commit({
      type: 'setSurveys',
      surveys: surveys,
    });
  },
  async createCurrentSurvey({ state, commit }, payload: any) {
    // if already submitted, then just redirect back and notify already submitted...
    // const surveyStatus = await SurveyRepository.getStatus(
    //   `latest?email=${payload.email}`
    // );
    let currentSurvey = experimentSurveys[payload.surveyId].survey;

    // Load the user's cached answers (e.x if they reloaded the page, restore their answers)
    const cachedSurveyStr = window.localStorage.getItem(payload.surveyId);

    if (cachedSurveyStr) {
      const cachedSurvey = JSON.parse(cachedSurveyStr);
      // Iterate over every question in the cached survey
      cachedSurvey.sections.forEach((section: any, sectionIdx: number) => {
        section.questions.forEach((question: any, questionIdx: number) => {
          const currentSurveyQuestion =
            currentSurvey.sections[sectionIdx].questions[questionIdx];
          const questionIndexExists = !!currentSurveyQuestion;
          const questionIdsMatch =
            currentSurveyQuestion?.questionId === question.questionId;
          const cachedValueExists = question?.value;
          // Set the cached value to the current survey's value as long as the questionId is the same
          if (questionIndexExists && questionIdsMatch && cachedValueExists) {
            currentSurveyQuestion.value = question.value;
          }
        });
      });
    }

    commit({
      type: 'setCurrentSurvey',
      currentSurvey, // doing manually for now
    });
  },
  async submitSurvey({ commit, state }) {
    // formatting payload...
    let payload: any = {};
    let questionResponses: any = {};
    state.currentSurvey.sections.forEach((section) => {
      section.questions.forEach((question) => {
        // add to payload
        questionResponses[question.questionId] = question.value;
      });
    });
    payload['data'] = questionResponses;
    SurveyRepository.postResponses(state.currentSurvey.surveyId, payload).then(
      () => {
        // clear survey cache in case they want to submit the survey again
        window.localStorage.removeItem(state.currentSurvey.surveyId);
        Vue.notify({
          group: 'global',
          title: 'Successfully submitted survey!',
          text: 'The rest of the site will be updated soon!',
        });
        router.push({ path: '/' });
        return true;
      }
    );
  },
};

const mutations: MutationTree<typeof defaults> = {
  setSurveys(state, payload) {
    state.surveys = payload.surveys;
  },
  setCurrentSurvey(state, payload) {
    state.currentSurvey = payload.currentSurvey;
  },
  updateQuestionValue(state, payload) {
    // don't need state param since question is a reference to that value in state, and vuex doesn't complain since the mutating is happening in a mutation
    payload.question[payload.attributeToUpdate] = payload.newValue;
    // cache current version of survey
    window.localStorage.setItem(
      state.currentSurvey.surveyId,
      JSON.stringify(state.currentSurvey)
    );
  },
  setCurrentSurveyTitle(state, newTitle) {
    state.currentSurvey.title = newTitle;
  },
  setCurrentSurveyDescription(state, newDescription) {
    state.currentSurvey.description = newDescription;
  },
  updateCurrentSurveyMetadata(_, payload) {
    payload.section[payload.attributeToUpdate] = payload.newVal;
  },
  setQuestions(state, payload) {
    state.questions = payload.questions;
  },
};

export default {
  state: Object.assign({}, defaults),
  getters,
  actions,
  mutations,
};
