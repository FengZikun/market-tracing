import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
  **/
  export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/home',
    component: Layout,
    children: [
    {
      path: 'index',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: 'Home', icon: 'home' }
    }
    ]
  },
  {
    path: '/userInfo',
    component: Layout,
    hidden: true,
    children: [
    {
      path: 'index',
      name: 'userInfo',
      component: () => import('@/views/userInfo/index'),
      meta: { title: '个人中心' }
    }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/AcceptanceInfoList',
    component: Layout,
    children: [
    {
      path: 'AcceptanceInfoList',
      name: 'AcceptanceInfoList',
      component: () => import('@/views/AcceptanceInfoList/index'),
      meta: {title: '进货单查询', icon: 'documentation'},
    }
    ]
  },
  {
    path: '/ReceivingInfo',
    component: Layout,
    meta: {title: '收货单', icon: 'documentation'},
    children: [
    {
      path: 'ReceivingInfoList',
      name: 'ReceivingInfoList',
      component: () => import('@/views/ReceivingInfoList/index'),
      meta: {title: '收货单查询', icon: 'documentation'},
    },
    {
      path: 'acceptor',
      name: 'acceptor',
      component: () => import('@/views/acceptor/index'),
      meta: {title: '收货员管理', icon: 'money'},
    }
      
    ]
  },
  {
    path: '/addAcceptor',
    component: Layout,
    hidden: true,
    children: [
    {
      path: 'addAcceptor',
      name: 'addAcceptor',
      component: () => import('@/views/addAcceptor/index'),
      meta: { title: '新增收货员'},
    }
    ]
  },
  {
    path: '/addBuyer',
    component: Layout,
    hidden: true,
    children: [
    {
      path: 'addBuyer',
      name: 'addBuyer',
      component: () => import('@/views/addBuyer/index'),
      meta: { title: '新增进货单'},
    }
    ]
  },
  {
    path: '/addStoreKeeper',
    component: Layout,
    hidden: true,
    children: [
    {
      path: 'addStoreKeeper',
      name: 'addStoreKeeper',
      component: () => import('@/views/addStoreKeeper/index'),
      meta: { title: '添加仓库管理员'},
    }
    ]
  },
  {
    path: '/addReceivingInfo',
    component: Layout,
    hidden: true,
    children: [
    {
      path: 'addReceivingInfo',
      name: 'addReceivingInfo',
      component: () => import('@/views/addReceivingInfo/index'),
      meta: { title: '新增收货单'},
    }
    ]
  }
  ]

  export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


