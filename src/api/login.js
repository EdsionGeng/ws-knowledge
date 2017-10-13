// 通过封装axios和调用mock数据，统一管理api接口数据
import fetch from '../utils/fetch.js'
import Qs from 'qs'
/**
 * 登录请求
 * @param {*UserName,password} data 
 */
export function Login(data){
    return fetch({
        url:'/loginSubmit',
        method:'get',
        params:data
    });
}

export function getFilelistdata(){
    return fetch({
        url:"list",
        method:'get'
    })
}
export function getHistorydata(){
    return fetch({
        url:'/history',
        method:'get'
    })
}
export function getMynews(){
    return fetch({
        url:'mynews',
        method:'get'
    })
}

/**
 * 用户密码修改
 * @param {*id,oldPwd,newPwd} data 
 */
export function changePassword(data){
    return fetch({
        url:'/changePassword',
        method:'post',
        data:data
    })
}
/**
 * 公告推送的消息列表
 * 
 */
export function getNoticeList(data){
    return fetch({
        url:'/getNoticeList',
        method:'post',
        data:data
    })
}
/**
 * 公告推送的部门
 * 
 */
export function getDepartList(data){
    return fetch({
        url:'/getDepartList',
        method:'get',
        params:data
    })
}
/**
 * 文档管理列表
 * 
 */
export function getFileSysList(data){
    return fetch({
        url:'/getFileSysList',
        method:'get',
        params:data
    })
}




