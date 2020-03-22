import { Experiment } from "../../../models/experiment";
import { Participant } from "../../../models/participant";
import { ExperimentParticipant } from "../../../models/intermediary/experimentParticipant";

export class IExperiments {
  experiments: Experiment[];
  totalCount: number;
}

export class IExperiment {
  experiment: Experiment | null;
}

export class IExperimentParticipants {
  participants: Participant[];
  totalCount: number;
}

export class IExperimentParticipant {
  participant: ExperimentParticipant;
}

export type IDeleteExperiment = {
  deletedCount: number;
};
