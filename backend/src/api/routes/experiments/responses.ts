import { Experiment } from "../../../models/experiment";
import { Participant } from "../../../models/participant";
import { ExperimentParticipant } from "../../../models/intermediary/experimentParticipant";
import { BaseResponse } from "../responses";
import { Expose } from "class-transformer";

export class IExperiments extends BaseResponse {
  @Expose()
  experiments: Experiment[];

  @Expose()
  totalCount: number;
}

export class IExperiment extends BaseResponse {
  @Expose()
  experiment: Experiment | null;
}

export class IExperimentParticipants extends BaseResponse {
  @Expose()
  participants: Participant[];

  @Expose()
  totalCount: number;
}

export class IExperimentParticipant extends BaseResponse {
  @Expose()
  participant: ExperimentParticipant;
}
