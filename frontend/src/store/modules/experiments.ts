import { MutationTree, ActionTree, GetterTree } from "vuex";
import { RootState } from "@/types";

import ExperimentRepository from "@/api/ExperimentRepository";

const defaults = {
  experiments: [],
  currentExperiment: {}
};

const getters: GetterTree<typeof defaults, RootState> = {
  getExperiments: state => state.experiments
};

const actions: ActionTree<typeof defaults, RootState> = {
  async createExperiments({ commit }) {
    let { experiments } = await ExperimentRepository.get();

    experiments.forEach(experiment => {
      // format ISO strings into Date objects
      if (experiment.startDate) {
        experiment.startDate = new Date(experiment.startDate);
      }
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
