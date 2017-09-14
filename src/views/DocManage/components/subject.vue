<template>
   <Card >
        <p slot="title" >
            <Icon type="ios-film-outline"></Icon>
            经典电影
        </p>
        <a href="#" slot="extra" @click.prevent="changeLimit" class='fr'>
            <Icon type="ios-loop-strong"></Icon>
            换一换
        </a>
       
  </Card>
</template>
<script>
   
</script>
<style scoped>
Card{
    border: none;
}
.fr{
    float: right;
}
.fl{
    float: left;
}
</style>

