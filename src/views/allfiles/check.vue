<template>
  <div class="checkpage">
    <Row>
      <Col span='20' style='border-right:1px solid #ccc;padding:20px;'>
      <Row type='flex' align='middle' justify='space-between'>
        <Col class="lf">
        <Button type='ghost' @click="goRouter">&lt; 返回</Button>
        </Col>
        <Col>
        <h3 style='margin-left:-64px'>{{fileDetails.title}}</h3> </Col>
        <Col>
        </Col>
      </Row>
      <Row class='filecontent'>
        <div v-html='fileDetails.fileContent'> <!-- 文件的详情显示 -->

        </div>
      </Row>
      <Row>
        <icon-line myclass="iconfont icon-jinlingyingcaiwangtubiao17" msg='附件'></icon-line>
      </Row>
      <Row v-if='fujainList.length!==0' v-for='(item,index) in fujainList' :key='index' style='padding:3px 0;'>
        <i class="iconfont  icon-fujian" style='margin-right:8px;color:#009DD9;'></i>
        <span>  <a :href="'http://192.168.3.26:8011/'+item.url">{{item.title}} </a>
              <span style='color:#ccc'>（{{parseInt(item.fileSize/1024)+'k'}}）</span>
            </span>
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
      <Col span='4' class="right-col" style='padding-top:30px;color:#888'>
      <Row type='flex' align='top' justify='center'>
        <Col span="16">
        <img :src="'http://192.168.3.26:8011/'+fileDetails.photoUrl" style='width:100%;height:150px;border:8px solid #ccc'>
        </Col>
      </Row>
      <Row type='flex' justify='center'>
        <Col>
        文件上传者：{{fileDetails.username}}
        </Col>
      </Row>
      <Row type='flex' justify='center'>
        <Col>
        所属部门：{{fileDetails.departmentName}}
        </Col>
      </Row>
      <Row type='flex' justify='center'>
        <Col>
        上传时间：{{fileDetails.addFileTime}}
        </Col>
      </Row>
      <Row type='flex' justify='center'>
        <Col>
        文件类型：{{fileDetails.fileStyle}}
        </Col>
      </Row>
      <Row type='flex' justify='center'>
        <Button style='margin-right:10%;' v-if='canChange' type="primary" @click="changeRouter('/allfiles/change/')">
          修改文件
        </Button>
        <Button v-if='canDel' type="primary" @click='delFile'>删除文件</Button>
      </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
  import iconLine from "@/components/common/iconline";
  import {getFileDetail} from "@/api/all_interface";
  import {readFile} from "@/api/all_interface";
  import {showfilelog} from "@/api/all_interface";
  import {deletesinglefile} from "@/api/all_interface";
  import {showFilePermission} from "@/api/all_interface";
  export default {
    data() {
      return {
        readFileparams: {
          fileId: this.$route.params.id,
          userId: sessionStorage.getItem("userId")
        },
        filelogParams: {
          fileId: this.$route.params.id,
          current: 1,
          pageSize: 3
        },
        fileDetailParams: {
          fileId: this.$route.params.id
        },
        delfileParams: {
          fileId: this.$route.params.id,
          userId: sessionStorage.getItem("userId")
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
            sortType: "desc"
          },
          {
            title: "操作类型",
            key: "operation"
          }
        ],
        historyUploadMessageList: [],
        fujainList: [],
        fujainDetail: null,
        canChange: false,
        canDel: false,
        fileDetailUrl: "",
        fileDetailSize: "",
        fileDetaildescible: "",
        fileDetails: {
          photoUrl: "",
          title: "",
          username: "",
          departmentName: "",
          addFileTime: "",
          fileStyle: "",
          fileContent: ""
        }
      };
    },
    components: {
      iconLine
    },
    mounted() {
      this.initreadFile();
      this.initFileLog();
      this.initFileDetail();
      this.showFilePower();
      console.log(this.$route.params.id);
    },
    methods: {
      showFilePower() {
        showFilePermission(this.readFileparams)
          .then(res => {
            console.log("用户id对文件的权限");
            if (res.data.code == 0) {
              const data = res.data.data;
              console.log(res)
              if (data.updateFile === 0) {
                this.canChange = false;
              } else if (data.updateFile === 1) {
                this.canChange = true;
              }
              if (data.deleteFile === 0) {
                this.canDel = false;
              } else if (data.deleteFile === 1) {
                this.canDel = true;
              }
            }
          })
          .catch(err => {
          });
      },
      initFileDetail() {
        getFileDetail(this.fileDetailParams)
          .then(res => {
            console.log("文件的详情");
            console.log(res.data.code == 0);
            if (res.data.code == 0) {
              this.fileDetails = res.data.data;
              console.log(this.fileDetails)
              if(this.fileDetails.fileUrl!==''){
                    this.fileDetailUrl = this.fileDetails.fileUrl.split(",");
                    this.fileDetailSize = this.fileDetails.fileSize.split(",");
                    this.fileDetaildescible = this.fileDetails.enclosureInfo.split(",");
                    this.fujainList = [];
                    console.log(this.fileDetailUrl)
                    for (let i = 0; i < this.fileDetailUrl.length; i++) {
                        let fujainDetail = {};
                        fujainDetail.fileSize = this.fileDetailSize[i];
                        fujainDetail.title = this.fileDetailUrl[i].slice(15);
                        fujainDetail.url = this.fileDetailUrl[i];
                        fujainDetail.description = this.fileDetaildescible[i];
                        this.fujainList.push(fujainDetail);
                        console.log(this.fujainList);
                  }
              }             
            }
          })
          .catch(err => {
          });
      },
      initFileLog() {
        showfilelog(this.filelogParams)
          .then(res => {
            console.log(res);
            const showUserUpdata = res.data;
            console.log("查看个人日志记录");
            console.log(showUserUpdata);
            if (res.data.code == 0) {
              this.page = res.data.rdPage;
              this.historyUploadMessageList = showUserUpdata.data;
            }
          })
          .catch(err => {
          });
      },
      initreadFile() {
        readFile(this.readFileparams).then(res => {
          console.log("文件的阅读");
          console.log(res);
        });
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
            deletesinglefile(this.delfileParams)
              .then(res => {
                console.log(res.data);
                if (res.data.code === 0) {
                  this.$Message.warning("您删除了该文件");
                  this.$router.push('/')
                } else {
                  this.$Message.error("操作发生错误");
                }
              })
              .catch(err => {
              });
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
    min-height: 160px;
    padding: 30px 0px;
  }
</style>
