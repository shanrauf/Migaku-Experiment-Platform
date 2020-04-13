import AxiosClient from './axiosClient';

import * as requests from '@/../../backend/src/api/routes/questions/requests';
import * as responses from '@/../../backend/src/api/routes/questions/responses';

const resource = '/questions';
export default class QuestionRepository {
  constructor() {}

  public static async get(filters: {
    [key: string]: string;
  }): Promise<responses.IQuestions> {
    const queryParams: string = Object.keys(filters)
      .map(key => key + '=' + filters[key])
      .join('&');
    return AxiosClient.get<responses.IQuestions>(
      `${resource}?${queryParams}`
    ).then(res => res.data);
  }
}
