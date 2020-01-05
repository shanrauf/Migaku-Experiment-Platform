export interface IExperiment {
  experimentId?: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date | null;
  visibility: string;
  questions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
