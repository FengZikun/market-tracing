<template>
	<div class="app-container">
		<el-form ref="form" :model="form" :rules="rules" label-width="250px">
			<el-form-item prop="userName" label="登录名">
				<el-input v-model="form.userName" class='input'></el-input>
			</el-form-item>
			<el-form-item prop="phoneNum" label="电话">
				<el-input v-model="form.phoneNum" class='input'></el-input>
			</el-form-item>
			<el-form-item prop="passwd" label="密码">
				<el-input v-model="form.passwd" class='input'></el-input>
			</el-form-item>
			<el-form-item prop="centerNum" label="配送中心编号">
				<el-input v-model="form.centerNum" class='input'></el-input>
			</el-form-item>
			<el-form-item prop="eMail" label="配送中心邮箱">
				<el-input v-model="form.eMail" class='input'></el-input>
			</el-form-item>
			<el-form-item prop="centerUserName" label="员工姓名">
				<el-input v-model="form.centerUserName" class='input'></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
				<el-button @click="back">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	import { Message, MessageBox } from 'element-ui'
	import { registerCenterCommonUser } from '@/api/SysUser.js'

	export default{
		data(){
			return{
				form: {
					userName: 'storageadmin1',
					phoneNum: '13697343460',
					passwd: '12345678',
					centerName: '12345678',
					centerNum: '12345678',
					eMail: '12345678',
					centerUserName: 'TT'
				},



				rules: {
					userName: [
					{ required: true, message: '请输入', trigger: 'blur'}
					],
					phoneNum: [
					{ required: true, message: '请输入', trigger: 'blur'}
					],
					passwd: [
					{ required: true, message: '请输入', trigger: 'blur'}
					],
					centerName: [
					{ required: true, message: '请输入', trigger: 'blur'}
					],
					centerNum: [
					{ required: true, message: '请输入', trigger: 'blur'}
					],
					eMail: [
					{ required: true, message: '请输入', trigger: 'blur'}
					],
					centerId: [
					{ required: true, message: '请输入', trigger: 'blur'}
					],
					centerUserName: [
					{ required: true, message: '请输入', trigger: 'blur'}
					]
				}
			}
		},

		methods:{
			onSubmit(formName){
				this.$refs[formName].validate((valid) => {
					if (!valid) {
						Message({
							message: '请完善信息',
							type: 'warning',
							duration: 5 * 1000
						})
					} else {
						let data = this.form;
						data.token = this.$store.getters.token;
						data.centerId = parseInt(sessionStorage.getItem('SET_CENTERID'));
						data.centerName = sessionStorage.getItem('SET_CENTERNAME');
						console.log(data)
						// registerCenterCommonUser(data).then(response => {
						// 	var res = response;
						// 	console.log(response);
						// 	if (res.errorCode === 0) {
						// 		Message({
						// 			message: res.msg,
						// 			type: 'success',
						// 			duration: 5 * 1000
						// 		})
						// 		this.$router.go(-1)

						// 	}	
						// })
					}
				})
				
			},

			back () {
				this.$router.go(-1)
			}
		}
	}
</script>

<style type="text/css" scoped>
.input{
	width: 180px;
}
</style>