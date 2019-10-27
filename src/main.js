import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

Vue.prototype.$axios = Axios;
Vue.prototype.$url = 'http://localhost:3000/res';

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
