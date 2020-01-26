import AxiosClient from "./axiosClient";

import { Survey } from "@/../../backend/src/models/survey";

interface ISurveys {
  surveys: Survey[];
}

interface ISurvey {
  survey: Survey;
}

const resource = "/experiments/audiovssentencecards/surveys"; // change later when change survey endpoiont to just /surveys w ?experimentId stuff...
class SurveyRepository {
  constructor() {}

  public static async get(): Promise<ISurveys> {
    return AxiosClient.get<ISurveys>(`${resource}`).then(res => res.data);
  }
  public static getSurvey(surveyId: string): Promise<ISurvey> {
    return AxiosClient.get<ISurvey>(`${resource}/${surveyId}`).then(
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
