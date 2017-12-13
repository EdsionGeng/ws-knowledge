// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store'
import {
  login
} from '@/api/login'
// import AxiosPlugin from './utils/axios.js'
// import './mock/index.js'

Vue.use(iView);
// Vue.use(AxiosPlugin,'$axios');
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  console.log(to) //path:'login'
  console.log(from) //path:'/'
  let params = {
    username: to.query.username,
    password: to.query.password
  }
  if (params.username != undefined) {
    console.log(1111)
    sessionStorage.clear();
  }
  console.log(sessionStorage)
  if (sessionStorage.getItem('isLogin')) {
    console.log(sessionStorage.getItem('isAdmin') !== 'undefined')
    console.log(sessionStorage.getItem('isAdmin'))
    if (sessionStorage.getItem('isAdmin') !== 'undefined') {
      console.log(3333)
      // 这下面是什么意思
      if (to.path == "/login") { //判断下一个是不是跳login
        console.log(4444)
        next('/') //跳转到一个不同的地址，当前导航被中断，然后进行一个新的民航
      } else {
        console.log(5555)
        next();
      }
    } else {
      console.log(6666)
      if (to.path == "/login") {
        console.log(7777)
        next();
      } else {
        console.log(8888)
        next('/login');
        // window.location.href="http://report.wsloan.com:8888/wsdm/login";
      }
    }
  } else {
    if (params.username != undefined && params.password != undefined) {
      login(params).then(res => {
        const data = res.data;
        if (data.code === 200) {
          const users = data.data.users;
          const id = users.id;
          const token = data.data.token;
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("token", token);
          next();
        } else if (data.code === 500) {
          next('/login');
          // window.location.href="http://report.wsloan.com:8888/wsdm/login";
        }
      })
    } else {
      if (to.path == "/login") {
        next();
      } else {
        next('/login');
        // window.location.href="http://report.wsloan.com:8888/wsdm/login";
      }
    }
  }
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
