<template>
	<div class="app-container">
		<div class="search">
			<el-button type="primary" @click='addInfo'>添加管理员</el-button>
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
	import { findCenterUserByPage } from '@/api/SysUser.js'
	import { parseTime } from '@/utils/index'
	export default {
		data () {
			return {
				tableData: null,
				searchKey: null,
				searchValue: null,
				totalRecords: null,
				formLabelWidth: '120px',
				form: null,
				dialogFormVisible: false,
				column: [
				{ prop: 'id', label: 'ID'},
				{ prop: 'centerUserName', label: '用户名'},
				{ prop: 'eMail', label: '邮箱'},
				{ prop: 'phoneNum', label: '电话'},
				{ prop: 'createDate', label: '创建时间'},
				{ prop: 'lastUpdateTime', label: '更新时间'},
				{ prop: 'isDelete', label: '状态'}
				]
			}
		},

		components: {
			stable
		},

		methods: {
			init (data) {
				findCenterUserByPage(data).then(response => {
					console.log(response)
					for (let i = 0, len = response.result.data.length; i < len; i++) {
						response.result.data[i].lastUpdateTime = parseTime(response.result.data[i].lastUpdateTime)
						response.result.data[i].createDate = parseTime(response.result.data[i].createDate)
					}
					this.tableData = response.result.data;
					this.totalRecords = response.totalRecords;
					this.currentPage = response.currentPage;
				})
			},

			addInfo () {
				this.$router.push({path: '/storageAdmin/addStorageAdmin'})
			},

			search () {
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

			updateData () {

			},

			clock () {

			},

			deletInfo () {

			}
		},

		created () {
			let data = {
				currentPage: 1,
				index: 0,
				token: this.$store.getters.token
			}
			this.init(data)
		}
	}
</script>

<style scoped>
	
</style>