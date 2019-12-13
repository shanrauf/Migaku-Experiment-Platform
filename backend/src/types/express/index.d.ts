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
    export type Experiment = ModelCtor<Model>;
    export type ExperimentSurvey = ModelCtor<Model>;
    export type Survey = ModelCtor<Model>;
    export type Question = ModelCtor<Model>;
    export type SurveySection = ModelCtor<Model>;
    export type QuestionResponse = ModelCtor<Model>;
    export type GenericModel = ModelCtor<Model>;
  }
}
