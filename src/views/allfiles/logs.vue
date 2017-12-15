<template>
<div class="page">
   <Row align='middle'   class='clearfix'  style='margin-bottom:20px'	>
        <Col span="1" offset=1  style='height:30px;line-height:30px'> 部门:</Col>
        <Col span="6">
            <SelectTree  :myvalue='depTypeKey'></SelectTree>
        </Col>
        <Col span="1"  style='height:30px;line-height:30px'> 类型:</Col>
        <Col span="6">
          <Select v-model="operationModel" style="width:200px">
            <Option v-for="item in operatype" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Col>
        <Col span="9">
        <Button type='primary' @click="selAllFile">查询</Button>
        <Button class='rt' type="ghost" @click="gobackRouter()">
            <Icon type="chevron-left"></Icon>
            返回
          </Button>
        </Col>
    </Row>
    <Row style='margin-top:20px'>
          <Col>
            <Table :columns="columns1" 	:data="fileLogList" ></Table>
          </Col>
    </Row>
  <Row style='padding-top:10px,padding-right:5px'>
    <Col>
    <Page :total="page.total"  show-sizer show-elevator :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" @on-page-size-change='onPageSizeChange' class="table-page"></Page>
    </Col>
  </Row>
  </div>
</template>
<script>
import {showfilelog} from '@/api/all_interface';
import SelectTree from '@/components/common/selectTree'
export default {
  data() {
    return {
      isSelFile:false,
      page:[],
      operatype:[
        {
        value:'1',
        label:'添加文档'
      },{
        value:'3',
        label:'更改文档'
      },{
        value:'4',
        label:'查阅文档'
      },{
          value:'2',
          label:'删除文档'
        }],
      operationModel:'',

      //用对象就可以让子组件修改父组件的内容

      depTypeKey:{
        value:''
      },
      columns1: [
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
        fileLogList: [
      ]
    };
  },
  components:{
    SelectTree
  },
  created() {
     this.initFileLog();
  },
  methods: {
    gobackRouter() {
      this.$router.back();
    },
    selAllFile(){
      console.log(this.depTypeKey.value);
      console.log(this.operationModel);
      // this.filelogParams={
      //   fileId:this.$route.params.id,
      //   page:1,
      //   limit:20,
      //   operationStyle:this.depTypeKey.value,
      //   departmentName:this.operationModel
      // };
      console.log(this.fileLogParams);
      this.initFileLog();
    },
    initFileLog(){
      const filelogParams={
        fileId:this.$route.params.id,
          current:1,
          pageSize:5,
          operationStyle:this.operationModel,
          departmentName:this.depTypeKey.value
      };
      showfilelog(filelogParams)
        .then(res => {
          console.log(res)
          const showfileLogList = res.data;
          console.log(showfileLogList);
          if (res.data.code == 0) {
            this.page = res.data.rdPage;
            this.fileLogList = showfileLogList.data;
          }
        }).catch(err => {});
    },
    onPageChange(value) {
      this.page.current = value;

      this.initFileLog();
    },
    onPageSizeChange(value) {
      console.log(value);
      this.page.pageSize = value;
    },
  }
};
</script>
<style scoped>
.page {
  padding: 30px 10px;
}
</style>
