import { Experiment } from "../../../models/experiment";
import { Participant } from "../../../models/participant";
import { ExperimentParticipant } from "../../../models/intermediary/experimentParticipant";
import { BaseResponse } from "../responses";

export class IExperiments extends BaseResponse {
  experiments: Experiment[];
  totalCount: number;
}

export class IExperiment extends BaseResponse {
  experiment: Experiment | null;
}

export class IExperimentParticipants extends BaseResponse {
  participants: Participant[];
  totalCount: number;
}

export class IExperimentParticipant extends BaseResponse {
  participant: ExperimentParticipant;
}

export type IDeleteExperiment = {
  deletedCount: number;
};
