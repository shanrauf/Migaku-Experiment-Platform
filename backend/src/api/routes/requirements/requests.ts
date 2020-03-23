import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export interface IRequirements {
  requirementId: string;
}

export interface IRequirement {
  requirementId: string;
}

export class RequirementFilters {
  /**
   * Returns specific experiment
   */
  @Expose()
  @IsString()
  experimentId?: string;
}
