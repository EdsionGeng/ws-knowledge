<template>
    <div class="pagetitle">
    <Breadcrumb>
        <Breadcrumb-item v-for='title in BreadTitle' :key='title'>{{title}}</Breadcrumb-item>
    </Breadcrumb>
    </div>
</template>
<script>
export default {
    props:['BreadTitle']
}
</script>
<style>
.ivu-breadcrumb-item-separator{
     color:#009688
}
</style>

<style scoped>
.pagetitle{
    clear: both;
    border-bottom:1px solid #009688;
}
.ivu-breadcrumb{
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    color:#009688;
    padding-left:20px;
}
.ivu-breadcrumb>span:last-child{
    font-weight: normal;
    color:#009688
}

</style>
