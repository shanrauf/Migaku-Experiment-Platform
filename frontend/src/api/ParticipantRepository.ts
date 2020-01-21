import AxiosClient from "./axiosClient";
const resource = "/participants";
export default class ParticipantRepository {
  constructor() {}

  public static get() {
    return AxiosClient.get(`${resource}`);
  }
  public static getUser(participantId: string) {
    return AxiosClient.get(`${resource}/${participantId}`);
  }
  public static create(payload: any) {
    return AxiosClient.post(`${resource}`, payload);
  }
  public static update(payload: any, participantId: string) {
    return AxiosClient.put(`${resource}/${participantId}`, payload);
  }
  public static delete(participantId: string) {
    return AxiosClient.delete(`${resource}/${participantId}`);
  }
}
