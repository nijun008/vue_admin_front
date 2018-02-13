<template>
	<div>
		<div class="user-content">
			<el-tabs v-model="activeTab">
				<el-tab-pane
					name="first"
					label="我的订单">
					<el-table
						:data="orderData"
						style="width: 100%">
						<el-table-column
							prop="number"
							label="订单编号">
						</el-table-column>
						<el-table-column
							prop="name"
							label="产品名称">
						</el-table-column>
						<el-table-column
							prop="num"
							label="数量">
						</el-table-column>
						<el-table-column
							prop="price"
							label="总价">
						</el-table-column>
						<el-table-column
							prop="time"
							label="下单时间"
							width="170">
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<router-link class="order-check" :to="'/'">查看</router-link>
								<span class="order-line"></span>
								<a class="order-close" href="javascript:void(0)">关闭</a>
							</template>
						</el-table-column>
					</el-table>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			activeTab: 'first',
			orderData: [
				{
					number: '1241515',
					name: '基本套餐',
					num: 2,
					price: 511,
					time: '2017-11-11 11:11:11'
				},
				{
					number: '1241515',
					name: '基本套餐',
					num: 2,
					price: 511,
					time: '2017-11-11 11:11:11'
				},
			]
		}
	}
}
</script>

<style lang="less">
@import url(../../../static/css/global.less);
.user-content {
	padding-top: 20px;
	padding-left: 30px;
	background-color: #fff;
	min-height: 600px;
}
.user-content .el-tabs__item{
	font-size: 20px;
}
.user-content .cell{
	text-align: center;
}
.order-check{
	color: @mainColor;
}
.order-close{
	color: #f14b4b;
}
.order-line{
	display: inline-block;
	width: 1px;
	height: 18px;
	background-color: #dbdbdb;
	margin: 0 5px;
	vertical-align: middle;
}
</style>