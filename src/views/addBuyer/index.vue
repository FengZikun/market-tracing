<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="250px">
			<el-form-item label="交易凭证">
				<el-input v-model="form.tranId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="动物产品检疫合格证号或肉品品质检验合格证号">
				<el-input v-model="form.quarantineAnimalProductId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="进货批次号">
				<el-input v-model="form.bachId" class='input'></el-input>
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
			<el-form-item label="产地编码">
				<el-input v-model="form.areaOriginId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="产地名称">
				<el-input v-model="form.areaOriginName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="批发市场编码">
				<el-input v-model="form.marketCode" class='input'></el-input>
			</el-form-item>
			<el-form-item label="批发市场名称">
				<el-input v-model="form.marketName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="供货批发市场或屠宰企业编码">
				<el-input v-model="form.WS_SUPPLIER_ID" class='input'></el-input>
			</el-form-item>
			<el-form-item label="供货批发市场或屠宰企业名称">
				<el-input v-model="form.WS_SUPPLIER_NAME" class='input'></el-input>
			</el-form-item>
			<el-form-item label="零售凭证号">
				<el-input v-model="form.saleTranId" class='input'></el-input>
			</el-form-item>
			<el-form-item label=" 品类">
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
	import { addSuperMarketInInfo } from '@/api/AcceptanceInfoList.js'
	export default{
		data(){
			return{
				form: {
					tranId: '',
					quarantineAnimalProductId: '',
					bachId : '',
					goodsCode: '',
					goodsName: '',
					weight: '',
					price: '',
					areaOriginId: '',
					areaOriginName: '',
					marketCode: '',
					marketName: '',
					WS_SUPPLIER_ID: '',
					WS_SUPPLIER_NAME: '',
					saleTranId: '',
					categoryId: '',
					nodeType: ''
				},
			}
		},

		methods:{
			onSubmit(){
				addSuperMarketInInfo(this.form).then(response => {
					var res = response;
					console.log(response);
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