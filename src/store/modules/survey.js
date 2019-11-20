const surveyData = require("@/surveyData.json");
// import router from '@/router';

const state = () => {
  return {
    surveyData: surveyData
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
    console.log(payload.surveyData);
    state.surveyData = payload.surveyData;
  },
  editQuestionValue(state, question, newValue) {
    console.log(question);
    console.log(newValue);
    // question.value = newValue;
    // console.log(question);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
