import AxiosClient from "./axiosClient";

export default class ExperimentRepository {
  resource = "/experiments";

  constructor() {}

  get() {
    return AxiosClient.get(`${this.resource}`);
  }
  getExperiment(experimentId: string) {
    return AxiosClient.get(`${this.resource}/${experimentId}`);
  }
  create(payload: any) {
    return AxiosClient.post(`${this.resource}`, payload);
  }
  update(payload: any, experimentId: string) {
    return AxiosClient.put(`${this.resource}/${experimentId}`, payload);
  }
  delete(experimentId: string) {
    return AxiosClient.delete(`${this.resource}/${experimentId}`);
  }
}
