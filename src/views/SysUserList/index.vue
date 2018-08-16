<template>
	<div class="app-container">
		<el-dialog title="授权" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="账号类型" :label-width="formLabelWidth">
					<el-select v-model="form.userType" placeholder="请选择">
						<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="changeType">确 定</el-button>
			</div>
		</el-dialog>
		<div class="search">
			<el-button type="primary" @click='addUser'>注册新账号</el-button>
			<el-select v-model="searchValue" filterable clearable placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-input v-model="searchKey" class="searchInput"></el-input>
			<el-button type="primary" @click="search">查询</el-button>
		</div>
		
		<el-table border :data="userList" style="margin-top: 20px;" :row-class-name="tableRowClassName">
			<el-table-column prop="userId" label="ID"></el-table-column>
			<el-table-column prop="userName" label="用户名"></el-table-column>
			<el-table-column prop="userType" label="账号类型">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.userType===1" type="success">系统管理员</el-tag>
					<el-tag v-if="scope.row.userType===2" type="warning">超市收货员</el-tag>
					<el-tag v-if="scope.row.userType===3">仓库管理员</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="userPhone" label="手机号">
				<template slot-scope="scope">
					<span v-if="scope.row.userPhone === null">无</span>
					<span v-else>{{scope.row.userPhone}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="innerNum" label="员工编号"></el-table-column>
			<el-table-column prop="isDelete" label="状态">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.isDelete === 1" type="warning">已锁定</el-tag>
					<el-tag v-else>未锁定</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="createTime" label="创建时间"></el-table-column>
			<el-table-column label = "操作">
				<template slot-scope="scope">
					<a href="javascript:void(0)" @click="deletUser(scope.row.userId)">删除</a>
					<a href="javascript:void(0)" @click="dialogFormVisible=true; userId=scope.row.userId; form.userType=scope.row.userType">授权</a>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @current-change='pageChange' class="page" background layout="prev, pager, next" :total="totalRecords">
		</el-pagination>
	</div>
</template>

<style scoped>
.warning-row{
	background: #f0f9eb;
}
.search{
	margin: 20px 0;
}
.searchInput{
	width: 180px;
}
</style>

<script type="text/javascript">
	import { findTracingSysUserByPage, findTracingSysUserList, managerDeleteTracingSysUserById, managerChangeTracingSysUserRightById} from '@/api/SysUser.js'
	import { Message, MessageBox } from 'element-ui'

	export default{
		data(){
			return{
				userList: null,
				currentPage: 1,
				totalRecords: null,
				dialogFormVisible: false,
				userId: null,
				form: {
					userType: null
				},
				filters1: [
				{ text: '系统管理员', value: 1},
				{ text: '超市收货员', value: 2},
				{ text: '仓库管理员', value: 3}
				],
				index: 0,
				pageSize: 10,
				totalRecords: null,
				searchValue: null,
				searchKey: null,
				options: [
				{
					value:'userId',
					label:'ID'
				},
				{
					value:'userName',
					label:'用户名'
				},
				{
					value:'userType',
					label:'账号类型'
				},
				{
					value:'userPhone',
					label:'手机号'
				},
				{
					value:'innerNum',
					label:'员工编号'
				},
				{
					value:'isDelete',
					label:'状态'
				},
				{
					value:'createTime',
					label:'创建时间'
				},
				],
				typeOptions: [
				{
					label: '系统管理员',
					value: 1
				},
				{
					label: '超市收货员',
					value: 2
				},
				{
					label: '仓库管理员',
					value: 3
				}
				],
				formLabelWidth: '120px'
			}
		},

		methods:{
			tableRowClassName({row, rowIndex}){
				if(row.isDelete === 1){
					return 'warning-row'
				}
				return ''
			},

			init(){
				// findTracingSysUserList(this.$store.getters.token).then(response => {
				// 	console.log(response)
				// 	this.userList = response.data;
				// })
				var data = {
					currentPage: this.currentPage,
					index: this.index,
					key: this.searchValue,
					value: this.searchKey,
					token: this.$store.getters.token
				}
				findTracingSysUserByPage(data).then(response => {
					console.log(response);
					this.userList = response.result.data;
					this.totalRecords = response.totalRecords;
					this.pageSize = response.pageSize;
					this.currentPage = response.currentPage;
				})
			},
			addUser(){
				this.$router.push({path: 'addSysUser'})
			},

			pageChange(val){
				this.currentPage = val;
				this.index = (this.currentPage - 1)*10;
				this.init();
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
				this.init(1, this.searchValue, this.searchKey)
			},

			deletUser(id){
				var data = {
					token: this.$store.getters.token,
					userId: id
				}
				managerDeleteTracingSysUserById(data).then(response => {
					console.log(response)
					this.init()
				})
			},

			changeType(){
				if(this.form.userType === null || ''){
					Message({
						message: '请选择账号类型',
						type: 'warning',
						duration: 2 * 1000
					})
					return
				}
				var data = {
					token: this.$store.getters.token,
					userId: this.userId,
					userType: this.form.userType,
					isRoot: 1
				}
				managerChangeTracingSysUserRightById(data).then(response => {
					console.log(response);
					this.dialogFormVisible = false;
					this.userId = null;
					this.init();
				})
			}
		},

		created(){
			this.init()
		}
	}
</script>

