<template>
  <div>
      这是文档管理页面


    <div style="margin:40px">
      <Row class="table-top">
        <Col>
        <Table  border ref="selection" :columns="AllFileColumns" :data="AllFileList" stripe></Table>
        </Col>
      </Row>
      <!--<Page :total="page.total" :current="page.current" :page-size="page.pageSize" :show-total="true"-->
      <!--@on-change="onPageChange" class="table-page"></Page>-->
    </div>
  </div>
</template>
<script>
  import {showAllFile} from "../../api/all_interface";

export default {


  data() {
    return {
      AllFileColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "编号",
          key: "adTitle",

        },
        {
          title: "文件名称",
          key: "adContent",

        }, {
          title: "创建时间",
          key: "sendObject",

        },
        {
          title: "创建人",
          key: "addUser",
        },
        {
          title: "部门",
          key: "sendTime",
        },
        {
          title: "文档类型",
          key: "sendTime",
        },
      ],
      data: {
        current: 1,
        pageSize: 10
      },
      page: {},
      AllFileList: []
    };

  },
  created() {
    this.showAllFileList();
  },
  methods: {
    onPageChange() {
    },
    showAllFileList() {
      showAllFile(this.data)
        .then(res => {
          const data = res.data;
          console.log(res.data)
          if (data.code == 0) {
            console.log(data.data)
            this.AllFileList = data.data;
            this.page = data.rdPage;
          }
        })
          .catch(err => {
          });
      }
    }


}
</script>
<style scoped>

</style>
