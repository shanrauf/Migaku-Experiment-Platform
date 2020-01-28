import AxiosClient from "./axiosClient";

import * as requests from "@/../../backend/src/api/routes/surveys/requests";
import * as responses from "@/../../backend/src/api/routes/surveys/responses";

const resource = "/experiments/audiovssentencecards/surveys"; // change later when change survey endpoiont to just /surveys w ?experimentId stuff...
class SurveyRepository {
  constructor() {}

  public static async get(): Promise<responses.ISurveys> {
    return AxiosClient.get<responses.ISurveys>(`${resource}`).then(
      res => res.data
    );
  }
  public static getSurvey(surveyId: string): Promise<responses.ISurvey> {
    return AxiosClient.get<responses.ISurvey>(`${resource}/${surveyId}`).then(
      res => res.data
    );
  }
  public static getStatus(surveyId: string) {
    // can be an actual surveyId, or can be "latest"
    return AxiosClient.get(`${resource}/${surveyId}/status`);
  }
  public static post(surveyId: string, payload: any) {
    return AxiosClient.post(`${resource}/${surveyId}`, payload);
  }
  public static create(surveyId: string, payload: any) {
    return AxiosClient.post(`${resource}`, payload);
  }
  public static delete(surveyId: string) {
    return AxiosClient.delete(`${resource}/${surveyId}`);
  }
}

export default SurveyRepository;
