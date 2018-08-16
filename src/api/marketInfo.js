import request from '@/utils/request'

export function findMarketInfoByPage(data){
	return request({
		url: '/POST/MarketInfo/findMarketInfoByPage',
		methods: 'post',
		params: data
	})
}

export function registerMarketUser(data){
	return request({
		url: '/POST/user/registerMarketUser',
		methods: 'post',
		params: data
	})
}

export function updateMarketInfo(data){
	return request({
		url: '/POST/MarketInfo/updateMarketInfo',
		methods: 'post',
		params: data
	})
}

export function deleteMarketInfoById(data){
	return request({
		url: '/POST/MarketInfo/deleteMarketInfoById',
		methods: 'post',
		params: data
	})
}

export function updateMarketInfoStatus(data){
	return request({
		url: '/POST/MarketInfo/updateMarketInfoStatus',
		methods: 'post',
		params: data
	})
}