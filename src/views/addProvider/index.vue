<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="250px">
			<el-form-item label="供货商名称">
				<el-input v-model="form.supplierName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="供货商电话号码">
				<el-input v-model="form.phoneNum" class='input'></el-input>
			</el-form-item>
			<el-form-item label="上级系统指定ID">
				<el-input v-model="form.supplierId" class='input'></el-input>
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
	import { addMarketSupplierUser } from '@/api/provider.js'
	export default{
		data(){
			return{
				form: {
					supplierId: '',
					supplierName: '',
					phoneNum: ''
				},
			}
		},

		methods:{
			onSubmit(){
				var data = {
					token: this.$store.getters.token,
				}
				data = Object.assign(data, this.form);
				addMarketSupplierUser(data).then(response => {
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