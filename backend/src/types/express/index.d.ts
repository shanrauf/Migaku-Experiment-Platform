import { Model, ModelCtor } from 'sequelize-typescript';
import { Participant } from '../../models/participant';
import { IUser } from '../../interfaces/IUser';
import { Experiment } from '../../models/experiment';
import { ExperimentSurvey } from '../../models/intermediary/experimentSurvey';
import { Survey } from '../../models/survey';
import { Question } from '../../models/question';
import { SurveyQuestion } from '../../models/intermediary/surveyQuestion';
import { QuestionResponse } from '../../models/questionResponse';
import { SurveySection } from '../../models/surveySection';
import { CardCollection } from '../../models/cardCollection';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser;
    }
  }

  namespace Models {
    export type ParticipantModel = ModelCtor<Participant & IUser>;
    export type ExperimentModel = ModelCtor<Experiment>;
    export type ExperimentSurveyModel = ModelCtor<ExperimentSurvey>;
    export type CardCollectionModel = ModelCtor<CardCollection>;
    export type SurveyModel = ModelCtor<Survey>;
    export type QuestionModel = ModelCtor<Question>;
    export type SurveySectionModel = ModelCtor<SurveySection>;
    export type SurveyQuestionModel = ModelCtor<SurveyQuestion>;
    export type QuestionResponseModel = ModelCtor<QuestionResponse>;
    export type GenericModel = ModelCtor<Model>;
  }
}
