import AxiosClient from "./axiosClient";
const resource = "experiments/audiovssentencecards/surveys"; // change later when change survey endpoiont to just /surveys w ?experimentId stuff...

export default {
  get() {
    return AxiosClient.get(`${resource}`);
  },
  getSurvey(surveyId) {
    return AxiosClient.get(`${resource}/${surveyId}`);
  },
  getStatus(surveyId) {
    // can be an actual surveyId, or can be "latest"
    return AxiosClient.get(`${resource}/${surveyId}/status`);
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
