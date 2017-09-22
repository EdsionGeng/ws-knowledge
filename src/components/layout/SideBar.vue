<template>
    <div class="layout-left-bottom">
        <!-- 搜索上传以及侧边栏导航 -->
         <Menu :theme="theme3" active-name="1" @on-select="change"> 
        <MenuGroup title="主页">
            <MenuItem name="超管首页" v-if="isAdmin()">
                <!-- <Icon type="document-text"></Icon> -->
                超管首页
            </MenuItem>
            <MenuItem name="个人首页" v-if="!isAdmin()">
                <!-- <Icon type="chatbubbles"></Icon> -->
                个人首页
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="文件管理">
            <MenuItem name="全部文件">
                <!-- <Icon type="heart"></Icon> -->
                全部文件
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="管理中心" v-if="isAdmin()">
            <MenuItem name="我的消息">
                <!-- <Icon type="heart"></Icon> -->
                我的消息
            </MenuItem>
            <MenuItem name="文档管理">
                <!-- <Icon type="heart"></Icon> -->
                文档管理
            </MenuItem>
            <MenuItem name="文档类型管理">
                <!-- <Icon type="heart-broken"></Icon> -->
                文档类型管理
            </MenuItem>
            <MenuItem name="消息推送">
                <!-- <Icon type="heart"></Icon> -->
                消息推送
            </MenuItem>
            <MenuItem name="历史下载">
                <!-- <Icon type="heart-broken"></Icon> -->
                历史下载
            </MenuItem>
            <MenuItem name="历史上传">
                <!-- <Icon type="heart-broken"></Icon> -->
                历史上传
            </MenuItem>
        </MenuGroup>
        <MenuGroup title="个人中心" v-if="!isAdmin()">
            <MenuItem name="我的消息">
                <!-- <Icon type="heart"></Icon> -->
                我的消息
            </MenuItem>
            <MenuItem name="历史下载">
                <!-- <Icon type="heart-broken"></Icon> -->
                历史下载
            </MenuItem>
            <MenuItem name="历史上传">
                <!-- <Icon type="heart"></Icon> -->
                历史上传
            </MenuItem>
        </MenuGroup>
    </Menu>
    </div>
</template>
<script>
export default {
    data () {
        return {
            theme3: 'light',
            isAdmin:function(){
                if(sessionStorage.getItem('isAdmin')==1){
                    return true;
                }else{
                    return false;
                }
            }
        }
    },
    methods:{
        change(name){
            this.$router.push({name:name});
        }
    }

}
</script>
<style scoped>
.layout-left-bottom{
   flex: 1;
}
</style>

