import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/views/login/index'

import Home from '@/components/layout/Home';
import SuperHome from '@/views/Home/SuperHome';
import PersonalHome from '@/views/Home/PersonalHome';
import DocManage from '@/views/DocManage/';
import Hisall from '@/views/Hsup/hisall';
import Notice from "@/views/Notice/notice"

Vue.use(Router);

const constantRouteMap=[
    {
      path:'/Login',
      component:Login
    },
    // {
    //   path:'/',
    //   component:Home,
    //   redirect:'/DashBoard',
    //   children:[{
    //     path:'DashBoard',
    //     component:DashBoard
    //   },{
    //     path:'CRUD',
    //     component:CRUD
    //   }]
    // },{
    //   path:'*',
    //   component:Home,
    //   redirect:'/DashBoard'
    // }
    {
      path:'/',
      component:SuperHome
    },
    {
      path:'/SuperHome',
      component:SuperHome
    },
    {
      path:'/PersonalHome',
      component:PersonalHome
    },
    {
      path: '/index',
      component:DocManage
    }
    ,{
      path: '/hisall',
      component: Hisall
    }
    ,{
      path:'/notice',
      component:Notice
    }
];

export default new Router({
  mode:'history',
  routes: constantRouteMap
});
