<template>
  <div class="header">
    <div class="header-logo">
        <h1>温商贷知识库</h1>
    </div>
    <div class="header-right">
        <Dropdown>
            <a href="javascript:void(0)">
                {{userInfo}}
                <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list" >
                <Dropdown-item>
                   <p @click="modal1 = true">修改密码</p>
                    <Modal
                        v-model="modal1"
                        title="修改密码"
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                            <FormItem prop="user">
                                <Input type="text" v-model="formInline.user" placeholder="Username">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" v-model="formInline.password" placeholder="Password">
                                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                            </FormItem>
                        </Form>
                    </Modal>
                </Dropdown-item>
                <Dropdown-item name="Logout">
                     <p @click="modal2 = true">退出登陆</p>
                    <Modal v-model="modal2" width="360">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>退出确认</span>
                        </p>
                        <div style="text-align:center">
                           
                            <p>是否继续退出登陆？</p>
                        </div>
                        <div slot="footer">
                            <Button type="error" size="large" long :loading="modal_loading" @click="del">退出</Button>
                        </div>
                    </Modal>
                </Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</div>
</template>
<script>
import {logout} from '../../api/login'
export default {
    data(){
        return{
            value: '',
            value2: '',
            modal1: false,
            modal2: false,
            modal_loading: false,
            userInfo:this.getUserName(),
             formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
        }
    },
    methods:{
         ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            },
        getUserName(){
            return sessionStorage.getItem('UserName');
        },
        del () {
           logout().then(res=>{
                    if(res.data.code != 0){
                         this.modal_loading = true;
                        setTimeout(() => {
                            this.modal_loading = false;
                            this.modal2 = false;
                            this.$Message.success('退出成功');
                            this.$router.push('/Login');
                        }, 2000);
                    }else{
                         this.modal_loading = false;
                         this.modal2 = false;
                         this.$Message.success('退出失败');
                    }
                   
                    

             
                })
               
        },
        handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
        }
    }

}
</script>
<style scoped>
.header{
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    border: 1px solid #d7dde4;
    background: #fff;
    z-index: 1000;
}
.header-logo{
    width: 240px;
    height: 66px;
    float: left;
    text-align: center;
    line-height: 66px;
}
.header-right{
    display: block;
    float: right;
    line-height: 66px;
    margin-right: 40px;
    font-size: 16px;
}
</style>
