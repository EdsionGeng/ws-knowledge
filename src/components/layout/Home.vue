<template>
    <div>
        <vHeader></vHeader>
        <!-- 主内容区域宽为1200px -->
        <div class="layout-main">
            
            <div class="layout-right">
                <!-- 页面主体内容 router-view -->
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from './Header';
export default {
    components:{
        vHeader
    }
  
}
</script>
<style scoped>

</style>
