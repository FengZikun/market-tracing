<template>
	<div>
		pie
		<div id="pie">
			
		</div>
	</div>
</template>

<script type="text/javascript">
	var echarts = require('echarts/lib/echarts');
	require("echarts/lib/chart/pie");
	export default{
		data(){
			return{

			}
		},

		methods:{
			init(){
				this.myChart = echarts.init(this.$el)
			}
		},

		mounted(){
			this.init();
		}
	}
</script>