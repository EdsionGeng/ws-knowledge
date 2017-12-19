<template>
  <div class="checkpage">
    <Row >
      <Col span='18' style='border-right:1px solid #ccc;padding:20px;'>
       <Row  type='flex' align='middle' justify='space-between'>
          <Col  class="lf"><Button type='ghost' @click="goRouter">&lt; 返回</Button></Col>
          <Col ><h3 style='margin-left:-64px'>{{fileDetails.title}}</h3> </Col>
          <Col > </Col>
        </Row>
         <Row class='filecontent'>
           <div v-html='fileDetails.fileContent' ></div>
        </Row>
        <Row>
          <icon-line myclass="iconfont icon-jinlingyingcaiwangtubiao17" msg='附件'></icon-line>
        </Row>
        <Row v-for='(item,index) in fujainList' :key='index'>
           <i class="iconfont  icon-fujian" style='margin-right:8px;color:#009DD9;'></i><span>{{item.title}} <span style='color:#ccc'>（{{item.fileSize}}）</span>  </span>
           <span style='padding-left:15px;color:#ccc'>描述：{{item.description}}</span>
        </Row>
        <Row style='padding-top:30px;padding-bottom:25px;'>
          <icon-line myclass="iconfont icon-caozuorizhi" msg='操作日志'></icon-line>
          <a class='rt' style='margin-top:-25px' @click="changeRouter('/allfiles/log/')">查看更多&gt;&gt;</a>
        </Row>
        <Row>
             <Table border :columns="columns5" :data="historyUploadMessageList"></Table>
        </Row>
      </Col>
      <Col span='6' class="right-col" style='padding-top:30px'>
          <Row  type='flex' align='top' justify='center'>
            <Col span="16">
              <img :src="'./'+fileDetails.photoUrl" style='width:100%;height:150px;border:8px solid #ccc'>
            </Col>
          </Row>
          <Row type='flex' justify='center'>
            <Col >
              文件上传者：{{fileDetails.username}}
            </Col>
          </Row>
           <Row type='flex' justify='center'>
            <Col>
              所属部门：{{fileDetails.departmentName}}
            </Col>
          </Row>
           <Row type='flex' justify='center'>
             <Col >
              上传时间：{{fileDetails.addFileTime}}
            </Col>
          </Row>
          <Row type='flex' justify='center'>
             <Col >
              文件类型：{{fileDetails.fileStyle}}
            </Col>
          </Row>
          <Row type='flex' justify='center' >
            <Button style='margin-right:10%;' v-if='canChange' type="primary" @click="changeRouter('/allfiles/change/')">修改文件</Button>
            <Button v-if='canDel' type="primary" @click='delFile'>删除文件</Button>
          </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
import iconLine from "@/components/common/iconline";
import {getFileDetail} from '@/api/all_interface'
import {readFile} from '@/api/all_interface'
import {showfilelog} from '@/api/all_interface'
import {deleteFile} from '@/api/all_interface'
import {showFilePermission} from '@/api/all_interface'

export default {
  data() {
    return {
      readFileparams:{
          fileId:this.$route.params.id,
          userId:145
      },
      filelogParams:{
        fileId:this.$route.params.id,
        current:1,
        pageSize:3
      },
      fileDetailParams:{
        fileId:this.$route.params.id
      },
      delfileParams:{
        fileId:this.$route.params.id,
        userId:145
      },
      columns5: [
        {
          title: "操作部门",
          key: "departmentName"
        },
        {
          title: "姓名",
          key: "username"
        },
        {
          title: "时间",
          key: "operationTime",
          sortType:'desc'
        },
        {
          title: "操作类型",
          key: "operation"
        }
      ],
      historyUploadMessageList:[],
      fujainList: [
        {
          fileSize: "100k",
          title: "我的文档",
          description: "sdfjsdfj osdafi sdf sdaf asdf sad"
        },
        {
          fileSize: "100k",
          title: "我的文档",
          description: "sdfjsdfj osdafi sdf sdaf asdf sad"
        },
        {
          fileSize: "100k",
          title: "我的文档",
          description: "sdfjsdfj osdafi sdf sdaf asdf sad"
        }
      ],
      canChange: false,
      canDel: false,
      fileDetails: {
        photoUrl:'',
        title:'my title',
        username: "张三",
        departmentName: "行政中心-行政部-行政组",
        addFileTime: "2017-8-23",
        fileStyle: "规章制度",
        fileContent:
          "<p>23891458接洽奈 进你好地是地地轩地灶果园校地村瓢泼大雨在柑顶替叶是村要查892343207234570345382502355555</p>"
      }
    };
  },
  components: {
    iconLine
  },
  mounted(){
    this.initreadFile();
    this.initFileLog();
    this.initFileDetail();
    this.showFilePower();
    console.log(this.$route.params.id)
  },
  methods: {
    showFilePower(){
        showFilePermission(this.readFileparams)
          .then(res => {
            console.log('用户id对文件的权限')
            console.log(res)

            if (res.data.code == 0) {
              const data=res.data.data;
              if(data.updateFile===0){
                this.canChange=false;
              }else if(data.updateFile===1){
                 this.canChange=true;
              } 
              if(data.deleteFile===0){
                this.canDel=false;
              } else if(data.deleteFile===1){
                 this.canDel=true;
              }     
          }
        }).catch(err => {});
    },
    initFileDetail(){     
      getFileDetail(this.fileDetailParams)
        .then(res => {
          console.log('文件的详情');
          console.log(res)

          if (res.data.code == 0) {
            this.fileDetails=res.data.data
          }
        }).catch(err => {});
    },
    initFileLog(){
        showfilelog(this.filelogParams)
        .then(res => {
          console.log(res)
          const showUserUpdata = res.data;
          console.log('查看个人日志记录')
          console.log(showUserUpdata);
          if (res.data.code == 0) {
            this.page = res.data.rdPage;
            this.historyUploadMessageList = showUserUpdata.data;
          }
        }).catch(err => {});
    },
    initreadFile(){
      readFile(this.readFileparams)
        .then(res => {
          console.log('文件的阅读');
          console.log(res)
        })
    },
    goRouter() {
      this.$router.back();
    },
    changeRouter(name) {
      console.log(this.$route.params.id);
      console.log(name);
      this.$router.push(name + this.$route.params.id);
    },
    delFile() {
      this.$Modal.confirm({
        content: "<h3>确定要删除么！！！</h3>",
        onOk: () => {

              deleteFile(this.delfileParams)
                .then(res => {
                  console.log(res.data)
                 if(res.data.code===0){
                  this.$Message.warning("您删除了该文件");
                 }else{
                  this.$Message.error("操作发生错误");
                 }
                }).catch(err => {});
                },

        onCancel: () => {
          this.$Message.success("您取消了该操作");
        }
      });
    }
  }
};
</script>
<style scoped>
.checkpage {
  padding-left: 30px;
  font-size: 14px;
  color: #333;
}
.right-col .ivu-row-flex-center {
  line-height: 40px;
}
.filecontent {
  min-height: 400px;
  padding-top: 20px;
}
</style>
