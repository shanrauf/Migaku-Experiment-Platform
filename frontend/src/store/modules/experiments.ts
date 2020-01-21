import { MutationTree, ActionTree, GetterTree } from "vuex";
import { RootState } from "@/types";

import RepositoryFactory from "@/api/index";

const defaults = {
  experiments: [],
  currentExperiment: {}
};

const getters: GetterTree<typeof defaults, RootState> = {
  getExperiments: state => state.experiments
};

const actions: ActionTree<typeof defaults, RootState> = {
  async createExperiments({ commit }) {
    const ExperimentRepository = RepositoryFactory.get("experiments");
    let response = await ExperimentRepository.get();
    const { experiments } = response.data;

    experiments.forEach((experiment: any) => {
      experiment.startDate = new Date(experiment.startDate);
      if (experiment.endDate) {
        experiment.endDate = new Date(experiment.endDate);
      }
    });

    commit({
      type: "setExperiments",
      experiments
    });
  }
};

const mutations: MutationTree<typeof defaults> = {
  setExperiments(state, payload) {
    state.experiments = payload.experiments;
  }
};

export default {
  state: Object.assign({}, defaults),
  getters,
  actions,
  mutations
};
