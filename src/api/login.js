// 通过封装axios和调用mock数据，统一管理api接口数据
import fetch from '../utils/fetch.js'
/**
 * 登录请求
 * @param {*用户和密码} data 
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
        url:'history',
        method:'get'
    })
}
export function getMynews(){
    return fetch({
        url:'mynews',
        method:'get'
    })
}





