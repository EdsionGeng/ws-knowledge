<template>
<div style='margin-top: 50px;'>
    <Progress :percent="25" class='fl'></Progress>
    <Progress :percent="45" status="active"></Progress>
    <Progress :percent="65" status="wrong"></Progress>
    <Progress :percent="100"></Progress>
    <Progress :percent="25" hide-info></Progress>
</div>
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
.fl{
  float: left;
}
</style>

