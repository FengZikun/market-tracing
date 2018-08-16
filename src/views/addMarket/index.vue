<template>
	<div class="app-container">
		<el-form ref="form" :model="form" :rules='rules' label-width="250px">
			<el-form-item label="登录名" prop='userName'>
				<el-input v-model="form.userName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="登录密码" prop='passwd'>
				<el-input v-model="form.passwd" class='input'></el-input>
			</el-form-item>
			<el-form-item label="用户类型">
				<el-input v-model="form.userType" class='input'></el-input>
			</el-form-item>
			<el-form-item label="超市名">
				<el-input v-model="form.marketName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="超市地址">
				<el-input v-model="form.marketLocation" class='input'></el-input>
			</el-form-item>
			<el-form-item label=" 员工姓名">
				<el-input v-model="form.marketUserName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="用户手机号">
				<el-input v-model="form.phoneNum" class='input'></el-input>
			</el-form-item>
			<el-form-item label="超市员工编">
				<el-input v-model="form.innerNum" class='input'></el-input>
			</el-form-item>
			<el-form-item label="用户类型">
				<el-input v-model="form.userType" class='input'></el-input>
			</el-form-item>
			<el-form-item label="超市用户名">
				<el-input v-model="form.marketUserName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="组织机构代码证">
				<el-input v-model="form.compId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="工商注册证编号或身份证">
				<el-input v-model="form.regId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="经营类型">
				<el-input v-model="form.nodeType" class='input'></el-input>
			</el-form-item>
			<el-form-item label="所属区域">
				<el-input v-model="form.area" class='input'></el-input>
			</el-form-item>
			<el-form-item label="企业法人代表">
				<el-input v-model="form.legalRepresent" class='input'></el-input>
			</el-form-item>
			<el-form-item label="经营地址">
				<el-input v-model="form.addr" class='input'></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script type="text/javascript">
	import { Message, MessageBox } from 'element-ui'
	import { registerMarketUser } from '@/api/marketInfo.js'
	export default{
		data(){
			return{
				form: {
					userName: 'market1',
					passwd: '12345678',
					userType: 3,
					marketName: '12345678',
					marketLocation: '12345678',
					marketUserName: '12345678',
					phoneNum: '12345678',
					innerNum: '12345678',
					userType: '12345678',
					marketUserName: '12345678',
					compId: '12345678',
					regId: '12345678',
					nodeType: '12345678',
					area: '12345678',
					legalRepresent: '12345678',
					addr: '12345678'
				},
				rules: {
					userName: [
					{ required: true, message: '请输入登录名', trigger: 'blur' }
					],
					passwd: [
					{ required: true, message: '请设置登陆密码', trigger: 'blur'},
					{ min: 8, message: '密码长度至少为8位', trigger: 'blur'}
					],
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
						var data = {
							token: this.$store.getters.token,
						}
						data = Object.assign(data, this.form);
						registerMarketUser(data).then(response => {
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