<template>
  <div>
    <div class="admin-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部订单" name="first">
          <div class="admin-content">
            <el-row class="select-box" :gutter="12">
              <el-col :span="3">创建日期:</el-col>
              <el-col :span="11">
                <el-date-picker
                  v-model="selectDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-col>
              <el-col :span="4">
                <el-input placeholder="筛选关键词"></el-input>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
              </el-col>
              <el-col :span="3"></el-col>
            </el-row>
  
            <el-table
              :data="userList"
              :stripe="true">
              <el-table-column
                prop="number"
                label="序号">
              </el-table-column>
              <el-table-column
                prop="userID"
                label="用户ID">
              </el-table-column>
              <el-table-column
                prop="phone"
                label="手机号"
                width="110">
              </el-table-column>
              <el-table-column
                prop="registerCode"
                label="注册推荐号"
                width="110">
              </el-table-column>
              <el-table-column
                prop="time"
                label="注册时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="tuiCode"
                label="推荐码">
              </el-table-column>
              <el-table-column
                label="积分"
                width="90">
                <template slot-scope="scope">
                  {{ scope.row.integral }}
                  <router-link :to="'/user_details'" class="user-check">查看</router-link>
                </template>
              </el-table-column>
              <el-table-column
                prop="agent"
                label="是/否代理">
              </el-table-column>
            </el-table>

          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      selectDate: [],
      userList: [
        { number: '01', userID: '24141', phone: '1248328913', registerCode: '2afj2', time: '2017-11-11 12:12:12', tuiCode: '21jfa', integral: '3000', agent: '是' },
        { number: '01', userID: '24141', phone: '1248328913', registerCode: '2afj2', time: '2017-11-11 12:12:12', tuiCode: '21jfa', integral: '3000', agent: '是' },
        { number: '01', userID: '24141', phone: '1248328913', registerCode: '2afj2', time: '2017-11-11 12:12:12', tuiCode: '21jfa', integral: '3000', agent: '是' },
      ],
    }
  }
}
</script>

<style lang="less">
@import url(../../../static/css/global.less);
.admin-wrap{
  min-height: 600px;
  background-color: #fff;
  padding-left: 40px;
  padding-top: 20px;
}
.el-tabs__item {
  font-size: 18px;
}
.admin-content{
  width: 97%;
}
.select-box{
  background-color: #f5f5f5;
  padding: 18px;
  line-height: 40px;
  margin-bottom: 20px;
}
.admin-content .cell{
  text-align: center;
}
.el-table{
  border: 1px solid #f5f5f5;
}
.el-table thead tr{
  background-color: #f5f5f5;
}
.user-check{
  color: @mainColor;
}
</style>