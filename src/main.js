// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView  from 'iview'
import 'iview/dist/styles/iview.css'
import store from './store'
// import AxiosPlugin from './utils/axios.js'
// import './mock/index.js'

 Vue.use(iView);
// Vue.use(AxiosPlugin,'$axios');
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
 
  next();
});



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
