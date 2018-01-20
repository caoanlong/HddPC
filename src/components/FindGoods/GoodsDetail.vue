<template>
	<div class="lside fl">
		<div class="preview-wrap clearfix">
			<div class="itemInfo-wrap">
				<div class="ownerInfo">
					<img :src="__imgserver__ + goodsDetail.headPicture" class="ownerPic" @error="errorImg"/>
					<p><label>货主姓名：</label>{{goodsDetail.realName}}
					<span class="user_sort user_sort1" v-if="goodsDetail.memberType=='3PL'">物流公司</span>
					<span class="user_sort user_sort2" v-else-if="goodsDetail.memberType=='InfoDept'">物流信息部</span>
					<span class="user_sort user_sort3" v-else-if="goodsDetail.memberType=='IndShipper'">个人</span>
					<span class="user_sort user_sort4" v-else-if="goodsDetail.memberType=='NoTruck'">无车承运人</span>
					<span class="businessModels businessModels1" v-if="goodsDetail.cargoFreightType=='Fix'">定价</span>
					<span class="businessModels businessModels2" v-else-if="goodsDetail.cargoFreightType=='Talk'">议价</span>
					<span class="businessModels businessModels3" v-else="goodsDetail.cargoFreightType=='Agent'">中介</span>
					</p>
					<p><label>联系电话：</label>{{goodsDetail.mobile}}</p>
					<p><label>所在区域：</label>云南昆明</p>
					<p><span class="c1"><label>发布货源：</label>{{goodsDetail.cargoSourceNum || 0}}次</span><span class="c1"><label>平台成交：</label>{{goodsDetail.dealNum || 0}}笔</span><span class="c1"><label>好评率：</label>{{goodsDetail.feedbackRate}}%</span></p>
					<!-- <span class="attention attentioned">已关注</span> -->
					<span class="attention">未关注</span>
				</div>
				<div class="goodsInfo clearfix">
					<p class="title">货源信息</p>
					<div class="lineInfo">
						<p><span class="start">{{goodsDetail.areaFromName|clearComma}}</span><span class="arrow"></span><span class="end">{{goodsDetail.areaToName|clearComma}}</span></p>
					</div>
					<div class="goodsDetail ">
						<p><label>货物信息：</label><span>{{goodsDetail.cargoName}}</span><span>{{goodsDetail.cargoWeight || 0}}吨</span><span>{{goodsDetail.cargoVolume || 0}}方</span><span>{{goodsDetail.cargoNum}}{{goodsDetail.cargoPackage}}</span></p>
						<p><label>需求车型：</label>
							<span v-for="(truckLength,i) in goodsDetail.truckLengthList">{{truckLength.name+((i==goodsDetail.remarkList.length-1)?'':'/')}}</span>
							<span>{{goodsDetail.truckTypeConstant?goodsDetail.truckTypeConstant.name:''}}</span>
							<span>{{goodsDetail.truckNum}}</span>
						</p>
						<p><label>装车时间：</label>
							<span class="c1">{{goodsDetail.loadingDate}}</span>
						</p>
						<p><label>货主留言：</label>{{goodsDetail.remark || '无'}}</p>
					</div>
				</div>
			</div>
		</div>
		<!-- 货源详情 Start-->
		<div class="detail mt clearfix">
			<ul class="hd">
				<li :class="{'on':tab==1}" @click="tab = 1">已发货源</li>
				<li :class="{'on':tab==2}" @click="getAuthenticationInfo">认证信息</li>
			</ul>
			<div class="bd">
				<div class="tabCon" v-show="tab==1">
					<div class="filterTab clearfix">
						<SimpleSelector :optionList="todayOrMore" :defaultOption="selectedRange" :styleClass="3"></SimpleSelector>
					</div>
					<div class="listItem" v-for="item in 5" key="item">
						<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
						<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
						<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
						<div class="lineInfo fl">
							<p class="start">广东 深圳</p>
							<p class="end">黑龙江 齐齐哈尔</p>
						</div>
						<div class="goodsInfo fl">
							<p class="goods">食品 30吨 45方 裸装</p>
							<p class="vehicleInfo">6.8米/7.2米 集装箱车 3车</p>
						</div>
						<div class="loadingTime fl">
							<p class="title">装货时间：</p>
							<p class="time">2017-08-14 全天</p>
						</div>
						<div class="other fr">
							<p><span class="c1">刚刚</span> 发布</p>
							<p><router-link :to="{name:'GoodsDetail'}" title="查看详情" class="view-btn">查看详情</router-link></p>
						</div>
					</div>
				</div>
				<div class="tabCon clearfix" v-show="tab==2">
					<ul class="attentionInfo text-righ fl">
						<li>
							<label>真实姓名</label>
							<p>{{authenticationInfo.person?authenticationInfo.person.realName:''}}</p>
						</li>
						<li>
							<label>身份证号码</label>
							<p>
								<span class="attentioned">已认证</span>
							</p>
						</li>
						<li>
							<label>身份证</label>
							<p>
								<span class="attentioned">已认证</span>
							</p>
						</li>
					</ul>
					<ul class="attentionInfo text-righ fr">
						<li>
							<label>公司名称</label>
							<p>{{authenticationInfo.enterprice?authenticationInfo.enterprice.companyName:''}}</p>
						</li>
						<li>
							<label>所在区域</label>
							<p>{{authenticationInfo.enterprice?authenticationInfo.enterprice.baseArea.fullOriginalName:''}}</p>
						</li>
						<li>
							<label>地址定位</label>
							<p>{{authenticationInfo.enterprice?authenticationInfo.enterprice.gpsAddress:''}}</p>
						</li>
						<li>
							<label>详细地址</label>
							<p>{{authenticationInfo.enterprice?authenticationInfo.enterprice.detailAddress:''}}</p>
						</li>
						<li>
							<label>门头照</label>
							<p>
								<ImagePerview :width="40" :height="40" class="fr" fileUrl=""></ImagePerview>
							</p>
						</li>
						<li>
							<label>营业执照</label>
							<p>
								<ImagePerview :width="40" :height="40" class="fr" fileUrl=""></ImagePerview>
							</p>
						</li>
						<li>
							<label>道路运输许可证</label>
							<p>
								<ImagePerview :width="40" :height="40" class="fr" fileUrl=""></ImagePerview>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 车源详情 End -->
	</div>
</template>
<script>
	import {defaultImg} from '../../assets/icons'
	import ImagePerview from '../commonComponents/ImagePerview'
	import SimpleSelector from '../commonComponents/SimpleSelector'
	export default {
		props: {
			UserSort: {
				type: Number,
				default: 4
			},
			businessModels:{
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				tab: 1,
				todayOrMore: [{name:'今天'},{name:'更早'}],
				selectedRange: 0,
				goodsDetail: {},
				authenticationInfo: {},
				isAuth: false
			}
		},
		computed: {
        	isLogin () {
				return localStorage.getItem('memberInfo') && localStorage.getItem('authorization')
			}
        },
        created() {
        	this.getGoodsDetail();
        },
        watch:{
	        '$route':'getGoodsDetail'
	    },
		methods: {
			errorImg (e) {
                e.target.src = defaultImg
                e.target.onerror = null
            },
            getAuthenticationInfo() {
            	this.tab = 2
            	if (this.isAuth) {
            		return
            	}
            	this.isAuth =true
            	let URL = ''
            	if(this.isLogin){
					URL = this.__webserver__ + 'certify/enterprice/detail'
				}
				else{
					URL = this.__webserver__ + 'adv/certify/enterprice/detail'
				}
            	let params = {
					"memID": this.goodsDetail.memIDStr
				};
				this.$http.get(URL,{params:params}).then(
					(res) => {
						if (res.body.code == 200) {
							this.authenticationInfo = res.body.data
							// console.log(JSON.stringify(res.body.data))
						}
					}
				)
            },
			getGoodsDetail() {
				let URL = ''
				if(this.isLogin){
					URL = this.__webserver__ + 'cargoSource/detail'
				}else{
					URL = this.__webserver__ + 'adv/cargoSource/detail'
				}
				let params = {
					"id": this.$route.query.cargoSourceID
				};
				this.$http.get(URL,{params:params}).then(
					(res) => {
						if (res.body.code == 200) {
							this.goodsDetail = res.body.data
							// console.log(JSON.stringify(res.body.data))
						}else if (res.body.code ==10006){
							localStorage.removeItem('memberInfo')
							localStorage.removeItem('authorization')
							this.$router.push({name:'Login'})
						}
					}
				)
			}
		},
		components: {
			ImagePerview,
			SimpleSelector
		}
	}
</script>
<style lang="stylus" scoped>
.content
	background #f6f6f6;
	padding:10px 0 20px

.lside
	width 950px
.preview-wrap
	border 1px solid #f0f0f0
	padding 10px
	background #fff
	border-radius 4px
	.itemInfo-wrap
		color #585757
		.title
			font-weight bold
			color #878787
		label
			color #afafaf
		.ownerInfo
			padding 0 100px 0 160px
			position relative
			height 140px
			overflow hidden
			.ownerPic
				width 140px
				height 140px
				border-radius 4px
				position absolute
				left 0
				top 0
			p
				line-height 30px
				span
					margin-right 40px
			.attention
				background url('../../../static/img/attention_icon.png') no-repeat 8px center
				padding 5px 10px 5px 30px
				color #d4d4d4
				border 1px solid #d4d4d4
				border-radius 4px
				cursor pointer
				position absolute
				right 10px
				top 31px
				&.attentioned
					background-image url('../../../static/img/attentioned_icon.png')
					color #ffc426
					border-color #ffc426
		.goodsInfo
			border-top 1px dashed #ebebeb
			padding 10px 0
			margin 10px 0
			line-height 30px
			.lineInfo
				height 30px
				p
					height 30px
					line-height 30px
					text-overflow ellipsis
					white-space nowrap
					overflow hidden
					span
						display inline-block
						vertical-align middle
						height 30px
						&.start
							background url('../../../static/img/start_icon.png') no-repeat left center
							padding-left 30px
						&.end
							background url('../../../static/img/end_icon.png') no-repeat left center
							padding-left 30px
						&.arrow
							width 30px
							margin-right 10px
							background url('../../../static/img/lin_arrow.png') center no-repeat
			.goodsDetail
				width 368px
				padding-left 10px
				line-height 30px
				span
					margin-right 10px
			.pushBtn
				position absolute
				right 10px
				padding 5px 10px 5px 30px
				bottom 0
				background url('../../../static/img/pushBtn.png') no-repeat 8px center #ffc426
				color #fff
				border-radius 4px
				&:hover
					background-color #fbbd17
				&:active
					background-color #fcb802
.detail
	.hd
		height 36px
		margin-top 5px
		li
			float left
			font-size 14px
			font-weight bold
			color #bababa
			height 36px
			line-height 36px
			background-color #eaeaea
			padding 0 20px 0  40px
			border 1px solid #f0f0f0
			border-width 1px 0 0 1px
			cursor pointer
			&:first-child
				border-radius 4px 0 0 0
				background url('../../../static/img/Detail_icon4.png') 20px center no-repeat
				&.on
					background-image url('../../../static/img/Detail_icon4_on.png')
			&:nth-child(2)
				border-radius 0
				background url('../../../static/img/Detail_icon2.png') 20px center no-repeat
				&.on
					background-image url('../../../static/img/Detail_icon2_on.png')
			&:last-child
				border-radius 0 4px 0 0
				border-right 1px solid #f0f0f0
				background url('../../../static/img/Detail_icon3.png') 20px center no-repeat
				&.on
					background-image url('../../../static/img/Detail_icon3_on.png')
			&.on
				color #6cc
				background-color #fff
				height 37px
	.bd
		background #fff
		border 1px solid #f0f0f0
		padding 10px
		.filterTab
			padding 10px 0 10px 10px
			border-bottom 1px solid #f0f0f0
			span
				padding 5px 12px
				background #f0f0f0
				margin-right 10px
				display inline-block
				border-radius 4px
				cursor pointer
				&.cur
					background #5282e6
					color #fff
		.listItem
			height 80px
			padding 10px 0 10px 60px
			position relative
			border-bottom 1px dashed #f0f0f0
			p
				line-height 30px
			.businessModels
				position absolute
				left 10px
				top 18px
			.lineInfo
				padding 0 20px 0 10px
				width 275px
				p
					background-repeat no-repeat
					width 245px
					text-overflow ellipsis
					white-space nowrap
					overflow hidden
					&.start
						&:before
							content '始'
							color #6cc
							margin-right 10px
					&.end
						&:before
							content '终'
							color #ec4c4f
							margin-right 10px
			.goodsInfo
				padding:0 20px
				width 260px
				border-left 1px solid #f0f0f0
				border-right 1px solid #f0f0f0
				p
					background-repeat no-repeat
					padding-left 20px
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
				padding-left 30px
				width 160px
				p
					background-repeat no-repeat
					padding-left 20px
					&.title
						background-image url('../../../static/img/clock_icon.png')
					&.time
						color #6cc
						background none
			.other
				width 120px
				.view-btn
					height 30px
					line-height 30px
					padding-right 18px
					text-align center
					color #666
					background url('../../../static/img/viewBtn_icon.png') no-repeat right center
		.oftenLine
			li
				width 100%
				height 40px
				border-bottom 1px solid #f0f0f0
				&:last-child
					border-bottom none
				p
					width 50%
					padding:0 10px
					height 40px
					line-height 40px
					text-overflow ellipsis
					white-space nowrap
					overflow hidden
					&.lineInfo
						color #6cc
						span
							display inline-block
							vertical-align middle
							&.arrow
								width 30px
								height 40px
								background url('../../../static/img/lin_arrow.png') center no-repeat
							
					&.GoodsInfo
						color #878787
		.attentionInfo
			padding 0 10px
			width 440px
			li
				width 100%
				height 50px
				line-height 40px
				padding 5px 0 5px 100px
				border-bottom 1px solid #f0f0f0
				position relative
				label
					width 90px
					position absolute
					left 0
					line-height 40px
					color #999
					text-align right
				img
					width 40px
					height 40px
					border-radius 4px
				p
					text-align right
				.attentioned
					color #6cc
					font-size 12px
					background url('../../assets/img/attentioned_icon1.png') no-repeat left center
					padding-left 16px
.rside
	width 320px
	.recommend
		background #fff
		border 1px solid #f0f0f0
		border-radius 4px
		padding:10px 20px 15px
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
.user_sort
	border-radius 4px
	padding:2px 5px
	color #fff
	margin-left 5px
	&.user_sort1
		background #6cc
	&.user_sort2
		background #5182e5
	&.user_sort3
		background #fcab20
	&.user_sort4
		background #fcab20
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
</style>