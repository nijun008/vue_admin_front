<template>
  <div class="user">
    <div class="table_tit color-red">
      <i class="el-icon-menu"></i>所有用户
    </div>
    <!--筛选部分-->
    <div class="table_operation">
      <span class="demonstration">注册日期选择：</span>
            <el-date-picker v-model="value3" type="datetimerange" placeholder="选择时间范围">
            </el-date-picker>
      <el-select v-model="value" placeholder="资料状态">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
      <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input" style="margin-left: 30px;"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
    
    </div>
    <!--筛选部分结束-->
    <!--表格部分-->
    <div class="table-data">
      <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">

        <el-table-column prop="name" label="姓名" >
        </el-table-column>
        <!-- <el-table-column prop="bank_card_state" label="投资人实名状态">
        </el-table-column> -->
        <el-table-column prop="bank_card_state" label="银行卡状态">
        </el-table-column>
        <el-table-column prop="registrationTime" label="注册时间" sortable>
        </el-table-column>
        <!--<el-table-column prop="staff" label="上级员工">
        </el-table-column>
        -->
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号" width="180">
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <!--<el-button size="small" @click="todetail(scope.$index, scope.row)">-->

              <router-link :to="'/user_details' + scope.$index" tag="button" class="primary el-button el-button--primary">
                    查看
                  </router-link>
            <!--</el-button>-->
          </template>
        </el-table-column>
      </el-table>

    </div>
    <!--表格部分-->
    <!--分页部分-->
    <!--<div class="pagenation">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>-->
    <!--分页部分结束-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value3: [new Date(), new Date()],
        tableData: [{
          date: '2016-05-02',
          name: 'Cecilia',
          state: '待审核',
          bank_card_state: '已通过',
          registrationTime: '2017-11-04 06:45:28',
//          staff: 'Maxi Limit',
          email: '1143234345@qq.com',
          phoneNumber: '+86.18183292050-10'
        }, {
          date: '2016-05-04',
          name: 'Sara',
          state: '待审核',
          bank_card_state: '已驳回',
          registrationTime: '2017-11-08 06:45:28',
          email: '1143234345@qq.com',
          phoneNumber: '+86.18183292050-10'
        }, {
          date: '2016-05-01',
          name: '李华',
          state: '待审核',
          bank_card_state: '待审核',
          registrationTime: '2017-10-06 06:45:28',
          //staff: 'Maxi Limit',
          email: '1143234345@qq.com',
          phoneNumber: '+86.18183292050-10'
        }, {
          date: '2016-05-03',
          name: '王刚',
          state: '待审核',
          bank_card_state: '待审核',
          registrationTime: '2017-08-06 06:45:28',
          //staff: 'Maxi Limit',
          email: '1143234345@qq.com',
          phoneNumber: '+86.18183292050-10'
        }]
      }

    },
    methods: {


    },
    created(){
       this.$api.userProfile().then(res => {
        console.log(res)
      })
    }
  }
</script>

<style>
  .table-data .primary{
    padding: 8px 10px;
  }
  .user .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 340px;
  }

  .pagenation .el-pager li {
    border: 1px solid #ddd;
    margin-right: 4px;
  }

  .user .el-button--small,
  .el-button--small.is-round {
    padding: 9px 8px;
  }

  .table-data {
    margin: 20px 0;
  }

  .user .el-row::after,
  .user .el-row::before {
    display: none;
  }

  .user .table_operation .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 140px;
  }

  .user .el-select {
    display: inline-block;
    position: relative;
    width: 110px;
  }

  .demonstration {
    font-size: 14px;
  }

  .user .table_tit {
    font-size: 14px;
  }

  .user .table_tit i {
    margin-right: 5px;
  }

  .table_operation {
    margin: 20px 0;
    overflow: hidden;
  }

  .el-date-range-picker {
    width: 646px !important;
  }
</style>
