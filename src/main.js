import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 导入element-ui框架
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 注册到Vue上
Vue.use(ElementUI);

// 导入IView框架
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 注册到Vue上
Vue.use(iView);

// 放大镜组件
import ProductZoomer from 'vue-product-zoomer'
Vue.use(ProductZoomer)

// 导入 axios
// 类似于 vue-resource this.$http
import axios from 'axios'
// 设置到Vue的原型上 那么所有Vue实例化出来的对象 和组件都能够共享这个属性
// 一般来说 设置到原型上的 属性 Vue中 会使用$作为前缀 用来区分普通的属性
Vue.prototype.$axios = axios;
// 使用axios的方式设置基础地址
axios.defaults.baseURL = 'http://111.230.232.110:8899/';

// 抽取基础地址
// Vue.prototype.$baseUrl = 'http://111.230.232.110:8899/'

// 导入 路由
import VueRouter from "vue-router";
// 如果实在模块化的开发环境下
Vue.use(VueRouter);
// 导入 全局的样式
import "./assets/site/css/style.css";

// 导入每一个页面的 组件
import index from "./components/index.vue";
import detail from "./components/02.detail.vue";
import shopCart from "./components/03.shopCart.vue";

// 写路由规则
let routes = [
  {
    path: "/",
    // 重定向到 首页/index
    redirect: "/index"
  },
  {
    path: "/index",
    component: index
  },
  // 使用动态路由匹配 传递参数
  {
    path: "/detail/:artID",
    component: detail
  },
  // 购物车的跳转 不需要带数据
  {
    path: "/shopCart",
    component: shopCart
  },
];

// 实例化路由对象
let router = new VueRouter({
  routes
});

// 注册全局过滤器 方便使用
// 导入 moment
import moment from 'moment';
Vue.filter("shortTime", value => {
  //   console.log(value);
  // 处理时间数据
  // 返回处理之后的数据
  // 要显示什么 就返回什么
  console.log(moment(value).format("YYYY😘MM😘DD👍"));
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY🚲MM🚲DD🚲");
});
Vue.filter("shortTimePlus", value => {
  //   return '😁😁😁😁😁😁';
  return moment(value).format("YYYY/MM/DD HH:mm:ss");
});




// Vuex的使用
import Vuex from 'vuex'
Vue.use(Vuex)


// let data = JSON.parse(window.localStorage.getItem('hm24'));
// if(!data){
//   data = {
//     90:6,
//     84:7
//   }
// }
// 实例化仓库对象
const store = new Vuex.Store({
  // 状态
  state: {
    // count: 0
    // 购物车数据对象
    // 短路运算 || 如果没有数据 左边的值是 false 去获取 || 右边的值
    cartData:JSON.parse(window.localStorage.getItem('hm24'))||{
      90:6,
      84:7
    }
    // cartData:data
  },
  // Vuex的计算属性
  getters:{
    totalCount(state){
      // 通过state 获取 内部的数据
      // 计算并返回
      // return 998;
      let num = 0;
      for (const key in state.cartData) {
        // 循环累加
        num+=state.cartData[key]
      }
      return num;
    }
  },
  // 数据改变的方法
  mutations: {
    // 增加
    // state就是 上面的 数据 state
    // 测试用方法
    // increment (state,obj) {
    //   console.log('触发了')
    //   console.log(state);
    //   console.log(obj);
    //   // state.count+=n
    //   // state.count+=m;
    // }
    // 往购物车添加数据的方法 2->two
    // 约定 对象的属性名  goodId(商品id)  goodNum(商品个数)
    add2Cart(state,obj){
      // console.log(obj);
      // 商品已经存在{goodId:90,goodNum:6}
      if(state.cartData[obj.goodId]!=undefined){
        // 累加即可 state.carData.goodId +=10
        // state.cartData[obj.goodId]+=obj.goodNum;

        // 上面代码的 扩写
        let oldNum = state.cartData[obj.goodId];
        oldNum+=obj.goodNum;
        state.cartData[obj.goodId]=oldNum;
      }else{
        // 商品不存在
        // 动态增加键值对
        // state.cartData[obj.goodId] = obj.goodNum;
        // 如果是动态增加的属性 必须使用Vue.set才可以跟踪数据改变
        // 参数1 对象 参数2 添加的属性名 参数3 属性的值
        Vue.set(state.cartData,obj.goodId,obj.goodNum)
      }
      // 打印内容
      console.log(state);
    }
  }
})

// 浏览器关闭保存数据
window.onbeforeunload = function () {
  window.localStorage.setItem('hm24',JSON.stringify(store.state.cartData))
  }
// 实例化Vue
new Vue({
  render: h => h(App),
  // 传入路由对象
  router,
  // 需要把store传递给 Vue实例 这样在子组件中才可以使用$store
  store
}).$mount("#app");
