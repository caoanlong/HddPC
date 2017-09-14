<template>
	<div>
		<div class="listItem">
			<div class="businessModelsTag">
				<!-- 定价 -->
				<span class="businessModels businessModels1" v-if="data.cargoFreightType=='Fix'"></span>
				<!-- 议价 -->
				<span class="businessModels businessModels2" v-else-if="data.cargoFreightType=='Talk'"></span>
				<!-- 中介 -->
				<span class="businessModels businessModels3" v-else-if="data.cargoFreightType=='Agent'"></span>
			</div>
			<div class="pic fl">
				<img v-if="data.headPicture" :src="__imgserver__+data.headPicture"/>
				<img v-else src='../../assets/img/defaultImg.svg'/>
				<span class="user_sort user_sort1" v-if="data.memberType=='3PL'">物流公司</span>
				<span class="user_sort user_sort2" v-else-if="data.memberType=='InfoDept'">物流信息部</span>
				<span class="user_sort user_sort3" v-else-if="data.memberType=='IndShipper'">个人</span>
				<span class="user_sort user_sort4" v-else-if="data.memberType=='NoTruck'">无车承运人</span>
			</div>
			<div class="lineInfo fl">
				<p class="start">{{data.fromAreaName|clearComma}}</p>
				<p class="end">{{data.toAreaName|clearComma}}</p>
				<p class="pos">广西桂林 1分钟前</p>
			</div>
			<div class="userInfo fl">
				<p class="user">{{data.realName}}<span class="score"></span> <span class="attention">未关注</span></p>
				<p class="company_name" v-text="data.companyName"></p>
				<p class="goods" v-text="data.cargoDesc" :title="data.cargoDesc"></p>
				<p class="vehicleInfo" v-text="data.truckDesc" :title="data.truckDesc"></p>
			</div>
			<div class="loadingTime fl">
				<p class="title">可装货时间：</p>
				<p class="time">
					<span>{{data.loadingDate}}</span>
					<span v-if="data.loadingTimeSlot=='NoLimit'">全天</span>
					<span v-else-if="data.loadingTimeSlot=='AM'">上午</span>
					<span v-else-if="data.loadingTimeSlot=='PM'">下午</span>
					<span v-else-if="data.loadingTimeSlot=='Night'">晚上</span>
					<span v-else-if="data.loadingTimeSlot=='Limit'"></span>
				</p>
			</div>
			<router-link :to="{name:'GoodsDetail',query:{cargoSourceID:data.cargoSourceID}}" title="查看详情" class="view-btn">查看详情</router-link>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {
			}
		},
		components: {
		}
	}
</script>
<style lang="stylus" scoped>
	.listItem
		padding:20px 100px 20px 0
		height 130px
		position relative
		border-bottom 1px solid #f0f0f0
		.businessModels
			width 30px
			height 30px
			display block
			position absolute
			left -1px
			top 19px
			color #fff
			border-radius 8px 0 0 0
			&.businessModels1
				background url('../../assets/img/businessModels_icon1.png') no-repeat center
			&.businessModels2
				background url('../../assets/img/businessModels_icon2.png') no-repeat center
			&.businessModels3
				background url('../../assets/img/businessModels_icon3.png') no-repeat center
		.pic
			width 70px
			img
				width 70px
				height 70px
				border-radius 8px
			.user_sort
				margin:5px 0 0 0
				display block
				text-align center
				border-radius 4px
				padding:2px 5px
				color #fff
				&.user_sort1
					background #6cc
				&.user_sort2
					background #5182e5
				&.user_sort3
					background #fcab20
				&.user_sort4
					background #fcab20	
		p
			line-height 30px
			height 30px
			color #666
			padding-left 30px
			background-repeat no-repeat
			background-position left center
		.lineInfo
			padding 0 20px 0 10px
			width 175px
			p
				&.start
					background-image url('../../../static/img/start_icon.png')
				&.end
					background-image url('../../../static/img/end_icon.png')
				&.pos
					background-image url('../../../static/img/pos_icon.png')
					color #afafaf
					font-size 12px
		.userInfo
			padding:0 20px
			width 260px
			border-left 1px solid #f0f0f0
			border-right 1px solid #f0f0f0
			p
				line-height 22px
				height 22px
				overflow hidden
				text-overflow ellipsis
				white-space nowrap
				&.user
					background-image url('../../../static/img/user_icon.png')
				&.vehicleInfo
					background-image url('../../../static/img/vehicle_icon.png')
				&.goods
					background-image url('../../../static/img/goods_icon.png')
				&.company_name
					background-image url('../../../static/img/company_icon.png')
					color #6cc
		.loadingTime
			padding 15px 0 15px 30px
			width 160px
			p

				&.title
					background-image url('../../../static/img/clock_icon.png')
				&.time
					color #6cc
					background none
		.view-btn
			position absolute
			height 28px
			line-height 28px
			padding-right 18px
			text-align center
			display block
			right 15px
			top 50px
			color #666
			background url('../../../static/img/viewBtn_icon.png') no-repeat right center
		.attention
			background url('../../../static/img/attention_icon.png') no-repeat left center
			padding-left 20px
			color #eaeaea
			&.attentioned
				background-image url('../../../static/img/attentioned_icon.png')
				color #ffc426
</style>