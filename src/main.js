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
} from '@/api/login';
Vue.use(iView);
Vue.config.productionTip = false
let isAdmin = true;
router.beforeEach((to, from, next) => {
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
    if (sessionStorage.getItem('isAdmin') !== 'undefined') {
      if (to.path == "/login") { //判断下一个是不是跳login
        next('/') //跳转到一个不同的地址，当前导航被中断，然后进行一个新的民航
      } else {
        next();
      }
    } else {
      if (to.path == "/login") {
        next();
      } else {
        next('/login');
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
        }
      })
    } else {
      if (to.path == "/login") {
        next();
      } else {
        next('/login');
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
