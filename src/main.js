import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueTelInputVuetify from 'vue-tel-input-vuetify/lib';
import VueLoading from 'vuejs-loading-plugin'
import store from './store'


//  import store from './store/store'
// using default options
Vue.use(VueLoading)
Vue.use(VueTelInputVuetify, {
  vuetify,
});
Vue.config.productionTip = false

new Vue({
  // store,
  router,

  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
