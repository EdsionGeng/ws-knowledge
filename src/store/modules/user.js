// 导入api数据


const user = {
    state:{
        // 用户名
        userName:'',
        // 是否登录
        // 用户id
        // 一般用户还是超级管理员用户
        // 菜单权限
        authList:[],
    },
    mutations:{
        SET_USERNAME:(state,username)=>{
            state.userName = username;
        },
        SET_AUTHLIST:(state,authList)=>{
            state.authList = authList;
        }
    },
    actions:{
        // 调用mutations里面的方法改变state状态，可以执行异步操作
        Login({commit,state},data){
            commit('SET_USERNAME',data);
        }
    }
}

export default user;