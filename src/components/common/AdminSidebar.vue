<template>
  <div class="sidebar">
    <el-menu 
      :default-active="onRoutes" 
      class="el-menu-vertical-demo user-menu" 
      theme="#ffffff" unique-opened router 
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
          icon: 'el-icon-menu',
          index: 'admin',
          title: '用户管理'
        },
        {
          icon: 'el-icon-document',
          index: 'order',
          title: '订单管理'
        },
        {
          icon: 'el-icon-star-on',
          index: 'modifypasspword',
          title: '代理管理'
        },
        {
          icon: 'el-icon-share',
          index: 'commision',
          title: '返佣管理',
          subs: [
            { index: 'commision', title: '返佣明细' },
            { index: 'withdraw', title: '提现明细' }
          ]
        },
        {
          icon: 'el-icon-view',
          index: 'modifypasspword',
          title: '财务管理'
        },
        {
          icon: 'el-icon-setting',
          index: 'system',
          title: '系统设置'
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

<style lang="less">
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
.sidebar .el-menu-vertical-demo .el-menu-item,.sidebar .el-menu-vertical-demo .el-menu-item i,.el-submenu__title i{
  color: #000;
}
.sidebar .el-menu-vertical-demo .el-menu-item:hover,.sidebar .el-menu-vertical-demo .el-menu-item:hover i,.sidebar .el-menu-vertical-demo .el-menu-item.is-active i,.el-submenu__title:hover i{
  color: @mainColor;
}
.user-menu .is-active {
  color: @mainColor !important;
  background-color: #fff;
}
.el-menu-item,.el-submenu__title {
  font-size: 18px;
  text-align: center;
  padding-left: 0 !important;
}
.el-submenu .el-menu-item{
  padding-right: 0;
  font-size: 16px;
}
.el-menu-item:hover ,.el-submenu__title:hover{
  background-color: #fff;
  color: @mainColor !important;
}
.el-menu-item:hover i {
  color: @mainColor;
}
.el-submenu .el-menu-item{
  min-width: 150px;
}
.el-submenu{
  border-radius: 5px;
  overflow: hidden;
}
</style>