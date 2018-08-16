<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model="form.userName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.passwd" class='input'></el-input>
			</el-form-item>
			<el-form-item label="员工编号">
				<el-input v-model="form.innerNum" class='input'></el-input>
			</el-form-item>
			<el-form-item label="电话">
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
	import { addTracingSysUser } from '@/api/SysUser.js'
	export default{
		data(){
			return{
				form: {
					userName: '',
					passwd: '',
					innerNum : '',
					phoneNum: null
				}
			}
		},

		methods:{
			onSubmit(){
				let data = this.form;
				data.token = this.$store.getters.token;
				addTracingSysUser(data).then(response => {
					var res = response;
					console.log(response);
					if (res.errorCode === 0) {
						Message({
							message: res.msg,
							type: 'success',
							duration: 5 * 1000
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