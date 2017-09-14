<template>
    <div class="login-layout">
        <Form ref="loginForm" :model="loginForm" :rules="loginRules"  class="login-form" inline>
            <h1 class="login-title">温商贷知识库</h1>
            <Form-item prop="loginid">
                <Input type="text" name="loginid" v-model="loginForm.loginid"  placeholder="请输入用户名" size="large">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </Form-item>
            <Form-item prop="pwd">
                <Input type="password" name="pwd" v-model="loginForm.pwd" placeholder="请输入密码" size="large">
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
              loginid:'',
              pwd:'',
          },
          isLoading:false,
          loginRules:{
              loginid:[
                  {required:true,message:'请填写用户名',trigger:'blur'}
                  ],
              pwd:[
                  {required:true,message:'请填写密码',trigger:'blue'},
                  {type:'string',min:6,message:'密码长度不能少于6位',trigger:'blue'}
              ]
          }
      }
  },
  methods:{
      ...mapActions([
        'Login'
      ]),
      handleSubmit(name){
          this.$refs[name].validate((valid)=>{
              if(valid){
                  this.isLoading=true;
                  Login(this.loginForm).then(res=>{
                      console.log(res);
                      this.$store.dispatch('Login',this.loginForm.loginid);
                      const loginid = this.loginForm.loginid;
                      sessionStorage.setItem('userName',loginid);
                      this.$Message.success(res.data.message);
                      this.$router.push('/');
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
