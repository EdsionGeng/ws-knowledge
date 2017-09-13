<template>
<div class='ModalAll'>
    
    <Button type="primary" @click="modal1 = true" style='margin-right: 20px;'>添加公告</Button>
  
    <Modal
        v-model="modal1"
        title="添加公告"
        @on-ok="ok"
        @on-cancel="cancel">
        <addnotice></addnotice>
        
    </Modal>
 <Button type="primary" @click="modal2 = true">批量删除</Button>

  <Modal
        v-model="modal2"
        title="批量删除"
        @on-ok="ok"
        @on-cancel="cancel">
       <p class='del'>确认是否删除选中文件</p>
        
    </Modal>
</div>    
</template>
<script>
import addnotice from "../components/addM"
    export default {
        data () {
            return {
                modal1: false,
                modal2: false

            }
        },
        methods: {
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        },
        components:{
            addnotice
        }
     
        }
    
</script>
<style scoped>
.ModalAll{
/* padding: 20px; */
padding: 0 0px 20px 20px;
}
Modal{
    width: 500px;
}
.del{
    text-align: center;
    font-size: 16px;
    color: #000;
}

</style>




