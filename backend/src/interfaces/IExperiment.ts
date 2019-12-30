export interface IExperiment {
  experimentId: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  visiblilty: string;
  createdAt?: Date;
  updatedAt?: Date;
}
