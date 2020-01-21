import AxiosClient from "./axiosClient";
const resource = "/experiments/audiovssentencecards/surveys"; // change later when change survey endpoiont to just /surveys w ?experimentId stuff...
class SurveyRepository {
  constructor() {}

  public static get() {
    return AxiosClient.get(`${resource}`);
  }
  getSurvey(surveyId: string) {
    return AxiosClient.get(`${resource}/${surveyId}`);
  }
  getStatus(surveyId: string) {
    // can be an actual surveyId, or can be "latest"
    return AxiosClient.get(`${resource}/${surveyId}/status`);
  }
  post(surveyId: string, payload: any) {
    return AxiosClient.post(`${resource}/${surveyId}`, payload);
  }
  create(surveyId: string, payload: any) {
    return AxiosClient.post(`${resource}`, payload);
  }
  delete(surveyId: string) {
    return AxiosClient.delete(`${resource}/${surveyId}`);
  }
}

export default SurveyRepository;
