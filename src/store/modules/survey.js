const surveyData = require("@/surveyData.json");
// import router from '@/router';

const state = () => {
  return {
    surveyData: {}
  };
};

const getters = {
  getSurveyData: state => state.surveyData,
  getNumberOfSections: state => state.surveyData.sections.length,
  getSurveySectionTitles: state => {
    let sectionTitles = [];
    state.surveyData.sections.forEach(section =>
      sectionTitles.push(section.title)
    );
    return sectionTitles;
  }
};

const actions = {
  async createSurveyData({ commit }) {
    commit({
      type: "setSurveyData",
      surveyData: surveyData
    });
  }
};

const mutations = {
  setSurveyData(state, payload) {
    state.surveyData = payload.surveyData;
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
