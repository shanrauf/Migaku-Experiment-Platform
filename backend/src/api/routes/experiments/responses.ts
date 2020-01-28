import { Experiment } from "../../../models/experiment";

export type IExperiments = {
  experiments: Experiment[];
  totalCount: number;
};

export type IExperiment = {
  experiment: Experiment | null;
};
