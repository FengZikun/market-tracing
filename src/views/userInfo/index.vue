<template>
	<div class="app-container">
		个人中心
	</div>
</template>

<script type="text/javascript">
	import { findSingleUserByToken } from '@/api/SysUser.js'
	export default {
		data () {
			return {

			}
		},

		methods: {
			init () {
				let role = sessionStorage.getItem('SET_ROLES');
				console.log(role)
				findSingleUserByToken({
					token: this.$store.getters.token
				}).then(response => {
					console.log(response)
				})
			}
		},

		created () {
			this.init()
		}
	}
</script>

<style scoped>
	
</style>