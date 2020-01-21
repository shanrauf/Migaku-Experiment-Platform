import AxiosClient from "./axiosClient";

class SurveyRepository {
  resource = "/experiments/audiovssentencecards/surveys"; // change later when change survey endpoiont to just /surveys w ?experimentId stuff...

  constructor() {}

  get() {
    return AxiosClient.get(`${this.resource}`);
  }
  getSurvey(surveyId: string) {
    return AxiosClient.get(`${this.resource}/${surveyId}`);
  }
  getStatus(surveyId: string) {
    // can be an actual surveyId, or can be "latest"
    return AxiosClient.get(`${this.resource}/${surveyId}/status`);
  }
  post(surveyId: string, payload: any) {
    return AxiosClient.post(`${this.resource}/${surveyId}`, payload);
  }
  create(surveyId: string, payload: any) {
    return AxiosClient.post(`${this.resource}`, payload);
  }
  delete(surveyId: string) {
    return AxiosClient.delete(`${this.resource}/${surveyId}`);
  }
}

export default SurveyRepository;
