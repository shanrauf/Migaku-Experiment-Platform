import ParticipantRepository from './ParticipantRepository';
import ExperimentRepository from './ExperimentRepository';
import SurveyRepository from './SurveyRepository';
import QuestionResponseRepository from './QuestionResponseRepository';

const repositories = {
  participants: ParticipantRepository,
  experiments: ExperimentRepository,
  surveys: SurveyRepository,
  questionResponses: QuestionResponseRepository
};
export default {
  get: name => repositories[name]
};
