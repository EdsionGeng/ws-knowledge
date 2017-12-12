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
                  <Page :total="page.total" :page-size-opts='pageOpts' show-sizer show-elevator :current="page.current" :page-size="page.pageSize" :show-total="true" @on-change="onPageChange" @on-page-size-change='onPageSizeChange' class="table-page"></Page>
                </Col>  
      </Row>
  </div>  
</template>
<script>
import {showfilelog} from '@/api/all_interface';
import SelectTree from '@/components/common/selectTree'
import docTree from '@/components/common/docTree'

export default {
  data() {
    return {
      operatype:[
        {
        value:'上传文档',
        label:'上传文档'
      },{
        value:'修改文档',
        label:'修改文档'
      },{
        value:'查阅文档',
        label:'查阅文档'
      }],
      operationModel:'',
      filelogParams:{
        fileId:this.$route.params.id,
        page:1,
        limit:5
      },
      //用对象就可以让子组件修改父组件的内容
     
      depTypeKey:{
        value:''
      },
      pageOpts: [20, 40, 60, 100],
      listparams: {
        userId:145,
        current: 1,
        pageSize: 20
      },
      page: { total: 10, pages: 1, current: 1, pageSize: 20 },
      columns1: [
        {
          title: "标题",
          key: "title"
        },
        
        {
          title: "发布时间",
          key: "addFileTime",
          sortable: true,
          align:'center'
          
        },
        {
          title: "上传人",
          key: "username",
          align: "right"
        }
      ],
        fileLogList: [
        {
          title: "hello",
          addFileTime: "2017-01-01"
        },
        {
          title: "hello",
          addFileTime: "2017-01-01"
        },
        {
          title: "hello",
          addFileTime: "2017-01-01"
        },
        {
          title: "hello world",
          addFileTime: "2017-01-02"
        },
        {
          title: "hello world",
          addFileTime: "2017-01-05"
        }
      ]
    };
  },
  components:{
    SelectTree,docTree
  },
  created() {
     this.initFileLog();
  },
  methods: {
    gobackRouter() {
      this.$router.back();
    },
    selAllFile(){
      console.log(this.depTypeKey.value)
      console.log(this.operationModel)
    },
    onPageChange(value) {
      console.log(value);
      this.page.current = value;
      this.initFileLog();
    },
    onPageSizeChange(value) {
      this.page.pageSize = value;
    }, 
    initFileLog(){
        showfilelog(this.filelogParams)
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
  }
};
</script>
<style scoped>
.page {
  padding: 30px 10px;
}

</style>
