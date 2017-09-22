import axios from 'axios'
import prod_env from '../../config/prod.env.js'
import Qs from 'qs'
// 封装axios 创建基础实例以及axios拦截
let url ='';
if(process.env.NODE_ENV===prod_env){
    url='http://192.168.3.26:8080/knowledge';
}else{
    url='http://192.168.3.26:5626/mock/59b8cbd086d1e55aa43b3785/ws/knowledge';
}

const service = axios.create({  
    baseURL:url,
    timeout:5000,

});

/**
 * request 拦截器
 */
service.interceptors.request.use(config=>{
    //通过判断store状态，添加一些请求headers数据
    config.headers['loginToken']=sessionStorage.getItem('loginToken') || null;  
     
    // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data=Qs.stringify(config.data);
    return config;
},error=>{
    console.log(error);
    Promise.reject(error);
})

/**
 * response 拦截器 
 */
service.interceptors.response.use(
    response => response,
    error=>{
        console.log('error:'+error);
        return Promise.reject(error);
    }
)

export default service;