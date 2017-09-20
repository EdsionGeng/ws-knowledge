<template>
    <div class="login-layout">
        <Form ref="loginForm" :model="loginForm" :rules="loginRules"  class="login-form" inline>
            <h1 class="login-title">温商贷知识库</h1>
            <Form-item prop="UserName">
                <Input type="text" name="UserName" v-model="loginForm.UserName"  placeholder="请输入用户名" size="large">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="password">
                <Input type="password" name="password" v-model="loginForm.password" placeholder="请输入密码" size="large">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item>
                <Button type="primary" size="large" :loading="isLoading" @click="handleSubmit('loginForm')">
                    <span v-if="!isLoading">登录</span>
                    <span v-else>Loading...</span>
                    </Button>
            </Form-item>
        </Form>  
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import {Login} from '../../api/login'
export default {
  data(){
      return{
          loginForm:{
              UserName:'',
              password:'',
          },
          isLoading:false,
          loginRules:{
              UserName:[
                  {required:true,message:'请填写用户名',trigger:'blur'}
                  ],
              password:[
                  {required:true,message:'请填写密码',trigger:'blur'},
                  {type:'string',min:6,message:'密码长度不能少于6位',trigger:'blur'}
              ]
          }
      }
  },
 
  methods:{
      ...mapActions([
        'Login',
        'SetAdmin'
      ]),
      handleSubmit(name){
          this.$refs[name].validate((valid)=>{
              if(valid){
                  this.isLoading=true;
                  let params={
                      "UserName":this.loginForm.UserName,
                      "password":this.loginForm.password
                  };
                  Login(params).then(res=>{
                      const UserName = this.loginForm.UserName;
                      if(res.data.code===0){
                        sessionStorage.setItem('UserName',UserName);
                        sessionStorage.setItem('loginToken',res.data.model.loginToken);
                        sessionStorage.setItem('isAdmin',res.data.model.isAdmin);
                        this.$store.dispatch('Login',this.loginForm.UserName);
                        this.$store.dispatch('SetAdmin',res.data.model.isAdmin);
                        this.$Message.success(res.data.message);
                        this.$router.push('/');
                      }else{
                        this.$Message.error(res.data.message);
                        this.isLoading=false;
                      }
                  }).catch(err=>{
                      this.$Message.error("登录失败！");
                      this.isLoading=false;
                  })
              }else{
                  this.$Message.error('表单验证失败！');
              }
          })
      }
  }
}
</script>
<style scoped>
.login-layout{
    width: 100%;
    height: 100%;
    background-color: #495060;
}
.login-form{
    position: absolute;
    width: 525px;
    height: 120px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
}
.login-title{
    color: #fff;
    font-size: 36px;
    margin-bottom: 20px;
}
</style>
