<template>
	<div class="app-container">
		<el-dialog title="编辑" v-if="dialogFormVisible" :visible.sync="dialogFormVisible">
			<el-form ref="form" :model="form">
				<el-form-item label="供应商名称" :label-width="formLabelWidth">
					<el-input v-model="form.supplierName"></el-input>
				</el-form-item>
				<el-form-item label="供应商电话" :label-width="formLabelWidth">
					<el-input v-model="form.phoneNum"></el-input>
				</el-form-item>
				<el-form-item label="供应商编号" :label-width="formLabelWidth">
					<el-input v-model="form.supplierId"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateDataConfirm">确 定</el-button>
			</div>
		</el-dialog>
		<!-- <el-button type="primary" @click='dialogVisible = true'>生成授权码</el-button> -->
		<el-button type="primary" @click='addProvider'>添加供应商</el-button>
		<el-select v-model="searchValue" filterable clearable placeholder="请选择">
			<el-option v-for="item in column" :key="item.prop" :label="item.label" :value="item.prop"></el-option>
		</el-select>
		<el-input v-model="searchKey" class="searchInput"></el-input>
		<el-button type="primary" @click="search">查询</el-button>
		<el-dialog
		title="授权码"
		:visible.sync="dialogVisible"
		center
		width="30%">
		<qrcode></qrcode>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		</span>
	</el-dialog>
	<stable :column="column, tableData">
		<el-table-column align="center" width="220" slot="operation" label="操作" fixed="right">
			<template slot-scope="scope">
				<el-button size="mini" @click="updateData(scope.row)">编辑</el-button>
				<el-button type="mini" v-if="scope.row.isDelete===0" @click="clock(scope.row.id)">锁定</el-button>
				<el-button type="mini" v-else @click="clock(scope.row.id)">解锁</el-button>
				<el-button size="mini" type="danger" @click="deletInfo(scope.row.id)">删除</el-button>
			</template>
		</el-table-column>
	</stable>
	<el-pagination @current-change='pageChange' class="page" background layout="prev, pager, next" :total="totalRecords">
	</el-pagination>

</div>
</template>

<script type="text/javascript">
	import { addMarketSupplierUser, findMarketSupplierUserByPage, updateMarketSupplierUser, deleteMarketSupplierUserById, updateMarketSupplierUserStatus } from '@/api/provider.js'
	import QRCode from 'qrcodejs2'
	import qrcode from './components/qrcode'
	import router from '@/router/index'
	import stable from '@/components/Table/index'
	import { Message, MessageBox } from 'element-ui'


	export default{
		data(){
			return{
				qrcode:null,
				tableData: null,
				searchKey: null,
				searchValue: null,
				totalRecords: null,
				formLabelWidth: '120px',
				form: null,
				dialogFormVisible: false,
				dialogVisible: false,
				column: [
				{ prop: 'id', label: '供应商本地id'},
				{ prop: 'supplierId', label: '上级系统指定ID'},
				{ prop: 'supplierName', label: '供货商名称'},
				{ prop: 'createDate', label: '创建时间'},
				{ prop: 'phoneNum', label: '供货商电话号码'},
				{ prop: 'supplierCode', label: '供货商短码'},
				{ prop: 'isDelete', label: '状态'}
				]
			}
		},

		components:{
			qrcode,
			stable
		},

		methods:{
			init(data){
				findMarketSupplierUserByPage(data).then(response => {
					console.log(response)
					this.tableData = response.result.data;
					this.totalRecords = response.totalRecords;
					this.currentPage = response.currentPage;
				})
			},

			handleClick(row){
				console.log(row)
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
				}
				data = Object.assign(data, this.form);
				delete data.supplierCode;
				delete data.createDate;
				delete data.isDelete;
				updateMarketSupplierUser(data).then(response => {
					console.log(response);
					this.dialogFormVisible = false;
					this.init({currentPage: this.currentPage});
				})
			},

			deletInfo(id){
				var data = {
					token: this.$store.getters.token,
					id: id
				}
				deleteMarketSupplierUserById(data).then(response => {
					console.log(response)
					this.init({currentPage: this.currentPage})
				})
			},

			clock(id){
				var data = {
					token: this.$store.getters.token,
					id: id
				}
				console.log(data)
				updateMarketSupplierUserStatus(data).then(response => {
					this.init({currentPage: this.currentPage});
				})
			},

			open(){
				let html = `<div><qrcode></qrcode></div>`;
				this.$alert(html, '授权码', {
					dangerouslyUseHTMLString: true,
					center: true
				});
			// this.qrCode();
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
		},

		qrCode(){
			var qrcodeNode=document.getElementsByClassName('codeImg')[0];
			qrcodeNode.innerHTML='';
			self.qrcode = new QRCode(qrcodeNode, {
				text: 'code',
				width: 200,
				height: 200,
				colorDark: "#000000",
				colorLight: "#ffffff"
			});
		},

		addProvider(){
			router.push({path: 'addProvider'})
		}
	},

	created(){
		this.init()
	}
}
</script>

<style type="text/css" scoped="">
.table,
.top{
	width: 95%;
	margin: 20px auto;
}
</style>