import ParticipantRepository from "./ParticipantRepository";
import ExperimentRepository from "./ExperimentRepository";
import SurveyRepository from "./SurveyRepository";

const repositories: any = {
  participants: ParticipantRepository,
  experiments: ExperimentRepository,
  surveys: SurveyRepository
};

export default class RepositoryFactory {
  constructor() {}
  public static get(repositoryName: string, options?: object) {
    const Repository = repositories[repositoryName];
    return new Repository({ ...options });
  }
}
