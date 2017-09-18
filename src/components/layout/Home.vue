<template>
    <div class="layout">
        <v-header></v-header>
        <!-- 主内容区域宽为1200px -->
        <div class="layout-main">
            <div class="layout-left">
                <div class="layout-left-top">
                    <div class="layout-left-top-search">
                        <Input v-model="searchvalue" icon="ios-search" @on-enter="entersearch" placeholder="请输入..."></Input>    
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
            searchvalue:''
        }
    },
    methods:{
        entersearch(e){
            // 获取搜索框的值，通过路由参数的形式改变url,
            // 全部文件组件通过读取参数请求数据
            // 通过命名路由的name来判断跳转到哪一个路由，
            // 路由的name别名尽量与组件名称和路径名称命名相同
            this.$router.push({name:'afs',query:{searchvalue:this.searchvalue}});
        }
    }
  
}
</script>
<style scoped>
.layout{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
.layout-main{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    padding-top: 66px;
}
.layout-left{
    width: 240px;
    float: left;
}
.layout-left-top{
    width: 240px;
    height: 105px;
}
.layout-left-top .layout-left-top-search{
    margin-top: 10px;
}
.layout-left-top .layout-left-top-upload{
    margin-top: 20px;
}

.layout-right{
    width: 960px;
    height: 100%;
    float: right;
    padding: 10px;
}
</style>
