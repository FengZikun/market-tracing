<template>
	<div class="app-container">
		<el-dialog title="编辑" v-if="dialogFormVisible" :visible.sync="dialogFormVisible">
			<el-form ref="form" :model="form">
				<el-form-item label="收货id" :label-width="formLabelWidth">
					<el-input v-model="form.id" disabled></el-input>
				</el-form-item>
				<el-form-item label="交易凭证号或零售凭证号" :label-width="formLabelWidth">
					<el-input v-model="form.tranId"></el-input>
				</el-form-item>
				<el-form-item label="供货批发市场或屠宰企业编码" :label-width="formLabelWidth">
					<el-input v-model="form.WS_SUPPLIER_ID"></el-input>
				</el-form-item>
				<el-form-item label="供货批发市场或屠宰企业名称" :label-width="formLabelWidth">
					<el-input v-model="form.WS_SUPPLIER_NAME"></el-input>
				</el-form-item>
				<el-form-item label="商品编码" :label-width="formLabelWidth">
					<el-input v-model="form.goodsCode"></el-input>
				</el-form-item>
				<el-form-item label="商品名称" :label-width="formLabelWidth">
					<el-input v-model="form.goodsName"></el-input>
				</el-form-item>
				<el-form-item label="重量" :label-width="formLabelWidth">
					<el-input v-model="form.weight"></el-input>
				</el-form-item>
				<el-form-item label="单价" :label-width="formLabelWidth">
					<el-input v-model="form.price"></el-input>
				</el-form-item>
				<el-form-item label="供应商编码" :label-width="formLabelWidth">
					<el-input v-model="form.supplierId"></el-input>
				</el-form-item>
				<el-form-item label="供应商名称" :label-width="formLabelWidth">
					<el-input v-model="form.supplierName"></el-input>
				</el-form-item>
				<el-form-item label="团体消费单位编码" :label-width="formLabelWidth">
					<el-input v-model="form.teamConsumeId"></el-input>
				</el-form-item>
				<el-form-item label="团体消费单位名称" :label-width="formLabelWidth">
					<el-input v-model="form.teamConsumeName"></el-input>
				</el-form-item>
				<el-form-item label="品类" :label-width="formLabelWidth">
					<el-input v-model="form.categoryId"></el-input>
				</el-form-item>
				<el-form-item label="节点" :label-width="formLabelWidth">
					<el-input v-model="form.nodeType"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateDataConfirm">确 定</el-button>
			</div>
		</el-dialog>
		<div class="search">
			<el-button type="primary" @click='addInfo'>新建收货单</el-button>
			<el-select v-model="searchValue" filterable clearable placeholder="请选择">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
			</el-select>
			<el-input v-model="searchKey" class="searchInput"></el-input>
			<el-button type="primary" @click="search">查询</el-button>
		</div>
		<el-table :data="tableData" border>
			<el-table-column fixed width="80" prop="id" label="收货id"></el-table-column>
			<el-table-column prop="teamConsumeId" label="团体消费单位编码"></el-table-column>
			<el-table-column prop="teamConsumeName" label="团体消费单位名称"></el-table-column>
			<el-table-column prop="inDate" label="进货日期"></el-table-column>
			<el-table-column prop="supplierId" label="供应商编码"></el-table-column>
			<el-table-column prop="supplierName" label="供应商名称"></el-table-column>
			<el-table-column prop="tranId" label=" 交易凭证号或零售凭证号"></el-table-column>
			<el-table-column prop="goodsCode" label="商品编码"></el-table-column>
			<el-table-column prop="goodsName" label="商品名称"></el-table-column>
			<el-table-column prop="weight" label="重量"></el-table-column>
			<el-table-column prop="price" label="单价"></el-table-column>
			<el-table-column prop="WS_SUPPLIER_ID" label="供货批发市场或屠宰企业编码"></el-table-column>
			<el-table-column prop="WS_SUPPLIER_NAME" label="供货批发市场或屠宰企业名称"></el-table-column>
			<el-table-column prop="categoryId" label="品类"></el-table-column>
			<el-table-column prop="nodeType" label="节点"></el-table-column>
			<el-table-column prop="infoUpdateDate" label="信息更新日期"></el-table-column>
			<el-table-column prop="reportTime" label="信息传送时间"></el-table-column>
			<el-table-column align="center" fixed="right" width="160" label = "操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="updateData(scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="deletInfo(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @current-change='pageChange' class="page" background layout="prev, pager, next" :total="totalRecords">
		</el-pagination>
	</div>
</template>

<script type="text/javascript">
	import { findTeamBuyAcceptanceInfoByPage, deleteTeamBuyAcceptanceInfoById, updateTeamBuyAcceptanceInfo, addTeamBuyAcceptanceInfo } from '@/api/ReceivingInfoList'
	import { Message, MessageBox } from 'element-ui'
	export default{
		data(){
			return{
				currentPage: 1,
				index: 0,
				tableData: null,
				searchValue: null,
				searchKey: null,
				totalRecords: null,
				dialogFormVisible: false,
				form: null,
				formLabelWidth: '120px',
				options: [
				{ value: 'id', label: '收货id' },
				{ value: 'teamConsumeId', label: '团体消费单位编码' },
				{ value: 'teamConsumeName', label: '团体消费单位名称' },
				{ value: 'inDate', label: '进货日期' },
				{ value: 'supplierId', label: '供应商编码' },
				{ value: 'supplierName', label: '供应商名称' },
				{ value: 'tranId', label: '交易凭证号或零售凭证号' },
				{ value: 'goodsCode', label: '商品编码' },
				{ value: 'goodsName', label: '商品名称' },
				{ value: 'weight', label: '重量' },
				{ value: 'price', label: '单价' },
				{ value: 'WS_SUPPLIER_ID', label: '供货批发市场或屠宰企业编码' },
				{ value: 'WS_SUPPLIER_NAME', label: '供货批发市场或屠宰企业名称' },
				{ value: 'categoryId', label: '品类' },
				{ value: 'nodeType', label: '节点' },
				{ value: 'infoUpdateDate', label: '信息更新日期' },
				{ value: 'reportTime', label: '信息传送时间' },
				]
			}
		},

		methods: {
			init(data){
				findTeamBuyAcceptanceInfoByPage(data).then(response => {
					console.log(response)
					this.tableData = response.result.data;
					this.totalRecords = response.totalRecords;
					this.currentPage = response.currentPage
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
				console.log(data)
				this.init(data)
			},

			pageChange(val){
				this.currentPage = val;
				this.index = (this.currentPage - 1)*10;
				this.init();
			},

			deletInfo(id){
				var data = {
					token: this.$store.getters.token,
					id: id
				}
				deleteTeamBuyAcceptanceInfoById(data).then(response => {
					console.log(response)
					this.init()
				})
			},

			updateData(data){
				this.dialogFormVisible = true;
				this.form = data;
				console.log(this.form)
			},

			updateDataConfirm(){
				var data = {
					token: this.$store.getters.token,
					id: this.form.id
				}
				data = Object.assign(data, this.form);
				delete data.infoUpdateDate;
				delete data.reportTime;
				delete data.inDate
				console.log(data);
				updateTeamBuyAcceptanceInfo(data).then(response => {
					console.log(response);
					this.dialogFormVisible = false;
					this.init();
				})
			},

			addInfo(){
				this.$router.push({path: '/addReceivingInfo/addReceivingInfo'})
			}
		},

		created(){
			var data = {
				currentPage: this.currentPage,
				index: this.index
			}
			this.init(data)
		}

		
	}
</script>

<style type="text/css" scoped>
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