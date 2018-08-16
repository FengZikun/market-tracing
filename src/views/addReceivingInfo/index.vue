<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="250px">
			<el-form-item label="团体消费单位编码">
				<el-input v-model="form.teamConsumeId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="团体消费单位名称">
				<el-input v-model="form.teamConsumeName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="供应商编码">
				<el-input v-model="form.supplierId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="供应商名称">
				<el-input v-model="form.supplierName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="交易凭证号或零售凭证号">
				<el-input v-model="form.tranId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="商品编码">
				<el-input v-model="form.goodsCode" class='input'></el-input>
			</el-form-item>
			<el-form-item label="商品名称">
				<el-input v-model="form.goodsName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="重量">
				<el-input v-model="form.weight" class='input'></el-input>
			</el-form-item>
			<el-form-item label="单价">
				<el-input v-model="form.price" class='input'></el-input>
			</el-form-item>
			<el-form-item label="供货批发市场或屠宰企业编码">
				<el-input v-model="form.WS_SUPPLIER_ID" class='input'></el-input>
			</el-form-item>
			<el-form-item label="供货批发市场或屠宰企业名称">
				<el-input v-model="form.WS_SUPPLIER_NAME" class='input'></el-input>
			</el-form-item>
			<el-form-item label="品类">
				<el-input v-model="form.categoryId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="节点">
				<el-input v-model="form.nodeType" class='input'></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	import { Message, MessageBox } from 'element-ui'
	import { addTeamBuyAcceptanceInfo } from '@/api/ReceivingInfoList.js'
	export default{
		data(){
			return{
				form: {
					teamConsumeId : "",
					teamConsumeName : "",
					supplierId : "", 
					supplierName : "", 
					tranId : "", 
					goodsCode : "",
					goodsName : "", 
					weight : null, 
					price : null, 
					WS_SUPPLIER_ID : "",  
					WS_SUPPLIER_NAME : "",     
					categoryId : "",  
					nodeType : "" 
				},
			}
		},

		methods:{
			onSubmit(){
				var data = {
					token: this.$store.getters.token,
				}
				data = Object.assign(data, this.form);
				addTeamBuyAcceptanceInfo(data).then(response => {
					var res = response;
					if (res.errorCode === 0) {
						Message({
							message: res.msg,
							type: 'success',
							duration: 5 * 1000
						})
						this.$router.go(-1)
					}	
				})
			}
		}
	}
</script>

<style type="text/css" scoped>
.input{
	width: 180px;
}
</style>