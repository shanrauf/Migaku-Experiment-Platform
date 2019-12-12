import ParticipantRepository from "./ParticipantRepository";
import ExperimentRepository from "./ExperimentRepository";

const repositories = {
  participants: ParticipantRepository,
  experiments: ExperimentRepository
};
export default {
  get: name => repositories[name]
};
