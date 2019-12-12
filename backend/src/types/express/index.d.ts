import { Participant } from "../../models/participant";
import { IUser } from "../../interfaces/IUser";
import { Model, ModelCtor } from "sequelize-typescript";
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser;
    }
  }

  namespace Models {
    export type Participant = ModelCtor<Model & IUser>;
    export type GenericModel = ModelCtor<Model>;
  }
}
