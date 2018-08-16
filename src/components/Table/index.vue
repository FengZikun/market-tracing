<template>
	<div>
		<slot v-if="slot" name="button">
			
		</slot>
		<el-table border :data="tableData" style="margin-top: 20px;" :row-class-name="tableRowClassName">
			<template v-for="item in column">
				<el-table-column align="center" style="text-align: center;" :prop="item.prop" :class-name='tableColumnClassName(item)' :label="item.label">
					<template slot-scope="scope">
						<el-tag v-if="item.prop==='isDelete' && scope.row.isDelete === 1" type="warning">已锁定</el-tag>
						<el-tag v-if="item.prop==='isDelete' && scope.row.isDelete === 0">未锁定</el-tag>
						<div v-if="item.prop!=='isDelete'">{{ scope.row[scope.column.property] }}</div>
					</template>
				</el-table-column>
			</template>
			
			<slot name="operation"></slot>
		</el-table>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				slot:true
			}
		},

		methods: {
			tableRowClassName(row, rowIndex){
				if(row.row.isDelete === 1){
					return 'warning-row'
				}
				return ''
			},

			tableColumnClassName(item){
				if(item.sign){
					return 'type'
				}
				return ''
			},

			buttonEvent(type){
				console.log(type)
			},

			show(scope){
				console.log(scope)
			}
		},

		props: ['column', 'tableData', 'operation']
	}
</script>

<style type="text/css" scoped>
.type .cell{
	border: 1px solid #666;
}
</style>