<template>
	<div class="recommend">
		<div class="tit">推荐车辆</div>
			<router-link :to="{name:'TruckDetail'}" title="11111" ref="TruckFleet" class="recommendItem">
                <div class="pic fl"><img src="../../../static/img/pic2.jpg" /></div>
                <div class="vehicleInfo fl">
                <p>贾坤 云A·12345 
					<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
					<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
					<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
					<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
                </p>
                <p>高低平板全挂 17.5米 35吨</p>
                </div>
                <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            </router-link>
            <router-link :to="{name:'TruckDetail'}" title="11111" ref="TruckFleet" class="recommendItem">
                <div class="pic fl"><img src="../../../static/img/pic3.jpg" /></div>
                <div class="vehicleInfo fl">
                <p>贾坤 云A·12345 
					<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
					<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
					<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
					<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
                </p>
                <p>高低平板全挂 17.5米 35吨</p>
                </div>
                <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            </router-link>
            <router-link :to="{name:'TruckDetail'}" title="11111" ref="TruckFleet" class="recommendItem">
                <div class="pic fl"><img src="../../../static/img/pic4.jpg" /></div>
                <div class="vehicleInfo fl">
                <p>贾坤 云A·12345 
					<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
					<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
					<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
					<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
                </p>
                <p>高低平板全挂 17.5米 35吨</p>
                </div>
                <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            </router-link>
            <router-link :to="{name:'TruckDetail'}" title="11111" ref="TruckFleet" class="recommendItem">
                <div class="pic fl"><img src="../../../static/img/pic5.jpg" /></div>
                <div class="vehicleInfo fl">
                <p>贾坤 云A·12345 
					<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
					<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
					<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
					<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
                </p>
                <p>高低平板全挂 17.5米 35吨</p>
                </div>
                <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            </router-link>
            <router-link :to="{name:'TruckDetail'}" title="11111" ref="TruckFleet" class="recommendItem last">
                <div class="pic fl"><img src="../../../static/img/pic2.jpg" /></div>
                <div class="vehicleInfo fl">
                <p>贾坤 云A·12345 
					<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
					<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
					<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
					<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
                </p>
                <p>高低平板全挂 17.5米 35吨</p>
                </div>
                <p class="lineInfo"><span>广东深圳</span><span class="arrow"></span><span>云南昆明</span></p>
            </router-link>
	</div>
</template>
<script>
	export default {
		props: {
			truckStatus:{
				type: Number,
				default:3
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
			padding 10px 0 34px 60px
			height 94px
			border-bottom 1px solid #f0f0f0
			position relative
			display block
			&.last,&:last-child
				border-bottom none
			p
				line-height 24px
				color #666
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
			.lineInfo
				color #6cc
				font-size 14px
				font-weight bold
				position absolute
				top 60px
				left 0
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
.truckStatus
	border 1px solid transparent
	border-radius 4px
	margin-left 5px
	&.truckStatus1
		border-color #20a0ff
		background #fff;
		color #20a0ff
		padding:0 20px 0 5px
		position relative
		b
			color #fff
			background #20a0ff
			font-style normal
			height 16px
			line-height 16px
			display inline-block
			width 16px
			text-align center
			position absolute
			right 0
			top 0
	&.truckStatus2
		border-color #20a0ff
		color #20a0ff
		padding:0 13px
	&.truckStatus3
		border-color #6cc
		color #6cc
		padding:0 26px 0 11px
		position relative
		b
			color #fff
			background #6cc
			font-style normal
			height 16px
			line-height 16px
			display inline-block
			width 16px
			text-align center
			position absolute
			right 0
			top 0
	&.truckStatus4
		border-color #6cc
		color #6cc
		padding:0 19px
</style>