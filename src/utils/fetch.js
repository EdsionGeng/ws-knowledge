import axios from 'axios'

// 封装axios 创建基础实例以及axios拦截

const service = axios.create({
    timeout:5000,
    baseURL:'http://192.168.22.45:8011',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    // 'Accept': 'application/json'
  }
});

/**
 * request 拦截器
 */
service.interceptors.request.use(config=>{

    //通过判断store状态，添加一些请求headers数据
    config.data = JSON.stringify(config.data);
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
