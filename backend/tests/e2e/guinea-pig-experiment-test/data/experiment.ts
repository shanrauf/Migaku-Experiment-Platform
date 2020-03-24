import { IExperiment } from '../../../../src/api/routes/experiments/requests';
import { randomIdGenerator } from '../../../../src/utils';

export const testExperiment: IExperiment = {
  experimentId: randomIdGenerator(),
  title: 'Audio vs Sentence Cards',
  description:
    'This experiment seeks to compare differences in retention between audio and sentence cards.',
  visibility: 'private',
  startDate: new Date(Date.now()).toISOString(),
  endDate: null
};
