import AxiosClient from "./AxiosClient";
const resource = "/experiments";

export default {
  get() {
    return AxiosClient.get(`${resource}`);
  },
  getExperiment(id) {
    return AxiosClient.get(`${resource}/${id}`);
  },
  create(payload) {
    return AxiosClient.post(`${resource}`, payload);
  },
  update(payload, id) {
    return AxiosClient.put(`${resource}/${id}`, payload);
  },
  delete(id) {
    return AxiosClient.delete(`${resource}/${id}`);
  }

  // MANY OTHER ENDPOINT RELATED STUFFS
};
