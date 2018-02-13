import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    //重定向
    // {
    //   path: "/",
    //   redirect: "/index"
    // },

    //前台页面
    {
      path: '/',
      component: resolve => require(['../components/front/FrontHome.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/front/index.vue'], resolve)
        },
        {
          path: '/analyse',
          component: resolve => require(['../components/front/AnalyseStep.vue'], resolve)
        },
        {
          path: '/agreement',
          component: resolve => require(['../components/front/Agreement.vue'], resolve)
        },
        {
          path: '/applyagent',
          component: resolve => require(['../components/front/ApplyAgent.vue'], resolve)
        },
        {
          path: '/createorder',
          component: resolve => require(['../components/front/CreateOrder.vue'], resolve)
        },
      ]
    },
    //用户后台
    {
      path: "/user",
      component: resolve => require(["../components/user/UserHome.vue"], resolve),
      children: [
        {
          path: "/user",
          component: resolve => require(["../components/user/UserInfo.vue"], resolve), // 用户中心
          // meta: {
          //   requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          // }
        },
        {
          path: "/modifypasspword",
          component: resolve => require(["../components/user/ModifyPasspword.vue"], resolve) //用户代理
        },
        {
          path: "/userorder",
          component: resolve => require(["../components/user/UserOrder.vue"], resolve) // 用户订单
        }
      ]
    },
    //登录
    {
      path: "/login",
      component: resolve => require(["../components/login/LoginHome.vue"], resolve),
      children: [
        {
          path: "/login",
          component: resolve => require(["../components/login/Login.vue"], resolve)
        },
        {
          path: "/register",
          component: resolve => require(["../components/login/register.vue"], resolve)
        },
        {
          path: "/forget_password",
          component: resolve => require(["../components/login/forget_password.vue"], resolve)
        },
        {
          path: "/identifying_code_login",
          component: resolve => require(["../components/login/identifying_code_login.vue"], resolve)
        },
        {
          path: "/reset_password",
          component: resolve => require(["../components/login/ResetPassword.vue"], resolve)
        }
      ]
    },
    //管理员
    {
      path: "/admin",
      component: resolve => require(["../components/admin/AdminHome.vue"], resolve),
      children: [
        {
          path: "/admin",
          component: resolve => require(["../components/admin/user.vue"], resolve)
        },
        {
          path: "/agent",
          component: resolve => require(["../components/admin/agent.vue"], resolve)
        },
        {
          path: "/user_details",
          component: resolve => require(["../components/admin/user_details.vue"], resolve)
        },
        {
          path: "/order",
          component: resolve => require(["../components/admin/order.vue"], resolve)
        },
        {
          path: "/project_details:id",
          component: resolve => require(["../components/admin/project_details.vue"], resolve)
        },
        {
          path: "/project_launch",
          component: resolve => require(["../components/admin/project_launch.vue"], resolve)
        },
        {
          path: "/commision",
          component: resolve => require(["../components/admin/commision.vue"], resolve)
        },
        {
          path: "/withdraw",
          component: resolve => require(["../components/admin/withdraw.vue"], resolve)
        },
        {
          path: "/system",
          component: resolve => require(["../components/admin/system.vue"], resolve)
        }
      ]
    }
  ]
});

router.afterEach((from , to) => {
  // if (Store.state.logOut) {
  //     router.push({path: '/'})
  // }
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (localStorage.token) {  // 通过vuex state获取当前的token是否存在
        next();
        //console.log(store.state.token+"1");
      } else {
        next({
          path: '/login',
          query: { redirect: to.Path }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
      }
    }
    else {
      next();
    }
})
export default router;
