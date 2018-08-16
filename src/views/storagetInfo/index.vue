<template>
	<div class="app-container">
	<el-dialog title="编辑" v-if="dialogFormVisible" :visible.sync="dialogFormVisible">
		<el-form ref="form" :model="form">
			<el-form-item label="名称" :label-width="formLabelWidth">
				<el-input v-model="form.centerName"></el-input>
			</el-form-item>
			<el-form-item label="编号" :label-width="formLabelWidth">
				<el-input v-model="form.centerNum"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="updateDataConfirm">确 定</el-button>
		</div>
	</el-dialog>
	<div class="search">
		<el-button type="primary" @click='addInfo'>添加配送中心</el-button>
		<el-select v-model="searchValue" filterable clearable placeholder="请选择">
			<el-option v-for="item in column" :key="item.prop" :label="item.label" :value="item.prop"></el-option>
		</el-select>
		<el-input v-model="searchKey" class="searchInput"></el-input>
		<el-button type="primary" @click="search">查询</el-button>
	</div>
	<stable :column="column, tableData">
		<el-table-column align="center" width="300" slot="operation" label="操作" fixed="right">
			<template slot-scope="scope">
				<el-button size="mini" @click="updateData(scope.row)">编辑</el-button>
				<el-button type="mini" v-if="scope.row.isDelete===0" @click="clock(scope.row.centerId)">锁定</el-button>
				<el-button type="mini" v-else @click="clock(scope.row.centerId)">解锁</el-button>
				<el-button size="mini" type="danger" @click="deletInfo(scope.row.centerId)">删除</el-button>
			</template>
		</el-table-column>
	</stable>
	<el-pagination @current-change='pageChange' class="page" background layout="prev, pager, next" :total="totalRecords">
	</el-pagination>
</div>
</template>

<script type="text/javascript">
	import stable from '@/components/Table/index'
	import qrcode from './components/qrcode'
	import { parseTime } from '@/utils/index'
	import { Message, MessageBox } from 'element-ui'
	import { updateMarketStorage, deleteDistributionCenterById, findDistributionCenterByPage, updateDistributionCenterStatus, updateDistributionCenter } from '@/api/storagetInfo.js'
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
				QRdialogVisible: false,
				code: null,
				column: [
				{ prop: 'centerId', label: 'ID'},
				{ prop: 'centerName', label: '名称'},
				{ prop: 'centerCode', label: '配送中心短码'},
				{ prop: 'centerNum', label: '编号'},
				{ prop: 'createDate', label: '注册时间'},
				{ prop: 'updateDate', label: '修改时间'},
				{ prop: 'isDelete', label: '状态'},
				]
			}
		},

		components:{
			stable,
			qrcode
		},

		methods: {
			init(data){
				findDistributionCenterByPage(data).then(response => {
					console.log(response)
					for (let i = 0, len = response.result.data.length; i < len; i++) {
						response.result.data[i].updateDate = parseTime(response.result.data[i].updateDate)
						response.result.data[i].createDate = parseTime(response.result.data[i].createDate)
					}
					this.tableData = response.result.data;
					this.totalRecords = response.totalRecords;
					this.currentPage = response.currentPage;
				})
			},

			addInfo(){
				this.$router.push({path: '/addStorage/addStorage'})
			},

			pageChange(val){
				var data = {
					currentPage: val,
					index: (val - 1)*10
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
					centerNum: this.form.centerNum,
					centerName: this.form.centerName,
					centerId: this.form.centerId
				}
				updateDistributionCenter(data).then(response => {
					console.log(response);
					this.dialogFormVisible = false;
					this.init();
				})
			},

			deletInfo(id){
				var data = {
					token: this.$store.getters.token,
					centerId: id
				}
				deleteDistributionCenterById(data).then(response => {
					console.log(response)
					this.init({token: this.$store.getters.token})
				})
			},

			clock(id){
				var data = {
					token: this.$store.getters.token,
					centerId: id
				}
				console.log(data)
				updateDistributionCenterStatus(data).then(response => {
					this.init({
						// currentPage: this.currentPage,
						token: this.$store.getters.token
					});
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
					value: this.searchKey,
					token: this.$store.getters.token
				}
				this.init(data)
			}
		},

		created(){
			var data = {
				token: this.$store.getters.token
			}
			this.init(data)
		}
	}
</script>

<style type="text/css" scoped>

</style>