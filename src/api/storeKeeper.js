import request from '@/utils/request'

export function addStoreKeeper(data){
	return request({
		url: '/POST/StoreKeeper/addStoreKeeper',
		methods: 'post',
		params: data
	})
}

export function updateStoreKeeper(data){
	return request({
		url: '/POST/StoreKeeper/updateStoreKeeper',
		methods: 'post',
		params: data
	})
}

export function deleteStoreKeeperById(data){
	return request({
		url: '/POST/StoreKeeper/deleteStoreKeeperById',
		methods: 'post',
		params: data
	})
}

export function findStoreKeeperByPage(data){
	return request({
		url: '/POST/StoreKeeper/findStoreKeeperByPage',
		methods: 'post',
		params: data
	})
}

export function updateStoreKeeperStatus(data){
	return request({
		url: '/POST/StoreKeeper/updateStoreKeeperStatus',
		methods: 'post',
		params: data
	})
}