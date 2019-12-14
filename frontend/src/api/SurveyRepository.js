import AxiosClient from "./AxiosClient";
const resource = "experiments/audiovssentencecards/surveys"; // change later when change survey endpoiont to just /surveys w ?experimentId stuff...

export default {
  get() {
    return AxiosClient.get(`${resource}`);
  },
  getSurvey(surveyId) {
    return AxiosClient.get(`${resource}/${surveyId}`);
  },
  post(surveyId, payload) {
    return AxiosClient.post(`${resource}/${surveyId}`, payload);
  },
  create(payload) {
    return AxiosClient.post(`${resource}`, payload);
  },
  update(payload, surveyId) {
    return AxiosClient.put(`${resource}/${surveyId}`, payload);
  },
  delete(surveyId) {
    return AxiosClient.delete(`${resource}/${surveyId}`);
  }
};
