import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/common/Home'
import DashBoard from '@/components/page/DashBoard'
import CRUD from '@/components/page/demo1/CRUD'
import Login from '@/views/login/index'

Vue.use(Router);


const constantRouteMap=[
    {path:'/Login',component:Login},
    {
      path:'/',
      component:Home,
      redirect:'/DashBoard',
      children:[{
        path:'DashBoard',
        component:DashBoard
      },{
        path:'CRUD',
        component:CRUD
      }]
    },{
      path:'*',
      component:Home,
      redirect:'/DashBoard'
    }
];





export default new Router({
  routes: constantRouteMap
})
