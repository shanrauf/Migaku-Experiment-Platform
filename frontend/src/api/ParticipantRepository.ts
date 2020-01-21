import AxiosClient from "./axiosClient";

export default class ParticipantRepository {
  resource = "/participants";

  constructor() {}

  get() {
    return AxiosClient.get(`${this.resource}`);
  }
  getUser(participantId: string) {
    return AxiosClient.get(`${this.resource}/${participantId}`);
  }
  create(payload: any) {
    return AxiosClient.post(`${this.resource}`, payload);
  }
  update(payload: any, participantId: string) {
    return AxiosClient.put(`${this.resource}/${participantId}`, payload);
  }
  delete(participantId: string) {
    return AxiosClient.delete(`${this.resource}/${participantId}`);
  }
}
