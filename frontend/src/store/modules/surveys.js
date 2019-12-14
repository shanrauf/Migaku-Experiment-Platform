const surveyData = require("@/surveyData.json");
import router from "@/router";
import RepositoryFactory from "@/api";
import Vue from "vue";
const state = () => {
  return {
    surveys: [],
    currentSurvey: {},
    questions: []
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
    const SurveyRepository = RepositoryFactory.get("surveys");

    let response = await SurveyRepository.get();

    const { surveys } = response.data;

    surveys.forEach(survey => {
      survey["startDate"] = survey.surveys[0].ExperimentSurvey.startDate;
      survey["endDate"] = survey.surveys[0].ExperimentSurvey.endDate;
    });

    commit({
      type: "setSurveys",
      surveys: surveys
    });
  },
  async createCurrentSurvey({ state, commit }, payload) {
    // if already submitted, then just redirect back and notify already submitted...
    // const SurveyRepository = RepositoryFactory.get("surveys");
    // const surveyStatus = await SurveyRepository.getStatus(
    //   `latest?email=${payload.email}`
    // );
    commit({
      type: "setCurrentSurvey",
      currentSurvey: surveyData.survey
    });
  },
  async submitSurvey({ commit, state }) {
    let canSubmit = true;
    state.currentSurvey.sections.forEach(section => {
      for (let question of section.questions) {
        if (question.value == "" && canSubmit) {
          // doesn't allow for questioons where u allow leaving blank
          canSubmit = false;
          Vue.notify({
            title: "You haven't filled out every question yet..",
            group: "global"
          });
          return false;
        }
      }
    });

    // formatting payload...
    let payload = {};
    let data = {};
    if (canSubmit) {
      state.currentSurvey.sections.forEach(section => {
        section.questions.forEach(question => {
          // add to payload

          if (question.questionId == "email") {
            data["email"] = question.value;
          }
          payload[question.questionId] = {
            value: question.value,
            dataType: question.dataType
          };
        });
      });
      data["data"] = payload;
      const SurveyRepository = RepositoryFactory.get("surveys");

      SurveyRepository.post(state.currentSurvey.surveyId, data).then(() => {
        router.push("/");
        Vue.notify({
          group: "global",
          title: "Successfully submitted survey!",
          text: "Don't forget to come back next week to fill out the next one"
        });
      });
    } else {
      return false;
    }
  }
};

const mutations = {
  setSurveys(state, payload) {
    state.surveys = payload.surveys;
  },
  setCurrentSurvey(state, payload) {
    state.currentSurvey = payload.currentSurvey;
    console.log(state.currentSurvey.sections);
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
  state,
  getters,
  actions,
  mutations
};
