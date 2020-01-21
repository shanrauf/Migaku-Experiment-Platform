import RepositoryFactory from '@/api/RepositoryFactory';

export default class Service {
  experimentRepository = RepositoryFactory.get('experiment');

  constructor(options?) {}

  getExperiment(experimentId) {
    // return this.experimentRepository.get(...);
  }
}
