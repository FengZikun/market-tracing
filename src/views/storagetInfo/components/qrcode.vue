<template>
	<div class="codeImg">
		
	</div>
</template>

<script type="text/javascript">
import QRCode from 'qrcodejs2'
export default{
	data(){
		return{
			qrcode:null
		}
	},

	props: ['code'],

	methods:{
		init(){
			var qrcodeNode=document.getElementsByClassName('codeImg')[0];
			console.log(qrcodeNode)
			qrcodeNode.innerHTML='';
			this.qrcode = new QRCode(qrcodeNode, {
				text: 'https://project.ym-b.top/tracingSys/t/' + this.code,
				width: 200,
				height: 200,
				colorDark: "#000000",
				colorLight: "#ffffff"
			});
		}
	},

	mounted(){
		this.init()
	}
}
</script>

<style type="text/css" scoped>
	.codeImg{
		margin: auto;
		width: 200px;
		height: 200px;
	}
</style>