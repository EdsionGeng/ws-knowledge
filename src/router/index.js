import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home'
import hisupload from '@/views/historyupload/index' //历史上传
import allfiles from '@/views/allfiles/index' //全部文件
import docdirmanagement from '@/views/docdirmanagement/index' //文档目录管理
import docmanagement from '@/views/docmanagement/index' //文档管理
import keySearchPage from '@/views/keySearchPage/index' //关键词搜索结果页面
import messagemanage from '@/views/messagemanage/index' //文件管理
import mymessage from '@/views/mymessage/index' //个人中心
import newfile from '@/views/allfiles/add' //上传文件
import check from '@/views/allfiles/check' //全部文件/查看文件
import log from '@/views/allfiles/logs' //全部文件/查看文件/文件日志
import change from '@/views/allfiles/change' //全部文件/修改文件
import Login from '@/views/login/index' //登录页面
import homeIndex from '@/views/home/index' //管理员主页或者个人首页
Vue.use(Router);
const constantRouteMap = [{
    path: '/Login',
    component: Login
  },
  {
    path: '/',
    component: Home,
    redirect: '/home',
    children: [{
      path: '/home',
      component: homeIndex,
      meta: {
        pname: '首页'
      }
    }, {
      path: 'hisupload',
      component: hisupload,
      meta: {
        pname: '文件管理',
        cname: '历史上传'
      }
    }, {
      path: 'mymessage',
      component: mymessage,
      meta: {
        pname: '个人中心',
        cname: '我的消息'
      }
    }, {
      path: 'docmanagement',
      component: docmanagement,
      meta: {
        pname: '管理中心',
        cname: '文档管理'
      }
    }, {
      path: 'docdirmanagement',
      component: docdirmanagement,
      meta: {
        pname: '管理中心',
        cname: '文档目录管理'
      }
    }, {
      path: 'keySearchPage/:key',
      component: keySearchPage,
      meta: {
        pname: '搜索文件'
      }
    }, {
      path: 'allfiles',
      component: allfiles,
      meta: {
        pname: '文件管理',
        cname: '全部文件'
      }
    }, {
      path: 'newfile',
      component: newfile,
      meta: {
        pname: '新建文件'

      }
    }, {
      path: 'allfiles/check/:id',
      component: check,
      meta: {
        pname: '文件管理',
        cname: '全部文件',
        tname: '查看文件'
      }
    }, {
      path: 'allfiles/log/:id',
      component: log,
      meta: {
        pname: '文件管理',
        cname: '全部文件',
        tname: '查看文件',
        lname: '查看日志'
      }
    }, {
      path: 'allfiles/change/:id',
      component: change,
      meta: {
        pname: '文件管理',
        cname: '全部文件',
        tname: '修改文件'
      }
    }, {
      path: 'messagemanage',
      component: messagemanage,
      meta: {
        pname: '管理中心',
        cname: '消息管理'
      }
    }]
  }, {
    path: '*',
    component: Home,
    redirect: '/home'
  }
];
export default new Router({

  routes: constantRouteMap
})
