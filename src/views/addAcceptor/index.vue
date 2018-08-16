<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="250px">
			<el-form-item label="超市id">
				<el-input v-model="form.marketId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="所属仓库id">
				<el-input v-model="form.storageId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="收货员openID">
				<el-input v-model="form.acceptorOpenId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="收货员姓名">
				<el-input v-model="form.marketAcceptorName" class='input'></el-input>
			</el-form-item>
			<el-form-item label="收货员电话号码">
				<el-input v-model="form.phoneNum" class='input'></el-input>
			</el-form-item>
			<el-form-item label="收货员等级">
				<el-input v-model="form.lv" class='input'></el-input>
			</el-form-item>
			<el-form-item label="推荐者openID">
				<el-input v-model="form.fOpenId" class='input'></el-input>
			</el-form-item>
			<el-form-item label="推荐者等级">
				<el-input v-model="form.fLv" class='input'></el-input>
			</el-form-item>
			<el-form-item label="由管理员授权的第一级售货员需绑定">
				<el-input v-model="form.keeperOpenId" class='input'></el-input>
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
	import { addMarketAcceptor } from '@/api/acceptor.js'
	export default{
		data(){
			return{
				form: {
					marketId: '',
					storageId: '',
					acceptorOpenId : '',
					marketAcceptorName: '',
					phoneNum: '',
					lv: '',
					fOpenId: '',
					fLv: '',
					keeperOpenId: ''
				},
			}
		},

		methods:{
			onSubmit(){
				addMarketAcceptor(this.form).then(response => {
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