import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin ,BootstrapVueIcons  } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'
import configs from './config'
import VueDummy from "vue-dummy"
import VueApexCharts from 'vue-apexcharts'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';
import Trend from 'vuetrend';

import './app.css';

Vue.use(Trend);
Vue.use(ElementUI);

Vue.use(VueApexCharts)
Vue.use(VueDummy)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.prototype.$configs = configs;
Vue.prototype.$moment = moment;

Vue.component('apexchart', VueApexCharts)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')