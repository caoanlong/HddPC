<template>
	<div class="recommend">
		<div class="tit">推荐货源</div>
		<router-link :to="{name:'GoodsDetail', query: {cargoSourceID: goods.cargoSourceIDStr}}" title="查看详情" class="recommendItem" v-for="goods in GoodsList" :key="goods.cargoSourceIDStr">
			<!-- <div class="pic">
				<img v-if="goods.headPicture" :src="__imgserver__ + goods.headPicture" @error="errorImg"/>
			</div>
			<div class="userInfo">
				<p>{{goods.realName}}<span class="user_sort user_sort1" v-if="UserSort==1">物流公司</span>
					<span class="user_sort user_sort2" v-else-if="UserSort==2">物流信息部</span>
					<span class="user_sort user_sort3" v-else-if="UserSort==3">个人</span>
					<span class="user_sort user_sort4" v-else-if="UserSort==4">无车承运人</span>
					<span class="publish-time fr">刚刚 发布</span>
				</p>
				<p>
					<span class="businessModels businessModels1" v-show="goods.cargoFreightType=='Fix'">定价</span>
					<span class="businessModels businessModels2" v-show="goods.cargoFreightType=='Talk'">议价</span>
					<span class="businessModels businessModels3" v-show="goods.cargoFreightType=='Agent'">中介</span>
				</p>
			</div> -->
			<p class="lineInfo">
				<span>{{goods.areaFromName.split(',').join('').substr(0, 6)}}</span>
				<span class="arrow"></span>
				<span>{{goods.areaToName.split(',').join('').substr(0, 6)}}</span>
			</p>
			<p class="date">{{goods.loadingDate}}</p>
			<p class="goods">
				<span>{{goods.cargoName && goods.cargoName}}{{goods.cargoWeight ? '/' + goods.cargoWeight + '吨' : ''}}{{goods.cargoVolume ? '/' + goods.cargoVolume + '方' : ''}}{{goods.cargoNum ? '/' + goods.cargoNum + '件' : ''}}</span>
			</p>
			<p class="vehicleInfo">
				<span>{{goods.truckLengthName.split(',').join('/')}}{{goods.truckTypeName ? '/' + goods.truckTypeName : ''}}{{goods.truckNum ? '/剩' + goods.surplusTruckNum + '车' : ''}}</span>
			</p>
		</router-link>
	</div>
</template>
<script>
	import {defaultImg} from '../../assets/icons'
	export default {
		data() {
			return {
				UserSort: 1,
				GoodsList: []
			}
		},
		created() {
			this.getGoodsList(1)
		},
		methods: {
			getGoodsList(pageNum) {
				let URL = this.__webserver__ + 'adv/cargoSource/list'
				let params = {
					"pageSize": this.PAGESIZE,
					"pageNum": pageNum
				}
				this.$http.get(URL,{params:params}).then((res) => {
					if (res.body.code == 200) {
						this.GoodsList = res.body.data.list
						console.log(JSON.stringify(res.body.data))
					}else if (res.body.code == 10006) {
						localStorage.removeItem('memberInfo')
						localStorage.removeItem('authorization')
						this.$router.push({name:'Login'})
					}
				})
			},
			errorImg (e) {
				e.target.src = defaultImg
				e.target.onerror = null
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
			// padding-top 60px
			height 104px
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
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
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