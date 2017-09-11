
export default {
    login: (req)=>{
        if(req.userName =="admin" && req.password=="123456"){
            return {'code':'200','msg':'登录成功'};
        }else{
            return {'code':'301','msg':'用户名或密码不正确！'}
        }
    }
}