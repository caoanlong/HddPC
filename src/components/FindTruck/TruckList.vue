<template>
	<div class="content">
		<div class="listItem">
			<div class="pic fl">
				<img :src="__imgserver__+dataDetail.headPicture" @error="errorImg"/>
				
			</div>
			<div class="userInfo fl">
				<p class="user"><span>{{dataDetail.realName}}</span><span>{{dataDetail.plateNo}}</span></p>
				<p class="vehicleInfo" v-html="dataDetail.truckLengthName+'&nbsp;'+dataDetail.loads+'吨'+'&nbsp;'+dataDetail.truckTypeName"></p>
				<p class="pos">{{dataDetail.posAreaName}}</p>
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
				width 90px
				img
					width 90px
					height 90px
					border-radius 8px
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
						span
							margin-right 20px
					&.vehicleInfo
						background-image url('../../../static/img/vehicle_icon.png')
					&.pos
						background url('../../../static/img/pos_icon.png') left center no-repeat
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