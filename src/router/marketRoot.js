import Layout from '../views/layout/Layout'

export const asyncRouterMap5 = [

{
	path: '/storagetInfo',
	component: Layout,
	meta: { title: '采购中心', icon: 'storage', roles: ['marketRoot']},
	children: [
	{
		path: 'storagetInfo',
		name: 'storagetInfo',
		component: () => import('@/views/storagetInfo/index'),
		meta: { title: '采购中心', icon: 'storage', roles: ['marketRoot']},
	}
	]
}

]