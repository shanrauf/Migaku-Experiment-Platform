import AxiosClient from "./AxiosClient";
const resource = "/surveys";

export default {
  get() {
    return AxiosClient.get(`${resource}`);
  },
  getExperiment(surveyId) {
    return AxiosClient.get(`${resource}/${surveyId}`);
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
