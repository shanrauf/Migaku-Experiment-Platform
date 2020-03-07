import { Question } from '../../../models/question';

export type IQuestions = {
  questions: Question[];
  totalCount: number;
};

export interface IQuestion {
  questionId: string;
  label: string;
  questionType: string;
  dataType: string;
  rules: string;
  question: string;
  value: any;
  items?: string | any[];
  required: boolean;
  questionOrder?: number;
}
