<template>
  <div class="header">
    <div class="header-logo">
        <h1>温商贷知识库</h1>
    </div>
    <div class="header-right">
        <Dropdown @on-click="onChange">
            <a href="javascript:void(0)">
                {{userInfo}}
                <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list" >
                <Dropdown-item name="修改密码">
                   <p>修改密码</p>
                </Dropdown-item>
                <Dropdown-item name="退出登录"> 
                     <p>退出登陆</p>
                </Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
    <Modal v-model="isShow">
        <p slot="header">
            <span>修改密码</span>
        </p>
        <Form ref="updatepwd" :model="updatepwd" :rules="updatepwdrules" label-postion="left" :label-width="80">
            <FormItem label="原密码" prop="oldpwd">
                <Input :model="updatepwd.oldpwd" placeholder="请输入原密码" :autofocus="true"></Input>
            </FormItem>
            <FormItem label="新密码" prop="newpwd">
                <Input :model="updatepwd.newpwd" placeholder="请输入新密码"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('updatepwd')">确认</Button>
                <!-- 加一个表单重置 -->
            </FormItem>
        </Form>
        <div slot="footer">
            <p>请牢记自己的新密码哦！</p>
        </div>
    </Modal>
</div>
</template>
<script>
import {logout} from '../../api/login'
export default {
    data(){
        return{
            userInfo:this.getUserName(),
            isShow:false,
            updatepwd:{
                oldpwd:'',
                newpwd:''
            },
            updatepwdrules:{
                oldpwd:[
                    { required:true,message:'请填写原密码',trigger:'blur' },
                    { type:'string',min:6,message:'密码长度不能小于6位',trigger:'blur'}
                ],
                newpwd:[
                    { required:true,message:'请填写新密码',trigger:'blur' },
                    { type:'string',min:6,message:'密码长度不能小于6位',trigger:'blur'}
                ]
            }
        }
    },
    methods:{
        getUserName(){
            return sessionStorage.getItem('UserName');
        },
        onChange(name){
            if(name==="修改密码"){
                this.isShow=true;
            }else if(name==="安全退出"){

            }   
        },
        handleSubmit(name){
            this.$refs[name].validate((valid)=>{
                if(valid){
                    // 与服务端交互，确认密码是否修改成功
                    this.$Modal.remove();
                }else{

                }
            })
        },
        loginOut(){
            // 安全退出，清空所有的sessionStorge并将路由调转到'/login'
            
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
