import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


// 导入 路由
import VueRouter from 'vue-router';
// 如果实在模块化的开发环境下 
Vue.use(VueRouter);
// 导入 全局的样式 
import './assets/site/css/style.css'


// 导入每一个页面的 组件
import index from './components/index.vue'

// 写路由规则
let routes = [
  {
    path:'/',
    // 重定向到 首页/index
    redirect:'/index'
  },
  {
    path:'/index',
    component:index
  }
]

// 实例化路由对象
let router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  // 传入路由对象
  router
}).$mount('#app')
