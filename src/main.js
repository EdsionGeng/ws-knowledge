// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store'
import E from 'wangeditor'
import {
  login
} from '@/api/login';
Vue.use(iView);
Vue.config.productionTip = false
let isAdmin = true;
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  let params = {
    username: to.query.username,
    password: to.query.password
  }
  if (params.username != undefined) {
    sessionStorage.clear();
  }
  if (sessionStorage.getItem('isLogin')) {
    if (to.path == "/login") {
      next('/')
    } else {
      next();
    }
  } else {
    if (params.username != undefined && params.password != undefined) {
      login(params).then(res => {
        const data = res.data;
        if (data.code == 0) {
          let username = data.data.username;
          let id = data.data.id;
          let userGroupId = data.data.UserGroupId;
          sessionStorage.setItem("isLogin", true);
          sessionStorage.setItem("userGroupId", userGroupId);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("userId", id);
          next();
        } else if (data.code == 2) {
          next('/login');
          // window.location.href = "http://report.wsloan.com:8888/wsdm/login";
        }
      })
    } else {
      if (to.path == "/login") {
        next();
      } else {
        next('/login');
        // window.location.href = "http://report.wsloan.com:8888/wsdm/login";
      }
    }
  }
});


router.afterEach((to, from) => {
  iView.LoadingBar.finish();
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
