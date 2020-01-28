import { IsISO8601, IsOptional, IsDefined } from "class-validator";

export class IExperiment {
  @IsDefined()
  experimentId!: string;

  title!: string;

  description?: string;

  @IsISO8601()
  startDate!: string;

  @IsOptional()
  @IsISO8601()
  endDate?: string | null;

  visibility!: string;

  questions?: string[]; // questionId[]

  requirements?: string[]; // requirementId[]
}
