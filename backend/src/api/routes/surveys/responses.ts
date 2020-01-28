import { IQuestion } from "../questions/requests";

export interface ISurveys {
  surveys: ISurvey[];
}

export interface ISurvey {
  surveyId: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  surveyCategory?: string;
  visibility?: string;
  sections?: ISurveySection[];
}
export interface ISurveySection {
  sectionId: string;
  sectionNumber: number;
  title: string;
  description: string | null;
  questions: IQuestion[];
}
