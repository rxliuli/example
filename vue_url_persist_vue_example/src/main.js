import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueUrlPersist from './views/js/VueUrlPersist'

Vue.config.productionTip = false

const vueUrlPersist = new VueUrlPersist()
Vue.use(vueUrlPersist)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
