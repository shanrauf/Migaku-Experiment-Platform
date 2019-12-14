const surveyData = require("@/surveyData.json");
import router from "@/router";
import Vue from "vue";
import RepositoryFactory from "@/api";

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

    commit({
      type: "setSurveys",
      surveys: surveys
    });
  },
  async createCurrentSurvey({ state, commit }, surveyId) {
    // const SurveyRepository = RepositoryFactory.get("surveys");

    // let response = await SurveyRepository.getSurvey(surveyId);

    // let survey = {
    //   ...response.data.survey.rows[0],
    //   sections: [
    //     {
    //       title: "Section 1",
    //       sectionNumber: 1,
    //       description: "This survey helps us gauge your progress so far",
    //       questions: response.data.survey.rows[0].questions
    //     }
    //   ]
    // };

    // commit({
    //   type: "setQuestions",
    //   questions: response.data.survey.rows[0].questions
    // });

    // console.log(response.data.survey.rows[0].questions);

    commit({
      type: "setCurrentSurvey",
      currentSurvey: surveyData.survey
    });
  },
  async submitSurvey({ commit, state }) {
    console.log("Here");
    state.currentSurvey.sections.forEach(section => {
      section.questions.forEach(question => {
        if (!question.value) {
          Vue.notify({
            title: "You haven't filled out every question yet..",
            group: "global"
          });
          throw BreakException;
        }
      });
    });

    // formatting payload...
    let payload = {};
    state.currentSurvey.sections.forEach(section => {
      sectiion.questions.forEach(question => {
        // add to payload
        if (question.key == "email") {
          data["email"] = question.value;
        } else {
          payload[question.key] = {
            value: question.value,
            dataType: question.dataType,
            questionId: q.questionId
          };
        }
      });
    });

    data["data"] = payload;

    const SurveyRepository = RepositoryFactory.get("surveys");

    SurveyRepository.post(data).then(() => {
      Vue.notify({
        title: "Successfully submitted survey!",
        text: "Don't forget to come back next week to fill out the next one"
      });
      router.push("/");
    });
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
