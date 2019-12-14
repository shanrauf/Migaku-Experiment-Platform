import AxiosClient from "./axiosClient";
const resource = "/users";

export default {
  get() {
    return AxiosClient.get(`${resource}`);
  },
  getUser(participantId) {
    return AxiosClient.get(`${resource}/${participantId}`);
  },
  create(payload) {
    return AxiosClient.post(`${resource}`, payload);
  },
  update(payload, participantId) {
    return AxiosClient.put(`${resource}/${participantId}`, payload);
  },
  delete(participantId) {
    return AxiosClient.delete(`${resource}/${participantId}`);
  }
};
