import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './Router/Router';
import store from './store';
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
