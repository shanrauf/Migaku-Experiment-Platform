import RepositoryFactory from '@/api/RepositoryFactory';

export default class Service {
  surveyRepository = RepositoryFactory.get('survey');
  constructor(options?) {}

  getSurvey(experimentId) {
    // return this.surveyRepository.get(...);
  }
}
