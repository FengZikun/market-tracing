import Layout from '../views/layout/Layout'

export const asyncRouterMap3 = [
{
	path: '/storagetInfo',
	component: Layout,
	meta: { title: '采购中心', icon: 'storage', roles: ['centerRoot']},
	children: [
	{
		path: 'storagetInfo',
		name: 'storagetInfo',
		component: () => import('@/views/storagetInfo/index'),
		meta: { title: '采购中心', icon: 'storage', roles: ['centerRoot']},
	}
	]
},
//账号管理
{
	path: '/storageAdmin',
	component: Layout,
	meta: {title: '账号管理', icon: 'sysuser', roles: ['centerRoot']},
	children: [
	{
		path: 'storageAdminList',
		component: () => import('@/views/storageAdminList/index'),
		meta: {title: '账号管理', icon: 'sysuser'},
	},
	{
		path: 'addStorageAdmin',
		component: () => import('@/views/addStorageAdmin/index'),
		meta: {title: '添加账号'},
		hidden: true
	}
	]
},
{ path: '*', redirect: '/404', hidden: true }

]