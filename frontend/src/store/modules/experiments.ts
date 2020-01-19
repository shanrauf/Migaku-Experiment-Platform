// import router from '@/router';
import RepositoryFactory from '@/api';

const state = () => {
  return {
    experiments: [],
    currentExperiment: {}
  };
};

const getters = {
  getExperiments: state => state.experiments
};

const actions = {
  async createExperiments({ commit }) {
    const ExperimentRepository = RepositoryFactory.get('experiments');
    let response = await ExperimentRepository.get();
    const { experiments } = response.data;

    experiments.forEach(experiment => {
      experiment.startDate = new Date(experiment.startDate);
      if (experiment.endDate) {
        experiment.endDate = new Date(experiment.endDate);
      }
    });

    commit({
      type: 'setExperiments',
      experiments
    });
  }
};

const mutations = {
  setExperiments(state, payload) {
    state.experiments = payload.experiments;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
