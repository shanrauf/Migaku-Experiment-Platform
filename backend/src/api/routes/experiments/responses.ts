import { Experiment } from "../../../models/experiment";
import { Participant } from "../../../models/participant";
import { ExperimentParticipant } from "../../../models/intermediary/experimentParticipant";

export type IExperiments = {
  experiments: Experiment[];
  totalCount: number;
};

export type IExperiment = {
  experiment: Experiment | null;
};

export type IExperimentParticipants = {
  participants: Participant[];
  totalCount: number;
};

export type IExperimentParticipant = {
  participant: ExperimentParticipant;
};
