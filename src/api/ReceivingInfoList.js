import request from '@/utils/request'

export function findTeamBuyAcceptanceInfoByPage(params){
	return request({
		url: '/POST/TeamBuyAcceptanceInfo/findTeamBuyAcceptanceInfoByPage',
		methods: 'post',
		params: params
	})
}

export function findTeamBuyAcceptanceInfoByKeyWord(params){
	return request({
		url: '/POST/TeamBuyAcceptanceInfo/findTeamBuyAcceptanceInfoByKeyWord',
		methods: 'post',
		params: params
	})
}

export function deleteTeamBuyAcceptanceInfoById(params){
	return request({
		url: '/POST/TeamBuyAcceptanceInfo/deleteTeamBuyAcceptanceInfoById',
		methods: 'post',
		params: params
	})
}

export function updateTeamBuyAcceptanceInfo(params){
	return request({
		url: '/POST/TeamBuyAcceptanceInfo/updateTeamBuyAcceptanceInfo',
		methods: 'post',
		params: params
	})
}

export function addTeamBuyAcceptanceInfo(params){
	return request({
		url: '/POST/TeamBuyAcceptanceInfo/addTeamBuyAcceptanceInfo',
		methods: 'post',
		params: params
	})
}