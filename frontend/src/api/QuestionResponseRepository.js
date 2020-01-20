import AxiosClient from './axiosClient';
const resource = 'questionresponses';

export default {
  test() {
    return AxiosClient.get(`${resource}/test`);
  },
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

// class SurveyRepository {
//   constructor() {}
// }
