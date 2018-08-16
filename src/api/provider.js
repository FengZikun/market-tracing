import request from '@/utils/request'

export function addMarketSupplierUser(data){
	return request({
		url: '/POST/MarketSupplierUser/addMarketSupplierUser',
	    method: 'post',
		params: data
	})
}

export function findMarketSupplierUserByPage(data){
	return request({
		url: '/POST/MarketSupplierUser/findMarketSupplierUserByPage',
	    method: 'post',
		params: data
	})
}

export function updateMarketSupplierUser(data){
	return request({
		url: '/POST/MarketSupplierUser/updateMarketSupplierUser',
	    method: 'post',
		params: data
	})
}

export function deleteMarketSupplierUserById(data){
	return request({
		url: '/POST/MarketSupplierUser/deleteMarketSupplierUserById',
	    method: 'post',
		params: data
	})
}

export function updateMarketSupplierUserStatus(data){
	return request({
		url: '/POST/MarketSupplierUser/updateMarketSupplierUserStatus',
	    method: 'post',
		params: data
	})
}
