import AxiosClient from './axiosClient';

import * as requests from '@/../../backend/src/api/routes/questionresponses/requests';
import * as responses from '@/../../backend/src/api/routes/questionresponses/responses';

const resource = '/questionresponses';
export default class QuestionResponseRepository {
  constructor() {}

  public static async get(filters: {
    [key: string]: string;
  }): Promise<responses.IQuestionResponses> {
    const queryParams: string = Object.keys(filters)
      .map(key => key + '=' + filters[key])
      .join('&');
    return AxiosClient.get<responses.IQuestionResponses>(
      `${resource}?${queryParams}`
    ).then(res => res.data);
  }
}
