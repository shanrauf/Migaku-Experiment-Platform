import AxiosClient from "./axiosClient";

import * as requests from "@/../../backend/src/api/routes/experiments/requests";
import * as responses from "@/../../backend/src/api/routes/experiments/responses";

const resource = "/experiments";
export default class ExperimentRepository {
  constructor() {}

  public static async get(): Promise<responses.IExperiments> {
    return AxiosClient.get<responses.IExperiments>(`${resource}`).then(
      res => res.data
    );
  }
  public static getExperiment(
    experimentId: string
  ): Promise<responses.IExperiment> {
    return AxiosClient.get<responses.IExperiment>(
      `${resource}/${experimentId}`
    ).then(res => res.data);
  }
  public static create(
    payload: requests.IExperiment
  ): Promise<responses.IExperiment> {
    return AxiosClient.post(`${resource}`, payload);
  }
  public static delete(experimentId: string): Promise<{}> {
    return AxiosClient.delete(`${resource}/${experimentId}`);
  }
}
