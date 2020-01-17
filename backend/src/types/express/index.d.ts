import { IParticipant } from '../../interfaces/IParticipant';

declare global {
  namespace Express {
    export interface User extends IParticipant
  }
}
