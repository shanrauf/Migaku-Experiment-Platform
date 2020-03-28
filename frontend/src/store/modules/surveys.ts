import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '@/types';

const experimentSurveys: any = {
  g6cy8p0yrmnclxyv6co2o: require('@/g6cy8p0yrmnclxyv6co2o.json')
};
import router from '@/app-routes';
import SurveyRepository from '@/api/SurveyRepository';
import Vue from 'vue';
import ParticipantRepository from '@/api/ParticipantRepository';
import Axios from 'axios';
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
            value: ''
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
    try {
      const result = await ParticipantRepository.me();
      console.log(result);
      if (!result.miaDiscord) {
        await ParticipantRepository.signin();
      }
    } catch (err) {
      window.location.replace(
        'https://trials.massimmersionapproach.com/api/auth/discord?redirect=https://trials.massimmersionapproach.com/experiments/mia-community-census/surveys/g6cy8p0yrmnclxyv6co2o'
      );
    }
    commit({
      type: 'setCurrentSurvey',
      currentSurvey: experimentSurveys[payload.surveyId].survey // doing manually for now
    });
  },
  async submitSurvey({ commit, state }) {
    let canSubmit = true;
    // state.currentSurvey.sections.forEach(section => {
    //   for (let question of section.questions) {
    //     if (question.value == '' && canSubmit) {
    //       console.log(question);
    //       // doesn't allow for questioons where u allow leaving blank
    //       canSubmit = false;
    //       Vue.notify({
    //         title: "You haven't filled out every question yet..",
    //         group: 'global'
    //       });
    //       return false;
    //     }
    //   }
    // });

    // formatting payload...
    let payload: any = {};
    let questionResponses: any = {};
    if (canSubmit) {
      state.currentSurvey.sections.forEach(section => {
        section.questions.forEach(question => {
          // add to payload

          if (question.questionId == 'email') {
            payload['email'] = question.value;
          } else {
            questionResponses[question.questionId] = question.value;
          }
        });
      });
      payload['data'] = questionResponses;
      SurveyRepository.postResponses(
        state.currentSurvey.surveyId,
        payload
      ).then(() => {
        Vue.notify({
          group: 'global',
          title: 'Successfully submitted survey!',
          text: 'The rest of the site will be updated soon!'
        });
        router.push({ path: '/' });
      });
      return true;
    } else {
      return false;
    }
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
