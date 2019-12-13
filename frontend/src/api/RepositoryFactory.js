import ParticipantRepository from "./ParticipantRepository";
import ExperimentRepository from "./ExperimentRepository";
import SurveyRepository from "./SurveyRepository";

const repositories = {
  participants: ParticipantRepository,
  experiments: ExperimentRepository,
  surveys: SurveyRepository
};
export default {
  get: name => repositories[name]
};
