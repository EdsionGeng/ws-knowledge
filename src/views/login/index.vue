<template>
  <div class="login-layout">
    <Form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" inline>
      <h1 class="login-title">系统登录</h1>
      <Form-item prop="username">
        <Input type="text" name="username" v-model="loginForm.username" placeholder="Username" size="large">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </Form-item>
      <Form-item prop="password">
        <Input type="password" name="password" v-model="loginForm.password" placeholder="Password" size="large">
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
import { login } from "../../api/login";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "12345"
      },
      isLoading: false,
      loginRules: {
        username: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blue" },
          { type: "string", min: 5, message: "密码长度不能少于5位", trigger: "blue" }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.isLoading = true;
          // 密码验证成功之后，路由重定向
          login(this.loginForm)
            .then(res => {
              const data = res.data;
              if (data.code == 0) {
                let username = data.data.username;
                let id = data.data.id;
                 let isAdmin=false;
                 // 判断是否是管理员
                  if(res.data.count===0) {
                     isAdmin=false;
                  }else {
                     isAdmin=true;
                  };
                let userGroupId = data.data.UserGroupId;
                let companyId=data.data.companyId;
                console.log("获取公司Id");
                console.log(companyId);
                this.isLoading = false;
                this.$Message.success(data.msg);
                sessionStorage.setItem("isLogin", true);
                sessionStorage.setItem("isAdmin", isAdmin);
                sessionStorage.setItem("userGroupId", userGroupId);
                sessionStorage.setItem("companyId",companyId);
                sessionStorage.setItem("username", username);
                sessionStorage.setItem("userId", id);
                this.$router.push("/");
              } else {
                this.$Message.error("用户名密码错误，请重新输入");
                this.isLoading = false;
              }
            })
            .catch(err => {
              this.$Message.error("系统异常，请重试！");
              this.isLoading = false;
            });
        } else {
          this.$Message.error("表单验证失败！");
        }
      });
    }
  }
};
</script>
<style scoped>
.login-layout {
  width: 100%;
  height: 100%;
  background-color: #495060;
}
.login-form {
  position: absolute;
  width: 525px;
  height: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-title {
  color: #fff;
  font-size: 36px;
  margin-bottom: 20px;
}
</style>
