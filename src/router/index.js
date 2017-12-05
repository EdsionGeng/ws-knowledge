import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/common/Home'
import DashBoard from '@/components/page/DashBoard'
import CRUD from '@/components/page/demo1/CRUD'
import hisupload from '@/views/historyupload/index'                       //历史上传
import allfiles from '@/views/allfiles/index'                             //全部文件
import docdirmanagement from '@/views/docdirmanagement/index'//文档目录管理
import docmanagement from '@/views/docmanagement/index'//文档管理
import keySearchPage from '@/views/keySearchPage/index'//关键词搜索结果页面
import messagemanage from '@/views/messagemanage/index'//文件管理
import mymessage from '@/views/mymessage/index'//个人中心
import newfile from '@/views/newfile/index'//上传文件
import check from '@/views/allfiles/check'//全部文件/查看文件
import log from '@/views/allfiles/logs'//全部文件/查看文件/文件日志
import change from '@/views/allfiles/change'//全部文件/修改文件
import Login from '@/views/login/index'
import AdminHome from '@/views/home/admin'

Vue.use(Router);


const constantRouteMap = [{
    path: '/Login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    redirect: '/admin',
    children: [
      {
        path: 'admin',
        component: AdminHome,
        meta:{
          pname: '首页'
        }
      }
      ,{
      path: 'DashBoard',
      component: DashBoard
    }, {
      path: 'CRUD',//文件管理全部文件
      component: CRUD
    }, {
      path: 'hisupload',
      component: hisupload,
      meta:{
        pname: '文件管理',
        cname: '历史上传'
      }
    }, {
      path: 'mymessage',
      component: mymessage,
      meta:{
        pname: '个人中心',
        cname: '我的消息'
      }
    }, {
      path: 'docmanagement',
      component: docmanagement,
      meta:{
        pname: '管理中心',
        cname: '文档管理'
      }
    }, {
      path: 'docdirmanagement',
      component: docdirmanagement,
      meta:{
        pname: '管理中心',
        cname: '文档目录管理'
      }
    },{
      path: 'keySearchPage',
      component: keySearchPage,
      meta:{
        pname: '搜索文件'
      }
    },{
      path: 'allfiles',
      component: allfiles,
      meta:{
        pname: '文件管理',
        cname: '全部文件'
      }
    },{
      path: 'newfile',
      component: newfile,
      meta:{
        pname: '新建文件'
        
      }
    },{
      path: 'check',
      component: check,
      meta:{
        pname: '文件管理',
        cname: '全部文件',
        tname: '查看文件'
      }
    },{
      path: 'log',
      component: log,
      meta:{
        pname: '文件管理',
        cname: '全部文件',
        tname: '查看文件',
        lname: '查看日志'
      }
    },{
      path: 'change',
      component: change,
      meta:{
        pname: '文件管理',
        cname: '全部文件',
        tname: '修改文件'
      }
    },{
      path: 'messagemanage',
      component: messagemanage,
      meta:{
        pname: '管理中心',
        cname: '消息管理'
      }
    }]
  }, {
    path: '*',
    component: Home,
    redirect: '/admin'
  }
];





export default new Router({
  routes: constantRouteMap
})
