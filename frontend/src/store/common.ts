import { MutationTree, ActionTree } from 'vuex';
import { RootState } from '@/types';

// Common State.
const defaults = {
  sidebar: {
    visible: true
  },
  title: '',
  layout: 'DefaultLayout',
  dialog: {
    visible: false,
    text: ''
  },
  snackbar: {
    visible: false,
    text: '',
    timeout: 6000,
    color: ''
  },
  error: {
    code: null,
    level: null,
    message: ''
  }
};

const actions: ActionTree<typeof defaults, RootState> = {
  clear({ state, commit, rootState, dispatch }) {
    commit('clear');
  },

  updateSidebar({ commit }, options: typeof defaults.sidebar) {
    commit('updateSidebar', options);
  },

  updateTitle({ commit }, title: typeof defaults.title) {
    commit('updateTitle', title);
  },

  updateLayout({ commit }, layout: typeof defaults.layout) {
    commit('updateLayout', layout);
  },

  updateDialog({ commit }, options: typeof defaults.dialog) {
    commit('updateDialog', options);
  },

  updateSnackbar({ commit }, options: typeof defaults.snackbar) {
    commit('updateSnackbar', options);
  }
};

const mutations: MutationTree<typeof defaults> = {
  updateSidebar(state, options: typeof defaults.sidebar) {
    state.sidebar = Object.assign({}, defaults.sidebar, options);
  },

  updateTitle(state, title: typeof defaults.title) {
    state.title = title;
  },

  updateLayout(state, layout: typeof defaults.layout) {
    state.layout = layout;
  },

  updateDialog(state, options: typeof defaults.dialog) {
    state.dialog = Object.assign({}, defaults.dialog, options);
  },

  updateSnackbar(state, options: typeof defaults.snackbar) {
    state.snackbar = Object.assign({}, defaults.snackbar, options);
  },

  error(state, options: typeof defaults.error) {
    state.error = Object.assign({}, defaults.error, options);
  },

  clear(state) {
    state = Object.assign({}, defaults);
  }
};

// Global module loaded on first app load.
export default {
  namespaced: true,

  state: Object.assign({}, defaults),

  mutations,

  actions
};
