// 通过封装axios和调用mock数据，统一管理api接口数据
import fetch from '../utils/fetch.js'

export function Login(data){
    return fetch({
        url:'/knowledge/loginSubmit',
        method:'post',
        data:data
    });
}
