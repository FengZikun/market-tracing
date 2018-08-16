import Layout from '../views/layout/Layout'

export const asyncRouterMap2 = [
{
	path: '/storagetInfo',
	component: Layout,
	meta: { title: '配送中心', icon: 'storage', roles: ['admin']},
	children: [
	{
		path: 'storagetInfo',
		name: 'storagetInfo',
		component: () => import('@/views/storagetInfo/index'),
		meta: { title: '配送中心', icon: 'storage', roles: ['admin']},
	}
	]
},
{
	path: '/addStorage',
	component: Layout,
	hidden: true,
	children: [
	{
		path: 'addStorage',
		name: 'addStorage',
		component: () => import('@/views/addStorage/index'),
		meta: { title: '新增配送中心'},
	},
	]
},
{
	path: '/marketInfo',
	component: Layout,
	meta: {roles: ['admin']},
	children: [
	{
		path: 'marketInfo',
		name: 'marketInfo',
		component: () => import('@/views/marketInfo/index'),
		meta: { title: '超市管理', icon: 'market',  roles: ['admin']},
	}
	]
},
{
	path: '/addMarket',
	component: Layout,
	hidden: true,
	children: [
	{
		path: 'addMarket',
		name: 'addMarket',
		component: () => import('@/views/addMarket/index'),
		meta: { title: '新增超市信息', roles: ['admin']},
	}
	]
},
{ path: '*', redirect: '/404', hidden: true }
]