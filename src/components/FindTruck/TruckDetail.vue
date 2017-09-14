<template>
	<div class="lside fl">
		<div class="preview-wrap clearfix">
			<ImgLightBox :data="truckSourceDetail"></ImgLightBox>
			<div class="itemInfo-wrap fr">
				<div class="driverInfo">
					<img v-if="headPicture" :src="headPicture" class="driverPic"/>
					<img v-else src='../../assets/img/defaultImg.svg' class="driverPic"/>
					<p>
						<label>姓名：</label>{{truckSourceDetail.memMember.realName}}
						<RateDisplay :score="truckSourceDetail.memMember.score"></RateDisplay>
					</p>
					<p><label>年龄：</label>27岁</p>
					<p><label>驾龄：</label>5年</p>
					<span class="attention attentioned" v-if="truckSourceDetail.isFocus=='Y'">已关注</span>
					<span class="attention" v-else-if="truckSourceDetail.isFocus=='N'">未关注</span>
				</div>
				<div class="lineInfo">
					<p class="title">期待路线</p>
					<p class="start">{{truckSourceDetail.trucksource.areaFromBaseArea.fullName|clearComma}}</p>
					<p class="end">
						<span v-for="(item,i) in truckSourceDetail.trucksource.areaToBaseAreaList">{{item.fullName|clearComma}}<b v-show="i!=truckSourceDetail.trucksource.areaToBaseAreaList.length-1">，</b></span>
					</p>
				</div>
				<div class="truckInfo clearfix">
					<p class="title">车辆信息</p>
					<ul>
						<li><label>车牌：</label>{{truckSourceDetail.memTruck.plateNo}}</li>
						<li><label>车龄：</label>{{truckSourceDetail.memTruck.mileage}}年</li>
						<li><label>车型：</label>{{truckSourceDetail.memTruck.typeName.name}}</li>
						<li><label>电话：</label>{{truckSourceDetail.memMember.mobile}}</li>
						<li><label>车长：</label>{{truckSourceDetail.memTruck.lengthName.name}}</li>
						<li>
							<label>可装货时间：</label>
							<span class="c1">{{truckSourceDetail.trucksource.loadingDate}}
								<span v-if="truckSourceDetail.trucksource.loadingTimeSlot=='NoLimit'">全天</span>
								<span v-else-if="truckSourceDetail.trucksource.loadingTimeSlot=='AM'">上午</span>
								<span v-else-if="truckSourceDetail.trucksource.loadingTimeSlot=='PM'">下午</span>
								<span v-else-if="truckSourceDetail.trucksource.loadingTimeSlot=='Night'">晚上</span>
								<span v-else-if="truckSourceDetail.trucksource.loadingTimeSlot=='Limit'"></span>
							</span>
						</li>
						<li><label>载重：</label>{{truckSourceDetail.memTruck.loads}}吨</li>
						<li><label>发布时间：</label>{{truckSourceDetail.trucksource.createTime}}</li>
					</ul>
					<router-link :to="{name: 'SendGoods',query: {truckSourceID: truckSourceID}}" class="pushBtn">推送货源</router-link>
				</div>
			</div>
		</div>
		<!-- 车源详情 Start-->
		<div class="detail mt clearfix">
			<ul class="hd">
				<li :class="{'on':tab==1}" @click="tab = 1">车辆位置</li>
				<li :class="{'on':tab==2}" @click="tab = 2">常跑路线</li>
				<li :class="{'on':tab==3}" @click="tab = 3">认证信息</li>
			</ul>
			<div class="bd">
				<div class="tabCon" v-show="tab==1">
					<baidu-map class="map"
						:center="{lng: lng, lat: lat}"
						:zoom="15">
						<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
						<bm-marker :position="{lng: lng, lat: lat}"></bm-marker>
						<bm-info-window :position="{lng: lng, lat: lat}" title="详细地址：" :show="true">
					      	<strong v-text="truckSourceDetail.trucksource.posAddress"></strong>
					    </bm-info-window>
					</baidu-map>
				</div>
				<div class="tabCon clearfix"  v-show="tab==2">
					<ul class="oftenLine">
						<li v-for="i in 5"><p class="lineInfo fl"><span class="start">广东深圳</span><span class="arrow"></span><span class="end">云南西双版纳</span></p><p class="GoodsInfo fr">食品 30吨 45方 裸装</p></li>
					</ul>
				</div>
				<div class="tabCon clearfix" v-show="tab==3">
					<ul class="attentionInfo text-righ fl">
						<li>
							<label>本人正面照片</label>
							<p>
								<ImagePerview :width="40" :height="40" class="fr" :fileUrl="headPicture"></ImagePerview>
							</p>
						</li>
						<li>
							<label>真实姓名</label>
							<p v-text="truckSourceDetail.memMember.realName"></p>
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
							<p v-text="truckSourceDetail.trucksource.posAddress"></p>
						</li>
						<li>
							<label>门头照</label>
							<p>
								<ImagePerview :width="40" :height="40" class="fr" :fileUrl="doorImg"></ImagePerview>
							</p>
						</li>
						<li>
							<label>营业执照</label>
							<p>
								<ImagePerview :width="40" :height="40" class="fr" :fileUrl="licenseImg"></ImagePerview>
							</p>
						</li>
						<li>
							<label>道路运输许可证</label>
							<p>
								<ImagePerview :width="40" :height="40" class="fr" :fileUrl="roadTransPermitImg"></ImagePerview>
							</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 车源详情 End -->
		<!-- 类似车源 Start-->
		<div class="similar mt clearfix">
			<div class="title">类似车源</div>
			<div class="con">
				<div class="item">
					<div class="truckPic posr">
						<img src="../../../static/img/truck_img.jpg"/>
						<div class="Status">
							<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
							<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
							<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
							<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
					<div class="mt text-center"><router-link :to="{name: 'SendGoods',query: {truckSourceID: truckSourceID}}" class="pushBtn">推送货源</router-link></div>
				</div>
				<div class="item">
					<div class="truckPic posr">
						<img src="../../../static/img/truck_img.jpg"/>
						<div class="Status">
							<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
							<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
							<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
							<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
					<div class="mt text-center"><router-link :to="{name: 'SendGoods',query: {truckSourceID: truckSourceID}}" class="pushBtn">推送货源</router-link></div>
				</div>
				<div class="item">
					<div class="truckPic posr">
						<img src="../../../static/img/truck_img.jpg"/>
						<div class="Status">
							<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
							<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
							<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
							<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
					<div class="mt text-center"><router-link :to="{name: 'SendGoods',query: {truckSourceID: truckSourceID}}" class="pushBtn">推送货源</router-link></div>
				</div>
				<div class="item">
					<div class="truckPic posr">
						<img src="../../../static/img/truck_img.jpg"/>
						<div class="Status">
							<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
							<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
							<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
							<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
					<div class="mt text-center"><router-link :to="{name: 'SendGoods',query: {truckSourceID: truckSourceID}}" class="pushBtn">推送货源</router-link></div>
				</div>
				<div class="item">
					<div class="truckPic posr">
						<img src="../../../static/img/truck_img.jpg"/>
						<div class="Status">
							<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
							<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
							<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
							<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
					<div class="mt text-center"><router-link :to="{name: 'SendGoods',query: {truckSourceID: truckSourceID}}" class="pushBtn">推送货源</router-link></div>
				</div>
				<div class="item">
					<div class="truckPic posr">
						<img src="../../../static/img/truck_img.jpg"/>
						<div class="Status">
							<span class="truckStatus truckStatus1" v-if="truckStatus==1">运输中<b>回</b></span>
							<span class="truckStatus truckStatus2" v-else-if="truckStatus==2">运输中</span>
							<span class="truckStatus truckStatus3" v-else-if="truckStatus==3">空车<b>回</b></span>
							<span class="truckStatus truckStatus4" v-else="truckStatus==4">空车</span>
						</div>
					</div>
					<p>云A·12345</p>
					<p>集装箱车/6.8米/35吨</p>
					<p class="start">广东 深圳</p>
					<p class="end">云南 西双版纳、云南 昆明、黑龙江 齐齐哈尔</p>
					<div class="mt text-center"><router-link :to="{name: 'SendGoods',query: {truckSourceID: truckSourceID}}" class="pushBtn">推送货源</router-link></div>
				</div>
			</div>
		</div>
		<!-- 类似车源 End -->
	</div>
</template>
<script>
	import ImgLightBox from '../commonComponents/ImgLightBox'
	import ImagePerview from '../commonComponents/ImagePerview'
	import RateDisplay from '../commonComponents/RateDisplay'
	export default {
		props: {
			truckStatus:{
				type: Number,
				default:1
			}
		},
		data () {
            return {
            	tab: 1,
                truckSourceDetail: {
                	"memMember": {
                	},
                	"memTruck":{
                		"lengthName":{},
                		"typeName":{},
                	},
                	"trucksource": {
                		"areaFromBaseArea": {},
                		"areaToBaseAreaList": [],
                	}
                },
                headPicture: '',
                doorImg: '',
                licenseImg: '',
                roadTransPermitImg: '',
                lng: 0,
                lat: 0,
            }
        },
        computed: {
        	truckSourceID() {
        		return this.$route.query.truckSourceID
        	}
        },
        created() {
        	this.getTruckDetail();
        },
        methods: {
        	getTruckDetail() {
				let URL = this.__webserver__ + 'truck/fleet/findTruckSourceInfo';
				var params = {
					"truckSourceID": this.truckSourceID
				};
				this.$http.post(URL,params).then(
					(res) => {
						console.log(JSON.stringify(res.body.msg));
						if (res.body.code == 200) {
							this.truckSourceDetail = res.body.data;
							this.$nextTick(() => {
								this.lng = this.truckSourceDetail.trucksource.lng;
								this.lat = this.truckSourceDetail.trucksource.lat;
								if (this.truckSourceDetail.memMember.headPicture) {
									this.headPicture = this.__imgserver__ + this.truckSourceDetail.memMember.headPicture;
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
			RateDisplay
		}
	}
</script>
<style lang="stylus" scoped>
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
				.driverInfo
					padding 0 100px
					position relative
					height 90px
					.driverPic
						width 90px
						height 90px
						border-radius 4px
						position absolute
						left 0
						top 0
					p
						line-height 30px
						font-size 14px
						label
							color #afafaf
					.attention
						background url('../../../static/img/attention_icon.png') no-repeat 8px center
						padding 0 20px 0 30px
						color #d4d4d4
						height 28px
						line-height 28px
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
				.lineInfo
					border-top 1px dashed #ebebeb
					border-bottom 1px dashed #ebebeb
					padding 10px 0
					margin 10px 0
					line-height 30px
					.start
						background url('../../../static/img/start_icon.png') no-repeat left center
						padding-left 30px
					.end
						background url('../../../static/img/end_icon.png') no-repeat left center
						padding-left 30px
				.truckInfo
					padding-right 140px
					position relative
					line-height 24px
					li
						float left
						width 180px
						label
							color #afafaf
							text-align right
						&:nth-child(2n)
							width 244px
							label
								width 100px
								display inline-block
					.pushBtn
						position absolute
						right 10px
						padding 0 20px 0 30px
						bottom 0
						height 28px
						line-height 28px
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
				li
					float left
					font-size 14px
					font-weight bold
					color #bababa
					background-color #eaeaea
					height 36px
					line-height 36px
					padding 0 20px 0  40px
					border 1px solid #f0f0f0
					border-width 1px 0 0 1px
					cursor pointer
					&:first-child
						border-radius 4px 0 0 0
						background url('../../../static/img/Detail_icon1.png') 20px center no-repeat
						&.on
							background-image url('../../../static/img/Detail_icon1_on.png')
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
				.map
					width 100%
					height 400px
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
				.truckPic
					width 145px
					height 108px
					img
						width 145px
						height 108px
					.Status
						position absolute
						bottom 0
						padding: 5px
						left 0
						right 0
						text-align right
						background rgba(255,255,255,.5)
				p
					line-height 24px
					height 24px
					width 144px
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
					line-height 26px
					padding 0 20px
					display inline-block
					text-align center
	.truckStatus
		border 1px solid transparent
		border-radius 4px
		margin-left 5px
		background #fff;
		&.truckStatus1
			border-color #20a0ff
			color #20a0ff
			padding:1px 20px 1px 5px
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
				font-weight normal
				right 0
				top 0
				border-radius 0 4px 4px 0
		&.truckStatus2
			border-color #20a0ff
			color #20a0ff
			padding:1px 13px
		&.truckStatus3
			border-color #6cc
			color #6cc
			padding:1px 26px 1px 11px
			position relative
			b
				color #fff
				background #6cc
				font-style normal
				height 16px
				line-height 16px
				display inline-block
				font-weight normal
				width 16px
				text-align center
				position absolute
				right 0
				top 0
				border-radius 0 4px 4px 0
		&.truckStatus4
			border-color #6cc
			color #6cc
			padding:1px 19px
</style>