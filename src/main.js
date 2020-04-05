import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui';
import MyServerHttp from '@/plugins/http.js'

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/reset.css';
import router from './router'

//使用vue插件
Vue.use(MyServerHttp)
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
