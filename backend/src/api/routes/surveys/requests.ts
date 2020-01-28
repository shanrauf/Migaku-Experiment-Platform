import { IQuestion } from "../questions/requests";

export class ISurveyFilters {
  experimentId?: string;
}

export class ISurvey {
  surveyId: string;
  title: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  surveyCategory?: string;
  visibility?: string;
  sections?: ISurveySection[];
}
export class ISurveySection {
  sectionId: string;
  sectionNumber: number;
  title: string;
  description: string | null;
  questions: IQuestion[];
}
