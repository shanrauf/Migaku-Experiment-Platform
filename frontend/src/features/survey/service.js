import RepositoryFactory from '@/api/RepositoryFactory';

export default class Service {
  constructor(options) {
    this.surveyRepository = RepositoryFactory.get('survey');
  }

  getSurvey(experimentId) {
    // return this.surveyRepository.get(...);
  }
}
