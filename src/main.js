import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/styles.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import fontAwesome from './assets/fontawesome/fontawesome-free-5.15.1-web/css/all.min.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(fontAwesome)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
