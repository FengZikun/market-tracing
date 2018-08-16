<template>
	<div class="app-container">
		<el-form ref="form" :model="form" :rules='rules' label-width="250px">
			<el-form-item prop='userName' label="登录名">
				<el-input v-model="form.userName" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='passwd' label="登录密码">
				<el-input v-model="form.passwd" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='centerName' label="配送中心名称">
				<el-input v-model="form.centerName" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='centerNum' label="配送中心顺企编码">
				<el-input v-model="form.centerNum" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='eMail' label="邮箱">
				<el-input v-model="form.eMail" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='innerNum' label="配送中心节点编号">
				<el-input v-model="form.innerNum" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='phoneNum' label="负责人电话">
				<el-input v-model="form.phoneNum" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='centerUserName' label="负责人姓名">
				<el-input v-model="form.centerUserName" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='compId' label="组织机构代码证(企业信息)">
				<el-input v-model="form.compId" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='regId' label="工商注册证编号或身份证号">
				<el-input v-model="form.regId" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='nodeType' label="经营类型">
				<el-input v-model="form.nodeType" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='area' label="所属区域">
				<el-input v-model="form.area" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='legalRepresent' label="企业法人代表">
				<el-input v-model="form.legalRepresent" class='input'></el-input>
			</el-form-item>
			<el-form-item prop='addr' label="经营地址">
				<el-input v-model="form.addr" class='input'></el-input>
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
	import { registerCenterUser } from '@/api/storagetInfo.js'
	export default{
		data(){
			return{
				form: {
					userName: 'storage1',
					passwd: '12345678',
					centerName: '12345678',
					centerNum: '12345678',
					eMail: '12345678',
					innerNum: '12345678',
					phoneNum: '12345678',
					centerUserName: '12345678',
					compId: '12345678',
					regId: '12345678',
					nodeType: '12345678',
					area: '12345678',
					legalRepresent: '12345678',
					addr: '12345678',
					userType: 2
				},

				rules: {
					userName: [
					{ required: true, message: '请输入登录名', trigger: 'blur'}
					],
					passwd: [
					{ required: true, message: '请输入登录密码', trigger: 'blur'}
					],
					centerName: [
					{ required: true, message: '请输入配送中心名称', trigger: 'blur'}
					],
					centerNum: [
					{ required: true, message: '请输入配送中心顺企编码', trigger: 'blur'}
					],
					eMail: [
					{ required: true, message: '请输入邮箱', trigger: 'blur'}
					],
					innerNum: [
					{ required: true, message: '请输入配送中心节点编号', trigger: 'blur'}
					],
					phoneNum: [
					{ required: true, message: '请输入负责人电话', trigger: 'blur'}
					],
					centerUserName: [
					{ required: true, message: '请输入负责人姓名', trigger: 'blur'}
					],
					compId: [
					{ required: true, message: '请输入组织机构代码证', trigger: 'blur'}
					],
					regId: [
					{ required: true, message: '请输入工商注册证编号或身份证号', trigger: 'blur'}
					],
					nodeType: [
					{ required: true, message: '请输入经营类型', trigger: 'blur'}
					],
					area: [
					{ required: true, message: '请输入所属区域', trigger: 'blur'}
					],
					legalRepresent: [
					{ required: true, message: '请输入企业法人代表', trigger: 'blur'}
					],
					addr: [
					{ required: true, message: '请输入经营地址', trigger: 'blur'}
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
						registerCenterUser(data).then(response => {
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
			},

			back () {
				this.$router.go(-1);
			}
		}
	}
</script>

<style type="text/css" scoped>
.input{
	width: 180px;
}
</style>