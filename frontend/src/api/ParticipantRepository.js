import AxiosClient from "./AxiosClient";
const resource = "/users";

export default {
  get() {
    return AxiosClient.get(`${resource}`);
  },
  getUser(id) {
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
};
