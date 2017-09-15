<template>
    <div class="layout">
        <v-header></v-header>
        <!-- 主内容区域宽为1200px -->
        <div class="layout-main">
            <div class="layout-left">
                <div class="layout-left-top">
                    <div class="layout-left-top-search">
                        <Input v-model="value4" icon="ios-search" placeholder="请输入..."></Input>    
                    </div>
                    <div class="layout-left-top-upload">
                        <Button type="primary" icon="ios-cloud-upload-outline" long>上传文件</Button>
                    </div>
                </div>
                <v-sider></v-sider>
            </div>
            <div class="layout-right">
                <!-- 页面主体内容 router-view -->
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from './Header';
import vSider from './SideBar'
export default {
    components:{
        vHeader,vSider
    },
    data(){
        return{
            value4:''
        }
    }
  
}
</script>
<style scoped>
.layout{
    clear: both;
    width: 100%;
    height: 100%;
    display: flex;
}
.layout-left{
    position: absolute;
    float: left;
    width: 240px;
    margin-left: 300px;
}
.layout-left-top{
    width: 240px;
    height: 105px;
}
.layout-left-top .layout-left-top-search{
    margin-top: 20px;
}
.layout-left-top .layout-left-top-upload{
    margin-top: 20px;
}

.layout-right{
    float: left;
    width: 1000px;
    height: 850px;
    /* background: #ffffff; */
    margin-top: 20px;
    margin-left: 550px;
}
</style>
