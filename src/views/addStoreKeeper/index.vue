<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="250px">
			<el-form-item label="姓名">
				<el-input v-model="form.storeKeeperName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="所属仓库编号">
				<el-input v-model="form.storageId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="管理员对应openId">
				<el-input v-model="form.openId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="联系邮箱">
				<el-input v-model="form.eMail" class='input'></el-input>
			</el-form-item>
			<el-form-item label="电话号码">
				<el-input v-model="form.phoneNum" class='input'></el-input>
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
	import { addStoreKeeper } from '@/api/storeKeeper.js'
	export default{
		data(){
			return{
				form: {
					storeKeeperName: '',
					storageId: '',
					openId: '',
					eMail: '',
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
				addStoreKeeper(data).then(response => {
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