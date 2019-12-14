import AxiosClient from "./axiosClient";
const resource = "/experiments";

export default {
  get() {
    return AxiosClient.get(`${resource}`);
  },
  getExperiment(experimentId) {
    return AxiosClient.get(`${resource}/${experimentId}`);
  },
  create(payload) {
    return AxiosClient.post(`${resource}`, payload);
  },
  update(payload, experimentId) {
    return AxiosClient.put(`${resource}/${experimentId}`, payload);
  },
  delete(experimentId) {
    return AxiosClient.delete(`${resource}/${experimentId}`);
  }
};
