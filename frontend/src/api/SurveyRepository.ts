import AxiosClient from './axiosClient';

import * as requests from '@/../../backend/src/api/routes/surveys/requests';
import * as responses from '@/../../backend/src/api/routes/surveys/responses';

const resource = '/experiments/audiovssentencecards/surveys'; // change later when change survey endpoiont to just /surveys w ?experimentId stuff...
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
  /**
   * Returns survey completion status for the participant
   * @param surveyId Can be a random surveyId or "latest"
   */
  public static getStatus(surveyId: string): Promise<responses.ISurveyStatus> {
    return AxiosClient.get<responses.ISurveyStatus>(
      `${resource}/${surveyId}/status`
    ).then(res => res.data);
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
