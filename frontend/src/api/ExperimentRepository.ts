import AxiosClient from "./axiosClient";

import { Experiment } from "@/../../backend/src/models/experiment";

interface IExperiments {
  experiments: Experiment[];
  totalCount: number;
}

interface IExperiment {
  experiment: Experiment;
}

const resource = "/experiments";
export default class ExperimentRepository {
  constructor() {}

  public static async get(): Promise<IExperiments> {
    return AxiosClient.get<IExperiments>(`${resource}`).then(res => res.data);
  }
  public static getExperiment(experimentId: string): Promise<IExperiment> {
    return AxiosClient.get<IExperiment>(`${resource}/${experimentId}`).then(
      res => res.data
    );
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
