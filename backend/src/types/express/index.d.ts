import { IUser } from '../../interfaces/IUser';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser;
    }
  }

  namespace Models {
    export type section = {
      sectionId: string;
      sectionNumber: number;
      title: string;
      description: string | null;
      questions: question[];
    };
    export type question = {
      questionId: string;
      key: string;
      questionType: string;
      dataType: string;
      label: string;
      rules: string;
      items: string | any[];
      required: boolean;
    };
  }
}
