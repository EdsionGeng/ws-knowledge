// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView  from 'iview'
import 'iview/dist/styles/iview.css'
import  Cookies from 'js-cookie'
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
  created(){
    // this.checkLogin();
    console.log(this.$axios ? 'Axios works!' :'no');
  },
  // template: '<App/>',
  // components: { App },
  render:hello=>hello(App),
  methods:{
    checkLogin(){
      console.log(Cookies.get('isLogin'));
      if(Cookies.get('isLogin')){
        // this.$router.push('/')
      }else{
        this.$router.push('/Login');
      }
    }
  }
})
