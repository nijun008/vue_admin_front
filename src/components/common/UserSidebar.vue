<template>
  <div class="sidebar">
    <el-menu 
      :default-active="onRoutes" 
      class="el-menu-vertical-demo user-menu" 
      theme="#ffff" unique-opened router 
      active-text-color="#ffffff">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import store from '../../store'
export default {
  data() {
    return {
      items: [{
          icon: 'el-icon-setting',
          index: 'user',
          title: '个人中心'
        },
        {
          icon: 'el-icon-document',
          index: 'userorder',
          title: '我的订单'
        },
        {
          icon: 'el-icon-view',
          index: 'modifypasspword',
          title: '修改密码'
        }
      ]
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    },
    headerImg() {
      return this.$store.state.user.headerImg ;
    },
    name(){
      return this.$store.state.user.nickname;
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../../static/css/global.less);
.sidebar{
  max-width: 100%;
  height: 600px;
}
.user-menu{
  height: 100%;
  background-color: @mainColor;
  padding: 20px 20px;
  border: none;
}
.user-menu>li{
  background-color: #64bbff;
  margin-bottom: 15px;
  border-radius: 5px;
}
.sidebar-info {
  background: @mainColor;
  text-align: center;
  padding-bottom: 40px;
}
.sidebar .el-menu-vertical-demo .el-menu-item,.sidebar .el-menu-vertical-demo .el-menu-item i{
  color: #000;
}
.sidebar .el-menu-vertical-demo .el-menu-item:hover,.sidebar .el-menu-vertical-demo .el-menu-item:hover i,.sidebar .el-menu-vertical-demo .el-menu-item.is-active i{
  color: @mainColor;
}
.user-menu .is-active {
  color: @mainColor !important;
  background-color: #fff;
}
.el-menu-item {
  font-size: 18px;
  text-align: center;
  padding-left: 0 !important;
}
.el-menu-item:hover {
  background-color: #fff;
  color: @mainColor !important;
}
.el-menu-item:hover i {
  color: @mainColor;
}
</style>