export interface IExperiment {
  experimentId?: string;
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date | null;
  visibility: string;
  questions?: string[]; // questionId[]
  requirements?: string[]; // requirementId[]
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IRequirement {
  requirementId: string;
  title: string;
  description?: string;
  dataType: string;
  image?: string;
  value: string;
}
