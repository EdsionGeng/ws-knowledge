<template>
<div class="home">
    <!-- <vHeader></vHeader> -->
    <vSideBar></vSideBar>
    <div class="content">
        <router-view></router-view>
    </div>
</div>
</template>
<script>
import vHeader from './Header'
import vSideBar from './SideBar'
export default {
    name:'home',
    data(){
        return{
        }
    },
    components:{
        vHeader,vSideBar
    }
    
}
</script>
<style scoped>

</style>
