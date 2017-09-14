<template>
	<div class="recommend">
		<div class="tit">推荐货源</div>
		<router-link :to="{name:'GoodsDetail'}" title="查看详情" class="recommendItem">
            <div class="pic"><img src="../../../static/img/pic2.jpg" /></div>
            <div class="userInfo">
            	<p>贾坤<span class="user_sort user_sort1" v-if="UserSort==1">物流公司</span>
				<span class="user_sort user_sort2" v-else-if="UserSort==2">物流信息部</span>
				<span class="user_sort user_sort3" v-else-if="UserSort==3">个人</span>
				<span class="user_sort user_sort4" v-else="UserSort==4">无车承运人</span>
				<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
				<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
				<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
				<span class="publish-time fr">刚刚 发布</span></p>
            	<p class="company_name">云南微服物流有限公司</p>
            </div>
            <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            <p class="date">2017-08-14 全天装货</p>
            <p class="goods">食品 30吨 45方 裸装</p>
            <p class="vehicleInfo">6.8米/7.2米 集装箱车 3车</p>
        </router-link>
        <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="recommendItem">
            <div class="pic"><img src="../../../static/img/pic3.jpg" /></div>
            <div class="userInfo">
            	<p>贾坤<span class="user_sort user_sort1" v-if="UserSort==1">物流公司</span>
				<span class="user_sort user_sort2" v-else-if="UserSort==2">物流信息部</span>
				<span class="user_sort user_sort3" v-else-if="UserSort==3">个人</span>
				<span class="user_sort user_sort4" v-else="UserSort==4">无车承运人</span>
				<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
				<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
				<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
				<span class="publish-time fr">刚刚 发布</span></p>
            	<p class="company_name">云南微服物流有限公司</p>
            </div>
            <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            <p class="date">2017-08-14 全天装货</p>
            <p class="goods">食品 30吨 45方 裸装</p>
            <p class="vehicleInfo">6.8米/7.2米 集装箱车 3车</p>
        </router-link>
        <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="recommendItem">
            <div class="pic"><img src="../../../static/img/pic4.jpg" /></div>
            <div class="userInfo">
            	<p>贾坤<span class="user_sort user_sort1" v-if="UserSort==1">物流公司</span>
				<span class="user_sort user_sort2" v-else-if="UserSort==2">物流信息部</span>
				<span class="user_sort user_sort3" v-else-if="UserSort==3">个人</span>
				<span class="user_sort user_sort4" v-else="UserSort==4">无车承运人</span>
				<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
				<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
				<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
				<span class="publish-time fr">刚刚 发布</span></p>
            	<p class="company_name">云南微服物流有限公司</p>
            </div>
            <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            <p class="date">2017-08-14 全天装货</p>
            <p class="goods">食品 30吨 45方 裸装</p>
            <p class="vehicleInfo">6.8米/7.2米 集装箱车 3车</p>
        </router-link>
        <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="recommendItem">
            <div class="pic"><img src="../../../static/img/pic5.jpg" /></div>
            <div class="userInfo">
            	<p>贾坤<span class="user_sort user_sort1" v-if="UserSort==1">物流公司</span>
				<span class="user_sort user_sort2" v-else-if="UserSort==2">物流信息部</span>
				<span class="user_sort user_sort3" v-else-if="UserSort==3">个人</span>
				<span class="user_sort user_sort4" v-else="UserSort==4">无车承运人</span>
				<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
				<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
				<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
				<span class="publish-time fr">刚刚 发布</span></p>
            	<p class="company_name">云南微服物流有限公司</p>
            </div>
            <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            <p class="date">2017-08-14 全天装货</p>
            <p class="goods">食品 30吨 45方 裸装</p>
            <p class="vehicleInfo">6.8米/7.2米 集装箱车 3车</p>
        </router-link>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				UserSort: 1,
				businessModels: 1
			}
		},
		components: {
		}
	}
</script>
<style lang="stylus" scoped>
	.recommend
		background #fff
		border 1px solid #f0f0f0
		border-radius 4px
		padding:20px 20px 15px
		.tit
			background url('../../../static/img/recommend_tit_icon.png') no-repeat left center
			padding-left 30px
			height 34px
			line-height 34px
			display block
			color #6cc
			font-size 14px
			font-weight bold
		.recommendItem
			padding-top 60px
			height 164px
			border-bottom 1px solid #f0f0f0
			position relative
			display block
			color #999
			&.last,&:last-child
				border-bottom none
			p
				line-height 24px
				color #666
				&.date,&.goods,&.vehicleInfo
					padding-left 30px
					line-height 20px
					background-repeat no-repeat
					background-position left center
				&.date
					background-image url('../../../static/img/clock_icon.png')
				&.goods
					background-image url('../../../static/img/goods_icon.png')
				&.vehicleInfo
					background-image url('../../../static/img/vehicle_icon.png')
				.publish-time
					font-size 12px
					color #eaeaea
			.pic
				width 50px
				height 50px
				position absolute
				left 0
				top 10px
				img
					width 50px
					height 50px
					border-radius 8px
			.userInfo
				position absolute
				top 10px
				left 60px
				width 218px
				.businessModels
					border-radius 4px
					padding:1px 4px
					border 1px solid transparent
					background #fff
					&.businessModels1
						color #6cc
						border-color #6cc
					&.businessModels2
						color #5182e5
						border-color #5182e5
					&.businessModels3
						color #fcab20
						border-color #fcab20
				.user_sort
					margin:0 5px
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
			.lineInfo
				color #6cc
				font-size 14px
				font-weight bold
				padding-left 30px
				height 34px
				line-height 34px
				background url('../../../static/img/lineInfo.png') no-repeat left center
				span
					display inline-block
					vertical-align middle
					&.arrow
						width 30px
						height 34px
						background url('../../../static/img/lin_arrow.png') no-repeat center
</style>