<template>
    <div class="pagetitle">
        <Breadcrumb>
        <Breadcrumb-item>首页</Breadcrumb-item>
        <Breadcrumb-item>{{BreadTitle}}</Breadcrumb-item>
    </Breadcrumb>
    </div>
</template>
<script>
export default {
    props:['BreadTitle']
}
</script>
<style scoped>
.pagetitle{
    clear: both;
}
</style>
