<template>
	<div class="app-container">
		<el-dialog title="编辑" v-if="dialogFormVisible" :visible.sync="dialogFormVisible">
			<el-form ref="form" :model="form">
				<el-form-item label="进货id" :label-width="formLabelWidth">
					<el-input v-model="form.marketName"></el-input>
				</el-form-item>
				<el-form-item label="进货批次号" :label-width="formLabelWidth">
					<el-input v-model="form.marketLocation"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateDataConfirm">确 定</el-button>
			</div>
		</el-dialog>
		<div class="search">
			<el-button type="primary" @click='addInfo'>添加超市信息</el-button>
			<el-select v-model="searchValue" filterable clearable placeholder="请选择">
				<el-option v-for="item in column" :key="item.prop" :label="item.label" :value="item.prop"></el-option>
			</el-select>
			<el-input v-model="searchKey" class="searchInput"></el-input>
			<el-button type="primary" @click="search">查询</el-button>
		</div>
		<stable :column="column, tableData">
			<el-table-column align="center" width="220" slot="operation" label="操作" fixed="right">
				<template slot-scope="scope">
					<el-button size="mini" @click="updateData(scope.row)">编辑</el-button>
					<el-button type="mini" v-if="scope.row.isDelete===0" @click="clock(scope.row.marketId)">锁定</el-button>
					<el-button type="mini" v-else @click="clock(scope.row.marketId)">解锁</el-button>
					<el-button size="mini" type="danger" @click="deletInfo(scope.row.marketId)">删除</el-button>
				</template>
			</el-table-column>
		</stable>
		<el-pagination @current-change='pageChange' class="page" background layout="prev, pager, next" :total="totalRecords">
		</el-pagination>
	</div>
</template>

<script type="text/javascript">
	import stable from '@/components/Table/index'
	import { Message, MessageBox } from 'element-ui'
	import { findMarketInfoByPage, updateMarketInfo, deleteMarketInfoById, updateMarketInfoStatus } from '@/api/marketInfo.js'
	import { findTracingSysUserByPage } from '@/api/SysUser.js'

	export default{
		data(){
			return{
				tableData: null,
				searchKey: null,
				searchValue: null,
				totalRecords: null,
				formLabelWidth: '120px',
				form: null,
				dialogFormVisible: false,
				column: [
				{ prop: 'marketId', label: '超市id'},
				{ prop: 'marketCode', label: '超市短码'},
				{ prop: 'marketName', label: '超市名称'},
				{ prop: 'marketLocation', label: '超市地址'},
				{ prop: 'createDate', label: '创建时间'},
				{ prop: 'isDelete', label: '状态'},
				]
			}
		},

		components:{
			stable
		},

		methods: {
			init(data){
				findTracingSysUserByPage(data).then(response => {
					console.log(response)
					this.tableData = response.result.data;
					this.totalRecords = response.totalRecords;
					this.currentPage = response.currentPage;
				})
			},

			addInfo(){
				this.$router.push({path: '/addMarket/addMarket'})
			},

			pageChange(val){
				var data = {
					currentPage: val,
					index: (val - 1)*10,
					token: this.$store.getters.token,
					searchKey: this.searchKey,
					searchValue: this.searchValue
				}
				this.init(data)
			},

			updateData(data){
				this.dialogFormVisible = true;
				this.form = data;
				console.log(this.form)
			},

			updateDataConfirm(){
				var data = {
					token: this.$store.getters.token,
				}
				data = Object.assign(data, this.form);
				delete data.marketCode;
				delete data.createDate;
				delete data.isDelete;
				updateMarketInfo(data).then(response => {
					console.log(response);
					this.dialogFormVisible = false;
					this.init();
				})
			},

			deletInfo(id){
				var data = {
					token: this.$store.getters.token,
					marketId: id
				}
				deleteMarketInfoById(data).then(response => {
					console.log(response)
					this.init()
				})
			},

			clock(id){
				var data = {
					token: this.$store.getters.token,
					marketId: id
				}
				updateMarketInfoStatus(data).then(response => {
					this.init({currentPage: this.currentPage});
				})
			},

			search(){
				if(this.searchprop === null){
					Message({
						message: '请选择搜索类型',
						type: 'warning',
						duration: 2 * 1000
					})
					return
				}
				if(this.searchKey === null){
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
			}
		},

		created(){
			let data = {
				currentPage: 1,
				index: 0,
				key: 'userType',
				value: '2',
				token: this.$store.getters.token
			}
			this.init(data)
		}
	}
</script>

<style type="text/css" scoped>
	
</style>