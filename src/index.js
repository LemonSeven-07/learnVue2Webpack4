import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import echarts from 'echarts'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts;
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app');

require("./assets/css/normal.css");