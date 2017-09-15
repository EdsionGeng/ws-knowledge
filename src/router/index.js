import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/views/login/index'
import NotFound from '@/components/404/'

import Home from '@/components/layout/Home';
import SuperHome from '@/views/Home/SuperHome';
import PersonalHome from '@/views/Home/PersonalHome';
import DocManage from '@/views/DocManage/';
import Hisall from '@/views/Hsup/hisall';
import Notice from "@/views/Notice/notice";
import News from '@/views/news/mynews';
import Files from '@/views/File/file';
import Afs from '@/views/Allfiles/Alls';
import Seefile from '@/views/Allfiles/check/Seefile'
import filemanage from '@/views/FileManage/index'

Vue.use(Router);

const constantRouteMap = [
  {
    path: '/Login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: SuperHome
      },
      {
        path: '/SuperHome',
        component: SuperHome
      },
      {
        path: '/PersonalHome',
        component: PersonalHome
      },
      {
        path: '/index',
        component: DocManage
      },
      {
        path: '/hisall',
        component: Hisall
      },
      {
        path: '/notice',
        component: Notice
      },{
        path:'/news',
        component:News
      }
      ,{
        path:'/file',
        component:Files
      }
      ,{
        path:'/afs',
        component: filemanage
      },{
        path:'/seefile',
        component:Seefile
      },
      {
        path: '*',
        component: NotFound 
      }
    ]
  }
  
];

export default new Router({
  mode: 'history',
  routes: constantRouteMap
});
