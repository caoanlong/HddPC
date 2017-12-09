<template>
	<div class="content">
		<div class="listItem">
			<div class="pic fl">
				<img :src="__imgserver__+dataDetail.headPicture" @error="errorImg"/>
				<span class="pos">{{dataDetail.posAreaName}}</span>
			</div>
			<div class="userInfo fl">
				<p class="user">{{dataDetail.realName}}
					<RateDisplay :score="dataDetail.score"></RateDisplay>
					
				</p>
				<p class="vehicleInfo" v-html="dataDetail.plateNo+'&nbsp;'+dataDetail.truckLengthName+'&nbsp;'+dataDetail.loads+'吨'+'&nbsp;'+dataDetail.truckTypeName"></p>
				<p class="otherInfo">车龄：5年 驾龄：10年</p>
			</div>
			<span class="attention attentioned" v-if="dataDetail.focusType == 'Familiar' || dataDetail.focusType == 'Selft' || dataDetail.focusType == 'Attach'">已关注</span>
			<span class="attention" v-else>未关注</span>
			<router-link :to="{name:'TruckDetail',query:{memID:dataDetail.memIDStr}}" title="查看详情" ref="TruckFleet" class="view-btn">查看详情</router-link>
		</div>
	</div>
</template>
<script>
	import {defaultImg} from '../../assets/icons'
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
		},
		methods: {
			errorImg (e) {
                e.target.src = defaultImg
                e.target.onerror = null
            },
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
				.pos
						background url('../../../static/img/pos_icon.png') -4px center no-repeat
						color #afafaf
						font-size 12px
						width 70px
						height 20px
						line-height 20px
						display block
						padding-left 16px
			p
				line-height 30px
				height 30px
				color #666
				font-size 14px
				padding-left 30px
				background-repeat no-repeat
				background-position left center
			.userInfo
				padding 0 20px
				width 340px
				p
					&.user
						background-image url('../../../static/img/user_icon.png')
					&.vehicleInfo
						background-image url('../../../static/img/vehicle_icon.png')
					&.otherInfo
						background-image url('../../../static/img/otherInfo_icon.png')
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
				position absolute
				right 120px
				top 56px
				&.attentioned
					background-image url('../../../static/img/attentioned_icon.png')
					color #ffc426		
</style>