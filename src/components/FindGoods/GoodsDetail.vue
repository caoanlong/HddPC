<template>
	<div class="lside fl">
		<div class="preview-wrap clearfix">
			<ImgLightBox :data="goodsDetail"></ImgLightBox>
			<div class="itemInfo-wrap fr">
				<div class="ownerInfo">
					<img v-if="headPicture" :src="headPicture" class="ownerPic"/>
					<img v-else src='../../assets/img/defaultImg.svg' class="ownerPic"/>
					<p><label>姓名：</label>{{goodsDetail.realName}}
					<span class="user_sort user_sort1" v-if="goodsDetail.memberType=='3PL'">物流公司</span>
					<span class="user_sort user_sort2" v-else-if="goodsDetail.memberType=='InfoDept'">物流信息部</span>
					<span class="user_sort user_sort3" v-else-if="goodsDetail.memberType=='IndShipper'">个人</span>
					<span class="user_sort user_sort4" v-else-if="goodsDetail.memberType=='NoTruck'">无车承运人</span>

					<span class="businessModels businessModels1" v-if="goodsDetail.cargoFreightType=='Fix'">定价</span>
					<span class="businessModels businessModels2" v-else-if="goodsDetail.cargoFreightType=='Talk'">议价</span>
					<span class="businessModels businessModels3" v-else="goodsDetail.cargoFreightType=='Agent'">中介</span>
					</p>
					<p><label>电话：</label>{{goodsDetail.mobile}}</p>
					<p><label>公司：</label>云南微服物流有限公司</p>
					<p><label>地址：</label>云南昆明官渡区浩宏物流驾驶员广场信息中心</p>
					<!-- <span class="attention attentioned">已关注</span> -->
					<span class="attention">未关注</span>
				</div>
				<div class="goodsInfo">
					<p class="title">货源信息</p>
					<div class="lineInfo fl">
						<p class="start">{{goodsDetail.fromAreaName|clearComma}}</p>
						<p class="end">{{goodsDetail.toAreaName|clearComma}}</p>
					</div>
					<ul class="detail fr">
						<li><label>名称：</label>{{goodsDetail.cargoName}}</li>
						<li><label>货物包装：</label>{{goodsDetail.cargoPackageConstant?goodsDetail.cargoPackageConstant.name:''}}</li>
						<li><label>类型：</label>{{goodsDetail.cargoTypeConstant?goodsDetail.cargoTypeConstant.name:''}}</li>
						<li><label>路线距离：</label>{{goodsDetail.estimateMileage}}公里</li>
						<li><label>数量：</label>{{goodsDetail.cargoWeight}}</li>
						<li><label>预计成本：</label>1000.00元</li>
					</ul>
					<ul class="otherInfo clearfix">
						<li><label>货物运费：</label></li>
						<li><label>备注留言：</label></li>
						<li>{{goodsDetail.cargoFreightTotalPrice}}元</li>
						<li>
							<span v-for="(remark,i) in goodsDetail.remarkList">{{remark.name+((i==goodsDetail.remarkList.length-1)?'':'、')}}</span>
						</li>
					</ul>
				</div>
				<div class="demand clearfix">
					<p class="title">用车需求</p>
					<ul>
						<li><label>车型：</label>{{goodsDetail.truckTypeConstant?goodsDetail.truckTypeConstant.name:''}}</li>
						<li><label>用车数量：</label>{{goodsDetail.truckNum}}</li>
						<li>
							<label>车长：</label>
							<span v-for="(truckLength,i) in goodsDetail.truckLengthList">{{truckLength.name+((i==goodsDetail.remarkList.length-1)?'':'/')}}</span>
						</li>
						<li>
							<label>装车时间：</label>
							<span class="c1">{{goodsDetail.loadingDate}}
								<span v-if="goodsDetail.loadingTimeSlot=='NoLimit'">全天</span>
								<span v-else-if="goodsDetail.loadingTimeSlot=='AM'">上午</span>
								<span v-else-if="goodsDetail.loadingTimeSlot=='PM'">下午</span>
								<span v-else-if="goodsDetail.loadingTimeSlot=='Night'">晚上</span>
								<span v-else-if="goodsDetail.loadingTimeSlot=='Limit'"></span>
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 车源详情 Start-->
		<div class="detail mt clearfix">
			<ul class="hd">
				<li :class="{'on':tab==1}" @click="tab = 1">已发货源</li>
				<li :class="{'on':tab==2}" @click="tab = 2">认证信息</li>
			</ul>
			<div class="bd">
				<div class="tabCon" v-show="tab==1">
					<div class="filterTab clearfix">
						<SimpleSelector :optionList="todayOrMore" :defaultOption="selectedRange" :styleClass="3"></SimpleSelector>
					</div>
					<div class="listItem">
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
					<div class="listItem">
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
					<div class="listItem">
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
							<label>本人正面照片</label>
							<p>
								<ImagePerview :width="40" :height="40" class="fr" fileUrl=""></ImagePerview>
							</p>
						</li>
						<li>
							<label>真实姓名</label>
							<p>朱静静</p>
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
							<p>云南微服物流有限公司</p>
						</li>
						<li>
							<label>所在区域</label>
							<p>云南昆明官渡区</p>
						</li>
						<li>
							<label>地址定位</label>
							<p>浩宏物流驾驶员广场</p>
						</li>
						<li>
							<label>详细地址</label>
							<p>信息中心</p>
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
		<!-- 类似车源 Start-->
		<div class="similar mt clearfix">
			<div class="title">类似货源</div>
			<div class="con">
				 <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="item">
					<div class="goodsImg posr"><img src="../../../static/img/truck_img.jpg" class="goodsPic"/>
						<div class="sort_bg">
							<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
							<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
							<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
				 </router-link>
				 <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="item">
					<div class="goodsImg posr"><img src="../../../static/img/truck_img.jpg" class="goodsPic"/>
						<div class="sort_bg">
							<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
							<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
							<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
				 </router-link>
				 <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="item">
					<div class="goodsImg posr"><img src="../../../static/img/truck_img.jpg" class="goodsPic"/>
						<div class="sort_bg">
							<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
							<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
							<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
				 </router-link>
				 <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="item">
					<div class="goodsImg posr"><img src="../../../static/img/truck_img.jpg" class="goodsPic"/>
						<div class="sort_bg">
							<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
							<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
							<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
				 </router-link>
				 <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="item">
					<div class="goodsImg posr"><img src="../../../static/img/truck_img.jpg" class="goodsPic"/>
						<div class="sort_bg">
							<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
							<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
							<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
				 </router-link>
				 <router-link :to="{name:'GoodsDetail'}" title="查看详情" class="item">
					<div class="goodsImg posr"><img src="../../../static/img/truck_img.jpg" class="goodsPic"/>
						<div class="sort_bg">
							<span class="businessModels businessModels1" v-if="businessModels==1">定价</span>
							<span class="businessModels businessModels2" v-else-if="businessModels==2">议价</span>
							<span class="businessModels businessModels3" v-else="businessModels==3">中介</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
				 </router-link>
			</div>
		</div>
		<!-- 类似车源 End -->
	</div>
</template>
<script>
	import ImgLightBox from '../commonComponents/ImgLightBox'
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
				headPicture: '',
				goodsDetail: {
					"cargoPackageConstant":{
						"name": ''
					},
					"cargoTypeConstant":{},
					"truckTypeConstant":{},
				}
			}
		},
		computed: {
        	cargoSourceID() {
        		return this.$route.query.cargoSourceID
        	}
        },
        created() {
        	this.getGoodsDetail();
        },
		methods: {
			getGoodsDetail() {
				let URL = this.__webserver__ + 'cargoSource/detail';
				var params = {
					"id": this.cargoSourceID
				};
				this.$http.get(URL,{params:params}).then(
					(res) => {
						if (res.body.code == 200) {
							this.goodsDetail = res.body.data;
							this.$nextTick(() => {
								if (this.goodsDetail.headPicture) {
									this.headPicture = this.__imgserver__ + this.goodsDetail.headPicture;
								};
							})
							console.log(JSON.stringify(res.body.data));
						}
					},
					(res) => {
						console.log(JSON.stringify(res.body));
					}
				)
			}
		},
		components: {
			ImgLightBox,
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
		width 568px
		color #585757
		.title
			font-weight bold
			color #878787
		label
			color #afafaf
		.ownerInfo
			padding 0 100px
			position relative
			height 90px
			overflow hidden
			
			.ownerPic
				width 90px
				height 90px
				border-radius 4px
				position absolute
				left 0
				top 0
			p
				line-height 23px
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
			border-bottom 1px dashed #ebebeb
			padding 10px 0
			margin 10px 0
			line-height 30px
			.lineInfo
				width 180px
				height 60px
				p
					width 150px
					height 30px
					line-height 30px
					text-overflow ellipsis
					white-space nowrap
					overflow hidden
					&.start
						background url('../../../static/img/start_icon.png') no-repeat left center
						padding-left 30px
					&.end
						background url('../../../static/img/end_icon.png') no-repeat left center
						padding-left 30px
			.otherInfo
				li
					float left
					width 180px
					line-height 24px
					&:nth-child(2n)
						width 368px
						padding-left 30px
					&:nth-child(3)
						color #fe603b
						font-size 20px
			.detail
				width 368px
				padding-left 10px
				height 60px
				line-height 20px
				li
					width 50%
					float left
		.demand
			position relative
			line-height 24px
			li
				float left
				width 180px
				label
					color #afafaf
					text-align right
				&:nth-child(2n)
					width 368px
					padding-left 30px
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
.similar
	background #fff
	border 1px solid #f0f0f0
	padding 10px 9px
	border-radius 4px
	.title
		font-size 12px
		font-weight bold
		color #878787
		height 30px
		line-height 30px
	.item
		width 145px
		float left
		margin-right 12px
		color #585757
		&:last-child
			margin-right:0
		.goodsPic
			width 145px
			height 108px
		.sort_bg
			background rgba(255,255,255,.5)
			position absolute
			bottom 0
			padding 2px 5px
			left 0
			right 0 
			text-align right
		p
			line-height 24px
			height 24px
			width 145px
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
		.pushBtn
			color #6cc
			border-radius 4px
			border 1px solid #6cc
			height 28px
			line-height 28px
			width 90px
			text-align center
			margin 10px auto 0
			display block
			
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