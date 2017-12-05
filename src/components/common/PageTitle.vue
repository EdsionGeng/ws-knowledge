<template>
    <div class="pagetitle">
    <Breadcrumb>
        <Breadcrumb-item v-for='(title,index) in BreadData' :key='index'>{{title.name}}</Breadcrumb-item>
    </Breadcrumb>
    </div>
</template>
<script>
export default {
    props:['BreadData']
}
</script>
<style scoped>
.pagetitle{
    clear: both;
}
.ivu-breadcrumb{
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    padding-left:20px;
}


</style>
