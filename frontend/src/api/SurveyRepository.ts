import AxiosClient from './axiosClient';

import * as requests from '@/../../backend/src/api/routes/surveys/requests';
import * as responses from '@/../../backend/src/api/routes/surveys/responses';

// TODO: YOU NEED TO DYNAMICALLY SET EXPERIMENTID!
const resource = '/experiments/mia-community-census/surveys'; // change later when change survey endpoiont to just /surveys w ?experimentId stuff...
class SurveyRepository {
  constructor() {}

  public static async get(filters: {
    [key: string]: string;
  }): Promise<responses.ISurveys> {
    const queryParams: string = Object.keys(filters)
      .map((key) => key + '=' + filters[key])
      .join('&');
    return AxiosClient.get<responses.ISurveys>(
      `${resource}?${queryParams}`
    ).then((res) => res.data);
  }
  public static getSurvey(surveyId: string): Promise<responses.ISurvey> {
    return AxiosClient.get<responses.ISurvey>(`${resource}/${surveyId}`).then(
      (res) => res.data
    );
  }
  /**
   * Returns survey completion status for the participant
   * @param surveyId Can be a random surveyId or "latest"
   */
  public static getStatus(surveyId: string): Promise<responses.ISurveyStatus> {
    return AxiosClient.get<responses.ISurveyStatus>(
      `${resource}/${surveyId}/status`
    ).then((res) => res.data);
  }
  public static post(surveyId: string, payload: any) {
    return AxiosClient.post(`${resource}`, payload);
  }
  public static postResponses(surveyId: string, payload: any) {
    return AxiosClient.post(`${resource}/${surveyId}/responses`, payload);
  }
  public static create(surveyId: string, payload: any) {
    return AxiosClient.post(`${resource}`, payload);
  }
  public static delete(surveyId: string) {
    return AxiosClient.delete(`${resource}/${surveyId}`);
  }
}

export default SurveyRepository;
