import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/views/login/index'
import NotFound from '@/components/404/'

import Home from '@/components/layout/Home';
import SuperHome from '@/views/Home/SuperHome';
import PersonalHome from '@/views/Home/PersonalHome';
import DocManage from '@/views/DocManage/index';
import Hisall from '@/views/Hsup/index';


import News from '@/views/news/mynews';
import Files from '@/views/File/index';
// import Afs from '@/views/Allfiles/Alls';

import filemanage from '@/views/FileManage/index'
import Personal from '@/views/Personal/index'
import Mynews from '@/views/mynews/index'
import affiche from '@/views/affiche/index'
import details from '@/views/details/index'
import Journal from '@/views/Journal/index'
import Modify from '@/views/Modify/index'
import editor from '@/views/ueitor/index'
import UploadFile from '@/views/Uploadfiles/'


Vue.use(Router);

const constantRouteMap = [
  {
    path: '/login',
    name:'登录',
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: SuperHome,
        meta:{
          require:true
        },
        redirect:to=>{
          if(sessionStorage.getItem('isAdmin')==1){
            return '/SuperHome'
          }else{
            return '/Personal'
          }
        }
      },
      {
        path: '/SuperHome',
        name:'超管首页',
        meta:{
          require:true,
        },
        component: SuperHome
      },
      {
        path:'/uploadfile',
        name:'文件上传',
        component:UploadFile
      },
      {
        path:'/allfiles',
        name:'全部文件',
        component: filemanage
      },
 
      {
        path:'/file',
        name:'文档管理',
        meta:{
          require:true,
        },
        component:Files
      },
      // {
      //   path: '/notice',         //消息推送和公告推送页面重复，请注意看需求分析,删除多余的页面
      //   name:'消息推送',
      //   meta:{
      //     require:true,
      //   },
      //   component: Notice
      // },
      {
        path: '/hisall',
        name:'历史下载',
        component: Hisall
      },
      
      {
        path: '/Personal',
        name:'个人首页',
        component: Personal
      },
      {
        path:'/mynews',
        name:'我的消息',
        component: Mynews
      },
      {
        path:'/news',   // 有多个重复页面
        component:News
      },
     
      {
        path:'/affiche',
        name:'消息推送',
        meta:{
          require:true,
        },
        component: affiche
      },
      {
        path:'/details',
        name:'文章详情',
        component: details
      },
      {
        path:'/Journal',
        name:'操作日志',
        component: Journal
      },
      {
        path:'/Modify',
        name:'修改文件',
        component:Modify
      }, {
        path:'/DocManage',
        name:'文档类型管理',
        component:DocManage
      },
      {
        path:'/editor',
        component:editor
      },
      {
        path: '/404',
        name:'404',
        component: NotFound 
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
