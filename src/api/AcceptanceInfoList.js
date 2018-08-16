import request from '@/utils/request'

export function findSuperMarketInInfoByPage(data){
	return request({
		url: '/POST/SuperMarketInInfo/findSuperMarketInInfoByPage',
		methods: 'post',
		params: data
	})
}

export function deleteTeamBuyAcceptanceInfoById(data){
	return request({
		url: '/POST/SuperMarketInInfo/deleteTeamBuyAcceptanceInfoById',
		methods: 'post',
		params: {
			id: data
		}
	})
}

export function updateSuperMarketInInfo(data){
	return request({
		url: '/POST/SuperMarketInInfo/updateSuperMarketInInfo',
		methods: 'post',
		params: data
	})
}

export function addSuperMarketInInfo(data){
	return request({
		url: '/POST/SuperMarketInInfo/addSuperMarketInInfo',
		methods: 'post',
		params: data
	})
}

export function createTracingCode(data){
	return request({
		url: '/POST/TracingCode/createTracingCode',
		methods: 'post',
		params: data
	})
}

export function findTracingCodeByPage(data){
	return request({
		url: '/POST/TracingCode/findTracingCodeByPage',
		methods: 'post',
		params: data
	})
}