import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/views/login/index'
import NotFound from '@/components/404/'

import Home from '@/components/layout/Home';
import SuperHome from '@/views/Home/SuperHome';
import PersonalHome from '@/views/Home/PersonalHome';
import DocManage from '@/views/DocManage/';
import Hisall from '@/views/Hsup/index';
import Notice from "@/views/Notice/notice";
import News from '@/views/news/mynews';
import Files from '@/views/File/index';
// import Afs from '@/views/Allfiles/Alls';
import Seefile from '@/views/Allfiles/check/Seefile'
import filemanage from '@/views/FileManage/index'
import Personal from '@/views/Personal/index'
import Mynews from '@/views/mynews/index'
import affiche from '@/views/affiche/index'
import details from '@/views/details/index'
import Journal from '@/views/Journal/index'
import Modify from '@/views/Modify/index'
import editor from '@/views/ueitor/index'


Vue.use(Router);

const constantRouteMap = [
  {
    path: '/login',
    name:'login',
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
        name:'afs',
        component: filemanage
      },{
        path:'/seefile',
        component:Seefile
      },{
        path: '/Personal',
        component: Personal
      },{
        path:'/mynews',
        component: Mynews
      },{
        path:'/affiche',
        component: affiche
      },{
        path:'/details',
        component: details
      },{
        path:'/Journal',
        component: Journal
      },{
        path:'/Modify',
        component:Modify
      },{
        path:'/editor',
        component:editor
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
