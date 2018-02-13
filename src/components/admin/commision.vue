<template>
<div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-menu"></i> 所有入金记录</el-breadcrumb-item>
      </el-breadcrumb>
      <p style="margin-top: 20px;font-size: 16px;">总投资金额：</p>
    </div>
    <div class="handle-box">
        支付时间选择：
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <el-date-picker
          v-model="pickDate"
          type="datetimerange"
          :picker-options="dateOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          @change="search">
        </el-date-picker>
        <el-input
          v-model="form.keyword" 
          placeholder="筛选关键词" 
          class="handle-input mr10"
          @input="search">
        </el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>

    <el-table 
      :data="tableData" 
      border 
      style="width: 100%" 
      ref="multipleTable">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="orderNo" label="入金单号">
      </el-table-column>
      <el-table-column 
        prop="state" 
        label="交易状态" 
        :formatter="formatter"
        :filters="[
                    { text: '待支付', value: '待支付'},
                    { text: '已支付', value: '已支付'},
                    { text: '已到账', value: '已到账'}
                  ]"
        :filter-method="filterStatus"
        filter-placement="bottom-end"
        width="100">
        </el-table-column>
        <el-table-column prop="name" label="用户姓名">
        </el-table-column>
        <el-table-column prop="mobile" label="联系电话">
        </el-table-column>
        <el-table-column prop="amount" label="投资金额（CNY）" width="140">
        </el-table-column>
        <el-table-column prop="createTime" label="交易时间" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="paymentTime" label="支付时间" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="submitIP" label="提交IP">
        </el-table-column>
      </el-table>

      <div class="pagination" v-if="totalRows > 0">
        <el-pagination
          @current-change="changePage"
          layout="prev, pager, next"
          :total="totalRows">
        </el-pagination>
      </div>

</div>
</template>

 <script>
export default {
  data () {
    return {
      //请求数据参数
      form: {
        state: '',
        pageSize: 10,
        pageNo: 1,
        keyword: ''
      },
      totalRows: 0, //数据总条数
      tableData: [],//数据列表
      pickDate: [], //时间范围
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      dateOptions: {
        disabledDate (data) {
          const time = data.getTime()
          return time > new Date().getTime()
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      const self = this;
      return self.tableData.filter(function(d) {
        let is_del = false;
        for (let i = 0; i < self.del_list.length; i++) {
          if (d.user === self.del_list[i].user) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.status.indexOf(self.select_cate) > -1 &&
            (d.user.indexOf(self.select_word) > -1 ||
              d.amount.indexOf(self.select_word) > -1)
          ) {
            return d;
          }
        }
      });
      //   return self.tableData;
    }
  },
  methods: {
    //翻页
    changePage (page) {
      this.form.pageNo = page;
      this.getData();
    },
    formatter(row, column) {
      return row.status;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    //获取数据
    getData() {
      let self = this;
      self.$api.adminDepositListCount(self.form)
      .then(res => {
        if (res.data.code === 'SUCCESS') {
          self.totalRows = res.data.totalRows
        } else {
          self.totalRows = 0
        }
      })

      self.$api.adminDepositList(self.form)
      .then(res => {
        if (res.data.code === 'SUCCESS') {
          console.log(res.data)
          self.tableData = res.data.list;
        } else {
          self.$message.error('获取入金记录出错：' + res.data.message)
        }
      });
    },
    //筛选
    search() {
      if (this.pickDate) {
        this.form.startTime = this.pickDate[0]
        this.form.endTime = this.pickDate[0]
      } else {
        this.form.startTime = ''
        this.form.endTime = ''
      }
      this.getData()
    },
    //支付状态筛选
    filterStatus (value, row) {
      return row.status === value
    },
    //时间格式化
    formatTime (row, col) {
      if (col.property === 'paymentTime' && row.paymentTime) {
        return this.$moment(row.paymentTime * 1000).format('YYYY-MM-DD HH:mm:ss')
      } else if (col.property === 'createTime' && row.createTime) {
        return this.$moment(row.createTime * 1000).format('YYYY-MM-DD HH:mm:ss')
      } else {
        return false
      }
    },
  }
};
</script>

<!--<style src="../../../static/css/datasource.css"></style>-->
<style>
.handle-box {
  margin-bottom: 20px;
  font-size:14px
}
.handle-select {
  width: 120px;
}
.handle-input {
  width: 150px;
  display: inline-block;
}
.el-range-editor.el-input__inner {
  padding: 0 10px;
}
</style>


