import { Experiment } from '../../../models/experiment';
import { Participant } from '../../../models/participant';
import { ExperimentParticipant } from '../../../models/intermediary/experimentParticipant';
import { BaseResponse } from '../../BaseResponse';

export class IExperiments extends BaseResponse {
  experiments: Experiment[];
  totalCount: number;
}

export class IExperiment extends BaseResponse {
  experiment: Experiment | null;
}

export class IExperimentParticipant extends BaseResponse {
  participant: ExperimentParticipant;
}

export class IDeleteExperiment extends BaseResponse {
  deletedCount: number;
  constructor() {
    super();
    this.message = `${this.deletedCount} experiment${
      this.deletedCount > 1 ? 's' : ''
    } created.`;
  }
}
