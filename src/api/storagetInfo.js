import request from '@/utils/request'

export function registerCenterUser(data){
	return request({
		url: '/POST/user/registerCenterUser',
		methods: 'post',
		params: data
	})
}

export function updateDistributionCenter(data){
	return request({
		url: '/POST/DistributionCenter/updateDistributionCenter',
		methods: 'post',
		params: data
	})
}

export function deleteDistributionCenterById(data){
	return request({
		url: '/POST/DistributionCenter/deleteDistributionCenterById',
		methods: 'post',
		params: data
	})
}

export function findDistributionCenterByPage(data){
	return request({
		url: '/POST/DistributionCenter/findDistributionCenterByPage',
		methods: 'post',
		params: data
	})
}

export function updateDistributionCenterStatus(data){
	return request({
		url: '/POST/DistributionCenter/updateDistributionCenterStatus',
		methods: 'post',
		params: data
	})
}