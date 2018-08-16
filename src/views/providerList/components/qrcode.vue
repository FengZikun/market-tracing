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

	methods:{
		init(){
			var qrcodeNode=document.getElementsByClassName('codeImg')[0];
			console.log(qrcodeNode)
			qrcodeNode.innerHTML='';
			self.qrcode = new QRCode(qrcodeNode, {
				text: 'code',
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