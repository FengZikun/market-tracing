import Layout from '../views/layout/Layout'

export const asyncRouterMap1 = [
  //账号管理
  {
    path: '/SysUser',
    component: Layout,
    meta: {title: '账号管理', icon: 'sysuser', roles: ['root']},
    children: [
    {
      path: 'SysUserList',
      component: () => import('@/views/SysUserList/index'),
      meta: {title: '账号管理', icon: 'sysuser'},
    },
    {
      path: 'addSysUser',
      component: () => import('@/views/SysUser/index'),
      meta: {title: '添加账号'},
      hidden: true
    }
    ]
  },

  {
    path: '/providerList',
    component: Layout,
    meta: { title: '供应商管理', icon: 'peoples', roles: ['procurement', 'root']},
    children: [
    {
      path: 'providerList',
      name: 'providerList',
      component: () => import('@/views/providerList/index'),
      meta: { title: '供应商列表', icon: 'people'}
    },
    {
      path: 'addProvider',
      name: 'addProvider',
      component: () => import('@/views/addProvider/index'),
      meta: { title: '新增供应商'},
      hidden: true
    }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
];