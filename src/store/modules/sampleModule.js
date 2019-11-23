// import router from '@/router'; If you want to use the router in Vuex actions and what not
// Note these modules get automatically imported into Vuex via index.js in this folder

const state = () => {
  return {
    test: "test"
  };
};

const getters = {
  getTest: state => state.test
};

const actions = {
  async createTest({ commit }) {
    commit({
      type: "setTest",
      test: "test"
    });
  }
};

const mutations = {
  setTest(state, payload) {
    state.test = payload.test;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
