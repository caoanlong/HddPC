<template>
	<div class="content">
		<div class="listItem">
			<div class="pic fl">
				<img v-if="dataDetail.headPicture" :src="__imgserver__+dataDetail.headPicture"/>
				<img v-else src='../../assets/img/defaultImg.svg'/>
				<span class="truckStatus truckStatus1" v-if="dataDetail.transStatus=='OnWay'&&dataDetail.isReturn=='Y'">运输中<b>回</b></span>
				<span class="truckStatus truckStatus2" v-else-if="dataDetail.transStatus=='OnWay'&&dataDetail.isReturn!='Y'">运输中</span>
				<span class="truckStatus truckStatus3" v-else-if="dataDetail.transStatus=='Empty'&&dataDetail.isReturn=='Y'">空车<b>回</b></span>
				<span class="truckStatus truckStatus4" v-else-if="dataDetail.transStatus=='Empty'&&dataDetail.isReturn!='Y'">空车</span>
				<span class="truckStatus" v-else="dataDetail.transStatus==''"></span>
			</div>
			<div class="lineInfo fl">
				<p class="start">{{(dataDetail.areaFromBaseArea?dataDetail.areaFromBaseArea.fullName:'')|clearComma}}</p>
				<p class="end" :title="areaToBaseArea">{{areaToBaseArea}}</p>
				<p class="pos" v-text="dataDetail.createTime"></p>
			</div>
			<div class="userInfo fl">
				<p class="user">{{dataDetail.realName}}
					<RateDisplay :score="dataDetail.score"></RateDisplay>
					<span class="attention">未关注</span>
				</p>
				<p class="vehicleInfo" v-html="dataDetail.plateNo+'&nbsp;'+dataDetail.lengthName.name+'&nbsp;'+dataDetail.loads+'吨'+'&nbsp;'+dataDetail.truckTypeName.name"></p>
				<p class="otherInfo">车龄：5年 驾龄：10年</p>
			</div>
			<div class="loadingTime fl">
				<p class="title">可装货时间：</p>
				<p class="time">2017-08-14 全天</p>
			</div>
			<router-link :to="{name:'TruckDetail',query:{truckSourceID:dataDetail.truckSourceID}}" title="查看详情" ref="TruckFleet" class="view-btn">查看详情</router-link>
		</div>
	</div>
</template>
<script>
	import RateDisplay from '../commonComponents/RateDisplay'
	import common from '../../common/common.js'
	export default {
		props: {
			dataDetail: {
				type: Object
			}
		},
		computed: {
			areaToBaseArea() {
				var obj = '';
				for (let i in this.dataDetail.areaToBaseAreaList) {
					obj = obj + common.clearComma(this.dataDetail.areaToBaseAreaList[i].fullName,'-')+(((this.dataDetail.areaToBaseAreaList.length-1)==i)?'':'，');
				};
				return obj;
			}
		},
		components: {
			RateDisplay
		}
	}
</script>
<style lang="stylus" scoped>
	.content
		background #fff
		padding 0 15px
		.listItem
			padding:20px 100px 20px 0
			height 130px
			position relative
			border-bottom 1px solid #f0f0f0
			.pic
				width 70px
				img
					width 70px
					height 70px
					border-radius 8px
					margin-bottom 5px
				.truckStatus
					border 1px solid transparent
					border-radius 4px
					margin-left 3px
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
						padding:1px 19px
			p
				line-height 30px
				height 30px
				color #666
				font-size 14px
				padding-left 30px
				background-repeat no-repeat
				background-position left center
			.lineInfo
				padding 0 20px 0 10px
				width 185px
				p
					text-overflow ellipsis
					overflow hidden
					white-space nowrap
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
				width 340px
				border-left 1px solid #f0f0f0
				border-right 1px solid #f0f0f0
				p
					&.user
						background-image url('../../../static/img/user_icon.png')
					&.vehicleInfo
						background-image url('../../../static/img/vehicle_icon.png')
					&.otherInfo
						background-image url('../../../static/img/otherInfo_icon.png')
			.loadingTime
				padding 15px 0 15px 30px
				width 160px
				p
					&.title
						background-image url('../../../static/img/clock_icon.png')
					&.time
						color #6cc
						padding 0
						background none
			.view-btn
				position absolute
				height 28px
				line-height 28px
				padding-right 18px
				text-align center
				display block
				right 0
				top 50px
				color #666
				background url('../../../static/img/viewBtn_icon.png') no-repeat right center
			.attention
				background url('../../../static/img/attention_icon.png') no-repeat left center
				padding-left 20px
				color #d4d4d4
				&.attentioned
					background-image url('../../../static/img/attentioned_icon.png')
					color #ffc426		
</style>