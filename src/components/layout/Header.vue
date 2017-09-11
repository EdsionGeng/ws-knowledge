<template>
  <div class="header">
    <div class="header-logo">
        <h1>温商贷知识库</h1>
    </div>
    <div class="header-right">
        <Dropdown>
            <a href="javascript:void(0)">
                管理员
                <Icon type="arrow-down-b"></Icon>
            </a>
            <Dropdown-menu slot="list" >
                <Dropdown-item>修改密码</Dropdown-item>
                <Dropdown-item name="Logout">退出登录</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
    </div>
</div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
.header{
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    border: 1px solid #d7dde4;
    background: #fff;
    z-index: 1000;
}
.header-logo{
    width: 240px;
    height: 66px;
    float: left;
    text-align: center;
    line-height: 66px;
}
.header-right{
    display: block;
    float: right;
    line-height: 66px;
    margin-right: 40px;
    font-size: 16px;
}
</style>
