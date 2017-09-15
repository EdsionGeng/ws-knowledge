<template>
<div class='btn clearfix'>

    <Button type="info" class='fr'>按下载热度排列</Button>
    <Button type="success" class='fr'>按上传时间排列</Button>
    
</div>
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
.btn{
    padding: 20px;
}
.btn Button{
    margin-right: 40px;
}
.fr{
    float: right;
}
.clearfix:after {
	content: "";
	display: block;
	visibility: hidden;
	height: 0;
	clear: both;
}
.clearfix {
	zoom: 1;
}
</style>


