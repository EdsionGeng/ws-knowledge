// 导入api数据


const user = {
    state:{
        // 用户名
        UserName:'',
        // 是否登录
        // 用户id
        // 一般用户还是超级管理员用户
        // 菜单权限
        isAdmin:0
    },
    mutations:{
        SET_USERNAME:(state,username)=>{
            state.UserName = username;
        },
        SET_ISADMIN:(state,isadmin)=>{
            state.isAdmin=isadmin;
        }
    },
    actions:{
        // 调用mutations里面的方法改变state状态，可以执行异步操作
        Login({commit,state},username){
            commit('SET_USERNAME',username);
        },
        
        SetAdmin({commit,state},isadmin){
            commit('SET_ISADMIN',isadmin);
        }
    }
}

export default user;