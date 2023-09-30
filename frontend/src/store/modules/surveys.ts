import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '@/types';
import Vue from 'vue';

const experimentSurveys: any = {
  g6cy8p0yrmnclxyv6co2o: require('@/g6cy8p0yrmnclxyv6co2o.json'),
  gpaaw7d4nuq3bzu40o0zls: require('@/gpaaw7d4nuq3bzu40o0zls.json')
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
            required: true
          }
        ]
      }
    ]
  },
  questions: [{}]
};

const getters: GetterTree<typeof defaults, RootState> = {
  getSurveys: state => state.surveys,
  getCurrentSurvey: state => state.currentSurvey,
  getNumberOfSections: state => state.currentSurvey.sections.length,
  getCurrentSurveySectionTitles: state =>
    state.currentSurvey.sections.map(section => section.title)
};

const actions: ActionTree<typeof defaults, RootState> = {
  async createSurveys({ commit }) {
    const { surveys } = await SurveyRepository.get();

    commit({
      type: 'setSurveys',
      surveys: surveys
    });
  },
  async createCurrentSurvey({ state, commit }, payload: any) {
    // if already submitted, then just redirect back and notify already submitted...
    // const surveyStatus = await SurveyRepository.getStatus(
    //   `latest?email=${payload.email}`
    // );
    commit({
      type: 'setCurrentSurvey',
      currentSurvey: experimentSurveys[payload.surveyId].survey // doing manually for now
    });
  },
  async submitSurvey({ commit, state }) {
    Vue.notify({
      group: 'global',
      title: 'Successfully submitted survey!',
      text: 'Skipping form validation for demo purposes'
    });
    router.push({ path: '/' });
    return true
    // formatting payload...
    // let payload: any = {};
    // let questionResponses: any = {};
    // state.currentSurvey.sections.forEach(section => {
    //   section.questions.forEach(question => {
    //     // add to payload
    //     questionResponses[question.questionId] = question.value;
    //   });
    // });
    // payload['data'] = questionResponses;
    // SurveyRepository.postResponses(state.currentSurvey.surveyId, payload).then(
    //   () => {
    //     Vue.notify({
    //       group: 'global',
    //       title: 'Successfully submitted survey!',
    //       text: 'The rest of the site will be updated soon!'
    //     });
    //     router.push({ path: '/' });
    //     return true;
    //   }
    // );
  }
};

const mutations: MutationTree<typeof defaults> = {
  setSurveys(state, payload) {
    state.surveys = payload.surveys;
  },
  setCurrentSurvey(state, payload) {
    state.currentSurvey = payload.currentSurvey;
  },
  updateQuestionValue(_, payload) {
    // don't need state param since question is a reference to that value in state, and vuex doesn't complain since the mutating is happening in a mutation
    payload.question[payload.attributeToUpdate] = payload.newValue;
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
  }
};

export default {
  state: Object.assign({}, defaults),
  getters,
  actions,
  mutations
};
