// 导入api数据
import {login} from '../../api/login'

const user = {
    state:{
        // 用户名
        userName:'',
        // 是否登录
        isLogin:false,
        authList:[],
        cookieValue:''
    },
    mutations:{
        SET_USERNAME:(state,username)=>{
            state.userName = username;
        },
        SET_ISLOGIN:(state,isLogin)=>{
            state.isLogin = isLogin;
        },
        SET_AUTHLIST:(state,authList)=>{
            state.authList = authList;
        },
        SET_COOKIEVALUE:(state,cookieValue)=>{
            state.cookieValue = cookieValue;
        }

    },
    actions:{
        // 调用mutations里面的方法改变state状态，可以执行异步操作
        Login({commit,state},loginform){
            return new Promise((resolve,reject)=>{
                login(loginform).then(response=>{
                    commit('SET_ISLOGIN',true);
                    resolve();
                }).catch(error=>{
                    reject(error);
                })
            })
        },

        //获取用户信息
        GetUserInfo({commit,state}){
            commit('SET_USERNAME','lihaitao');
        }
    }
}

export default user;