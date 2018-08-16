<template>
	<div class="app-container">
		<el-dialog title="编辑" v-if="dialogFormVisible" :visible.sync="dialogFormVisible">
			<el-form ref="form" :model="form">
				<el-form-item label="进货id" :label-width="formLabelWidth">
					<el-input v-model="form.id" disabled></el-input>
				</el-form-item>
				<el-form-item label="进货批次号" :label-width="formLabelWidth">
					<el-input v-model="form.bachId"></el-input>
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
				<el-form-item label="产地编码" :label-width="formLabelWidth">
					<el-input v-model="form.areaOriginId"></el-input>
				</el-form-item>
				<el-form-item label="产地名称" :label-width="formLabelWidth">
					<el-input v-model="form.areaOriginName"></el-input>
				</el-form-item>
				<el-form-item label="批发市场编码" :label-width="formLabelWidth">
					<el-input v-model="form.marketCode"></el-input>
				</el-form-item>
				<el-form-item label="批发市场名称" :label-width="formLabelWidth">
					<el-input v-model="form.marketName"></el-input>
				</el-form-item>
				<el-form-item label="供货批发市场或屠宰企业编码" :label-width="formLabelWidth">
					<el-input v-model="form.WS_SUPPLIER_ID"></el-input>
				</el-form-item>
				<el-form-item label="供货批发市场或屠宰企业名称" :label-width="formLabelWidth">
					<el-input v-model="form.WS_SUPPLIER_NAME"></el-input>
				</el-form-item>
				<el-form-item label="零售凭证号" :label-width="formLabelWidth">
					<el-input v-model="form.saleTranId"></el-input>
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
			<el-button type="primary" @click='addInfo'>新建进货单</el-button>
			<el-select v-model="searchValue" filterable clearable placeholder="请选择">
				<el-option v-for="item in column" :key="item.prop" :label="item.label" :value="item.prop"></el-option>
			</el-select>
			<el-input v-model="searchKey" class="searchInput"></el-input>
			<el-button type="primary" @click="search">查询</el-button>
		</div>
		<stable :column="column, tableData">
			<el-table-column align="center" width="280" slot="operation" label="操作" fixed="right">
				<template slot-scope="scope">
					<el-button size="mini" @click="updateData(scope.row)">编辑</el-button>
					<el-button size="mini" @click="tracingCode(scope.row.id)">生成二维码</el-button>
					<el-button size="mini" type="danger" @click="deleteInfo(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</stable>
		<el-pagination @current-change='pageChange' class="page" background layout="prev, pager, next" :total="totalRecords">
		</el-pagination>
	</div>
</template>

<script type="text/javascript">
	import { Message } from 'element-ui'
	import stable from '@/components/Table/index'
	import { findSuperMarketInInfoByPage, deleteTeamBuyAcceptanceInfoById, updateSuperMarketInInfo, createTracingCode } from '@/api/AcceptanceInfoList.js'
	export default{
	  data() {
	    return {
	      tableData: null,
	      searchKey: null,
	      searchValue: null,
		totalRecords: null,
		formLabelWidth: '120px',
		form: null,
		dialogFormVisible: false,
		column:[
		{
			prop:'id',
			label:'进货ID'
		},
		{
			prop:'tranId',
			label:'交易凭证'
		},
		{
			prop:'quarantineAnimalProductId',
			label:'检验合格证号'
		},
		{
			prop:'bachId',
			label:'进货批次号'
		},
		{
			prop:'goodsCode',
			label:'商品编码'
		},
		{
			prop:'goodsName',
			label:'商品名称'
		},
		{
			prop:'weight',
			label:'重量'
		},
		{
			prop:'price',
			label:'单价'
		},
		{
			prop:'areaOriginId',
			label:'产地编码'
		},
		{
			prop:'areaOriginName',
			label:'产地名称'
		},
		{
			prop:'marketCode',
			label:'批发市场编码'
		},
		{
			prop:'marketName',
			label:'批发市场名称'
		},
		{
			prop:'WS_SUPPLIER_ID',
			label:'供货批发市场或屠宰企业编码'
		},
		{
			prop:'WS_SUPPLIER_NAME',
			label:'供货批发市场或屠宰企业名称'
		},
		{
			prop:'saleTranId',
			label:'零售凭证号'
		},
		{
			prop:'categoryId',
			label:'品类'
		},
		{
			prop:'nodeType',
			label:'节点'
		},
		{
			prop:'infoUpdateDate',
			label:'信息更新日期'
		},
		{
			prop:'reportTime',
			label:'信息传送时间'
		}
		]
	}
},

		components:{
			stable
		},

		methods:{
			init(data){
				findSuperMarketInInfoByPage(data).then(response => {
					console.log(response)
					this.tableData = response.result.data;
					this.totalRecords = response.totalRecords;
					this.currentPage = response.currentPage;
				})
			},

			pageChange(val){
				var data = {
					currentPage: val,
					index: (val - 1)*10
				}
				this.init(data)
			},

			deleteInfo(id){
				deleteTeamBuyAcceptanceInfoById(id).then(response => {
					console.log(response);
					this.init();
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
				}
				data = Object.assign(data, this.form);
				delete data.infoUpdateDate;
				delete data.reportTime;
				updateSuperMarketInInfo(data).then(response => {
					console.log(response);
					this.dialogFormVisible = false;
					this.init();
				})
			},

			addInfo(){
				this.$router.push({path: '/addBuyer/addBuyer'})
			},

			tracingCode(id){
				createTracingCode({inInfoId: id}).then(response => {
					Message({
						message: response.msg,
						duration: 2 * 1000
					})
					return
				})
			},

    search() {
	      if (this.searchprop === null) {
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
				this.init (data)
			}
		},

		created(){
			this.init()
			// var a = ["01211", "马铃薯", "土豆一级", "279727", "01234026", "蒜薹", "蒜薹(绿头)", "285620", "01234026", "蒜薹", "蒜薹(红头)", "285619", "01234015", "洋葱", "黄皮洋葱", "279702", "01232402", "胡萝卜", "胡萝卜", "279731", "01233402", "茄子", "紫线茄（SC)", "261774", "01232207", "苋菜", "紫苋菜（SC)", "261682", "01213011", "马铃薯", "紫土豆（SC)", "261809", "01241055", "山芋（紫薯）", "紫薯（ZC）", "251836", "01233399", "茄王", "紫茄王（ZC）", "251858", "01233012", "花椰菜", "紫菜花（SC)", "261725", "01232218", "紫背天葵", "紫背天葵（SC)", "261686", "01234201", "竹笋", "竹笋（ZC）", "251845", "01234201", "竹笋", "竹笋（SC)", "261827", "01236022", "鱼腥草", "鱼腥草（SC)", "261712", "01232235", "油麦菜", "油麦菜（SC)", "261676", "", "/", "雪皮菜（SC)", "261719", "01233211", "雪里红", "雪里红（SC)", "261695", "01237055", "杏鲍菇", "杏鲍菇（ZC）", "251868", "01237060", "蟹味菇", "蟹味菇（ZC）", "251867", "01232301", "西芹", "小西芹（SC)", "261708", "01232012", "白菜", "小青菜（SC)", "261674", "01231205", "西葫芦", "香蕉西葫芦（SC)", "261798", "01234105", "细香葱", "香葱（SC)", "261853", "01232208", "香菜", "香菜（SC)", "261704", "01233411", "青尖椒", "线椒（ZC）", "251862", "01237101", "鲜黑木耳", "鲜木耳（SC)", "261882", "", "/", "鲜当归（SC)", "261844", "01232301", "西芹", "西芹（SC)", "261700", "01232212", "茼蒿", "茼蒿（SC)", "261690", "", "/", "铁莲（SC)", "261842", "01241013", "山药", "铁棍山药（ZC）", "298666", "01231105", "甜豆", "甜豆（ZC）", "251856", "01231105", "甜豆", "甜豆（SC)", "261763", "01232233", "甜荬菜", "甜菜（SC)", "261716", "01232399", "其他绿叶蔬菜", "田七（SC)", "261720", "01232399", "其他绿叶蔬菜", "苔菜（SC)", "261689", "01231204", "笋瓜", "笋瓜（ZC）", "251833", "01234026", "蒜苗", "蒜苗（SC)", "261850", "01231208", "丝瓜", "丝瓜（ZC）", "251831", "01232012", "白菜", "上海青", "264564", "01241013", "山药", "山药豆（SC)", "261828", "01241013", "山药", "山药（ZC）", "251837", "01233403", "辣椒", "青线椒（SC)", "261732", "01232202", "芹菜", "芹菜（ZC）", "251844", "01232202", "芹菜", "芹菜（SC)", "261680", "01232213", "荠菜", "荠荠菜（SC)", "261687", "01237059", "平菇", "平菇（ZC）", "251866", "01232408", "牛蒡", "牛蒡（ZC）", "251847", "01232408", "牛蒡", "牛蒡（SC)", "261832", "01232399", "其他绿叶蔬菜", "泥蒿（SC)", "261683", "01233416", "小米椒", "米椒（SC)", "261738", "01213011", "马铃薯", "迷你土豆（SC)", "261811"]

			// var arr = []
			// for(var i = 1; i < a.length+1; i+=4){
			// 	var obj = {}
			// 	obj["国标码"] = a[i];
			// 	obj["国标名称"] = a[i+1];
			// 	obj["华润商品名称"] = a[i+2];
			// 	obj["PLU码"] = a[i+3];
			// 	arr.push(obj)
			// }
			// console.log(arr)
			// this.tableData = arr
		}
	}
</script>

<style type="text/css" scoped>
.search{
	margin: 20px 0;
}
.searchInput{
	width: 180px;
}
</style>