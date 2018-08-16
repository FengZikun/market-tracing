<template>
	<div class="app-container">
		<stable :column="column, tableData">
			<template slot="button">
				<el-button type="primary" @click='addAcceptor'>新增收货员</el-button>
				<el-select v-model="searchValue" filterable clearable placeholder="请选择">
					<el-option v-for="item in column" :key="item.prop" :label="item.label" :value="item.prop"></el-option>
				</el-select>
				<el-input v-model="searchKey" class="searchInput"></el-input>
				<el-button type="primary" @click="search">查询</el-button>
			</template>
			
			<el-table-column align="center" width="160" slot="operation" label="操作">
				<template slot-scope="scope">
					<el-button type="mini" v-if="scope.row.isDelete===0" @click="clock(scope.row.acceptorId)">锁定</el-button>
					<el-button type="mini" v-else @click="clock(scope.row.acceptorId)">解锁</el-button>
					<el-button size="mini" type="danger" @click="deleteAcceptor(scope.row.acceptorId)">删除</el-button>
				</template>
			</el-table-column>
		</stable>
		<el-pagination @current-change='pageChange' class="page" background layout="prev, pager, next" :total="totalRecords">
		</el-pagination>
	</div>
</template>

<script type="text/javascript">
	import stable from '@/components/Table/index'
	import { findMarketAcceptorByPage, addMarketAcceptor, deleteMarketAcceptorById, updateMarketAcceptorStatus } from '@/api/acceptor.js'
	export default{
		data(){
			return{
				tableData: null,
				totalRecords: null,
				searchValue: null,
				searchValue: null,
				searchKey: null,
				currentPage: 1,
				column:[
				{ prop: 'acceptorId', label: '收货员ID', sign:false},
				{ prop: 'marketId', label: '超市ID', sign:false},
				{ prop: 'storageId', label: '所属仓库ID', sign:false},
				{ prop: 'acceptorOpenId', label: '收货员openID', sign:false},
				{ prop: 'marketAcceptorName', label: '收货员姓名', sign:false},
				{ prop: 'phoneNum', label: '收货员电话号码', sign:false},
				{ prop: 'lv', label: '收货员等级', sign:false},
				{ prop: 'fOpenId', label: '推荐者openID', sign:false},
				{ prop: 'fLv', label: '推荐者等级', sign:false},
				{ prop: 'keeperOpenId', label: '由管理员授权的第一级收货员', sign:false},
				{ prop: 'createDate', label: '创建时间', sign:false},
				{ prop: 'isDelete', label: '状态', sign: true},
				],
			}
		},

		methods: {

			init(data){
				findMarketAcceptorByPage(data).then(response => {
					this.tableData = response.result.data;
					this.totalRecords = response.totalRecords;
					this.currentPage = response.currentPage;
				})
			},

			addAcceptor(){
				this.$router.push({path: '/addAcceptor/addAcceptor'})
			},

			deleteAcceptor(id){
				var data={
					token: this.$store.getters.token,
					acceptorId: id
				}
				console.log(data)
				deleteMarketAcceptorById(data).then(response => {
					console.log(response)
					this.init();
				})
			},

			clock(id){
				var data = {
					token: this.$store.getters.token,
					acceptorId: id
				}
				updateMarketAcceptorStatus(data).then(response => {
					console.log(response)
					this.init({currentPage: this.currentPage});
				})
			},

			search(){
				if(this.searchValue === null || ''){
					Message({
						message: '请选择搜索类型',
						type: 'warning',
						duration: 2 * 1000
					})
					return
				}
				if(this.searchKey === null || ''){
					Message({
						message: '请输入搜索关键词',
						type: 'warning',
						duration: 2 * 1000
					})
					return

				}
				var data = {
					currentPage: 1,
					index: 0,
					key: this.searchValue,
					value: this.searchKey
				}
				this.init(data)
			},

			pageChange(val){
				var data = {
					currentPage: val,
					index: (val - 1)*10
				}
				this.init(data)
			}
		},

		components:{
			stable
		},

		created(){
			this.init();
		}
	}
</script>

<style type="text/css" scoped>

</style>