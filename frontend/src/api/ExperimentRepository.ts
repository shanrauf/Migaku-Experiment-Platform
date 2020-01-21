import AxiosClient from "./axiosClient";
const resource = "/experiments";
export default class ExperimentRepository {
  constructor() {}

  public static get() {
    return AxiosClient.get(`${resource}`);
  }
  public static getExperiment(experimentId: string) {
    return AxiosClient.get(`${resource}/${experimentId}`);
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
