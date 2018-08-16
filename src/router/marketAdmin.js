import Layout from '../views/layout/Layout'

export const asyncRouterMap6 = [

{
	path: '/storagetInfo',
	component: Layout,
	meta: { title: '采购中心', icon: 'storage', roles: ['marketAdmin']},
	children: [
	{
		path: 'storagetInfo',
		name: 'storagetInfo',
		component: () => import('@/views/storagetInfo/index'),
		meta: { title: '采购中心', icon: 'storage', roles: ['marketAdmin']},
	}
	]
}

]