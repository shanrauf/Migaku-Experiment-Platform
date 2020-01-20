import { MutationTree, ActionTree, GetterTree } from 'vuex';
import { RootState } from '@/types';

const defaults = {
  user: {
    email: '',
    isAdmin: false
  }
};

const getters: GetterTree<typeof defaults, RootState> = {};

const actions: ActionTree<typeof defaults, RootState> = {
  async signup({ commit }) {
    // axios post to create account, then login and set user and jwt token and stuff
    commit({
      type: 'setUser',
      user: {
        email: 'asdf@gmail.com',
        isAdmin: true
      }
    });
  },
  async signIn({ commit }, payload) {
    // axios post to login, then set user and jwt token and stuff
    const { email, password } = payload;
    commit({
      type: 'setUser',
      user: {
        email,
        password,
        isAdmin: false // dangerouos?
      }
    });
  }
};

const mutations: MutationTree<typeof defaults> = {
  setUser(state, payload: typeof defaults) {
    state.user = payload.user;
  }
};

export default {
  state: Object.assign({}, defaults),
  getters,
  actions,
  mutations
};
