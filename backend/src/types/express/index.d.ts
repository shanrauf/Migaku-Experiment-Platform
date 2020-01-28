import { Participant } from "../../models/participant";

declare global {
  namespace Express {
    export interface User extends Participant {}
  }
}
