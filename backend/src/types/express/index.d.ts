import type { Participant } from '../../models/participant';

declare global {
  namespace Express {
    export interface User extends Partial<Participant> {
      /**
       * From Passport.js
       */
      discordId: string;

      /**
       * To implement admin accounts.
       */
      adminId: string;

      miaDiscord: boolean;
    }
  }
}
