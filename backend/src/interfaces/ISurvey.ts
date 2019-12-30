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

export interface IQuestion {
  questionId: string;
  key: string;
  questionType: string;
  dataType: string;
  label: string;
  rules: string;
  items: string | any[];
  required: boolean;
}

export interface IQuestionResponse {
  questionId: string;
  value: string;
  dataType: string;
}
