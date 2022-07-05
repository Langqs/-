import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN';
//import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

//引入echarts，并声明为全局变量
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts

//全局组件 三级联动选择
import CategorySelect from '@/components/CategorySelect';
Vue.component('CategorySelect',CategorySelect)

//引入API请求接口
import API from '@/api';
Vue.prototype.$API = API

/**
 * 如果不想使用模拟服务器
 * 您想对模拟api使用MockJs
 * 您可以执行: mockXHR()
 *
 * 目前，MockJs将用于生产(production)环境,
 * 请在联机之前将其删除！
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus =this
  },
})
