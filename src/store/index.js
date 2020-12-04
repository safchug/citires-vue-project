import Vue from 'vue';
import Vuex from 'vuex';
import cities from '@/store/modules/cities';
import users from '@/store/modules/users';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    cities,
    users,
  },
});
