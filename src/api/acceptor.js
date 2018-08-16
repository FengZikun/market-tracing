import request from '@/utils/request'

export function findMarketAcceptorByPage(query) {
	return request({
		url: '/POST/MarketAcceptor/findMarketAcceptorByPage',
		method: 'post',
		params: query
	})
}

export function addMarketAcceptor(query) {
	return request({
		url: '/POST/MarketAcceptor/addMarketAcceptor',
		method: 'post',
		params: query
	})
}

export function deleteMarketAcceptorById(query) {
	return request({
		url: '/POST/MarketAcceptor/deleteMarketAcceptorById',
		method: 'post',
		params: query
	})
}

export function updateMarketAcceptorStatus(query) {
	return request({
		url: '/POST/MarketAcceptor/updateMarketAcceptorStatus',
		method: 'post',
		params: query
	})
}