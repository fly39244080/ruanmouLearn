import Vue from 'vue'

import App from './app.vue'

// 引入路由
import router from "./router.js";   
//引入store仓库
import store from "./store/index.js"; 

import axios from './providers/axios.js';
import api from './providers/api.js';

//全局引入 iView框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(iView);
//定义全局变量$http
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
// const root = document.createElement('div')
// root.id='appTest';
// document.body.appendChild(root);

import pluginsTest from './views/plugins/index.js' ;
import vMyDirective from './views/plugins/loading.js';
require('./views/plugins/index.less');

import MetaInfo from 'vue-meta-info';
Vue.use(MetaInfo)
Vue.use(vMyDirective);

Vue.use(pluginsTest.countDown);
Vue.use(pluginsTest.Loading);



new Vue({
  data(){
    return {
      eventtest: new Vue()
    }
  },
  store,
//  render: (h) => h(App)
// render (h) {
//     return h('div', 'poo')
//   }
router,  // 注入到根实例中
render(h){
    return h(App)
}
}).$mount('#app')


//官方
// var vm = new Vue({
//     render:createElement => createElement('h1',[
//         createElement('span',{style:{color:'red'}},'hello'),
//         createElement('span','world')
//     ])
// });
// vm.$mount('#app');
