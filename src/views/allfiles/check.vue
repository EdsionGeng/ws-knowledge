<template>
  <div class="checkpage">
    <Row >
      <Col span='18' style='border-right:1px solid #ccc;padding-top:20px'>
       <Row  type='flex' align='middle' justify='space-between'>
          <Col  class="lf"><Button type='ghost' @click="goRouter">&lt; 返回</Button></Col> 
          <Col ><h3>这是一个标题</h3> </Col>
          <Col > </Col>
        </Row>
         <Row style="padding-top:10px">
           {{fileDetails.msg+'3222222'+fileDetails.msg+fileDetails.msg+fileDetails.msg+fileDetails.msg+fileDetails.msg+fileDetails.msg}}
        </Row>
        <Row style="padding-top:10px">
           {{fileDetails.msg+'3222222'+fileDetails.msg+fileDetails.msg+fileDetails.msg+fileDetails.msg+fileDetails.msg+fileDetails.msg}}
        </Row>
      </Col>
      <Col span='6' class="right-col" style='padding-top:30px'>
          <Row  type='flex' align='top' justify='center'>
            <Col span="16"> 
              <img src="./bg.jpg" style='width:100%;height:150px;'>
            </Col>  
          </Row>
          <Row type='flex' justify='center'>
            <Col > 
              文件上传者：{{fileDetails.addUser}}
            </Col>
          </Row> 
           <Row type='flex' justify='center'>
            <Col> 
              所属部门：{{fileDetails.dep}}
            </Col>
          </Row> 
           <Row type='flex' justify='center'>           
             <Col > 
              上传时间：{{fileDetails.addfiletime}}
            </Col>
          </Row>
          <Row type='flex' justify='center'>           
             <Col > 
              文件类型：{{fileDetails.fileType}}
            </Col>
          </Row>
          <Row type='flex' justify='space-around' >
            <Button v-if='canChange' type="primary" @click="changeRouter('/allfiles/change/')">修改文件</Button>  
            <Button v-if='canDel' type="primary" @click='delFile'>删除文件</Button>  
          </Row> 
         
      </Col>
    </Row> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      canChange:false,
      canDel:true,
      fileDetails: {
        addUser: "张三",
        dep: "行政中心-行政部-行政组",
        addfiletime: "2017-8-23",
        fileType: "规章制度",
        msg:
          "23891458接洽奈 进你好地是地地轩地灶果园校地村瓢泼大雨在柑顶替叶是村要查892343207234570345382502355555"
      }
    };
  },
  methods: {
    goRouter() {
      this.$router.back();
    },
    changeRouter(name){
      console.log(this.$route.params.id);
      console.log(name);
      this.$router.push(name+4)
    },
    delFile(){
       this.$Modal.warning({
                content:'<h3>确定要删除么！！！</h3>'
        });
    }
  }
};
</script>
<style scoped>
.checkpage {
  padding-left: 60px;
  font-size: 14px;
}
.right-col .ivu-row-flex-center:not(:first-child) {
  height: 40px;
  line-height: 40px;
}
</style>
