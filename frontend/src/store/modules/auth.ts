// import router from '@/router';

const state = () => {
  return {
    user: {}
    // user: "filler to pass router guards"
  };
};

const getters = {};

const actions = {
  async signup({ commit }) {
    // axios post to create account, then login and set user and jwt token and stuff
    commit({
      type: "setUser",
      user: {
        email: "asdf@gmail.com",
        isAdmin: true
      }
    });
  },
  async signIn({ commit }, payload) {
    // axios post to login, then set user and jwt token and stuff
    const { email, password } = payload;
    commit({
      type: "setUser",
      user: {
        email,
        password,
        isAdmin: false // dangerouos?
      }
    });
  }
};

const mutations = {
  setUser(state, payload) {
    state.user = payload.user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
