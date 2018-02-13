<template>
  <div>
    <div class="admin-wrap">
      <el-tabs v-model="activeName">
        <el-tab-pane label="所有用户" name="first">
          <div class="admin-content">
            <el-row class="user-box">
              <el-col :span="12">
                <p>总积分：<span class="jifen">499</span></p>
                <p>用户ID：35239434</p>
                <p>手机号：12459284820</p>
              </el-col>
              <el-col :span="12">
                <p>&nbsp;</p>
                <p>注册时间：2015-11-11 11:11:11</p>
                <p>推荐码：24sd8</p>
              </el-col>
            </el-row>
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
.user-box{
  background-color: #f5f5f5;
  padding: 20px;
  line-height: 30px;
  color: #666;
}
.jifen{
  color: @mainColor;
  font-size: 24px;
}
</style>