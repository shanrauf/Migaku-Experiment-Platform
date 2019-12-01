const surveyData = require('@/surveyData.json');
// import router from '@/router';

const state = () => {
  return {
    surveys: [],
    currentSurvey: {}
  };
};

const getters = {
  getSurveys: state => state.surveys,
  getCurrentSurvey: state => state.currentSurvey,
  getNumberOfSections: state => state.currentSurvey.sections.length,
  getCurrentSurveySectionTitles: state =>
    state.currentSurvey.sections.map(section => section.title)
};

const actions = {
  async createSurveys({ commit }) {
    // await api call.then()
    commit({
      type: 'setSurveys',
      surveys: [
        {
          id: 'sa54df154sa4dffpsdf',
          title: 'MIA Mid-Experiment Survey Week 1',
          description:
            'This is the first weekly survey to gauge your progress during the experiment.',
          startDate: 1575849600000,
          endDate: 1576108800000
        },
        {
          id: 'h9g45wj54gi90jhi9ds',
          title: 'Testing Anki Retention At Different Learning Steps',
          description:
            'This is the second weekly survey to gauge your progress during the experiment.',
          startDate: Date.now(),
          endDate: Date.now() + 2.68e9
        }
      ]
    });
  },
  async createCurrentSurvey({ commit }, surveyId) {
    console.log(surveyId);
    commit({
      type: 'setCurrentSurvey',
      currentSurvey: surveyData
    });
  }
};

const mutations = {
  setSurveys(state, payload) {
    state.surveys = payload.surveys;
  },
  setCurrentSurvey(state, payload) {
    state.currentSurvey = payload.currentSurvey;
  },
  updateQuestionValue(_, payload) {
    // don't need state param since question is a reference to that value in state
    payload.question.value = payload.newValue;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
