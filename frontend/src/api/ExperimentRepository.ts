import AxiosClient from "./axiosClient";

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
  public static create(payload: any) {
    return AxiosClient.post(`${resource}`, payload);
  }
  public static update(payload: any, experimentId: string) {
    return AxiosClient.put(`${resource}/${experimentId}`, payload);
  }
  public static delete(experimentId: string) {
    return AxiosClient.delete(`${resource}/${experimentId}`);
  }
}
