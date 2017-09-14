// 通过封装axios和调用mock数据，统一管理api接口数据
import fetch from '../utils/fetch.js'
/**
 * 登录请求
 * @param {*用户和密码} data 
 */
export function Login(data){
    return fetch({
        url:'loginSubmit',
        method:'post',
        data:data
    });
}





