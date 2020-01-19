import RepositoryFactory from '@/api/RepositoryFactory';

export default class Service {
  constructor(options) {
    this.experimentRepository = RepositoryFactory.get('experiment');
  }

  getExperiment(experimentId) {
    // return this.experimentRepository.get(...);
  }
}
