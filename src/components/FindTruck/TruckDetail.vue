<template>
	<div class="lside fl">
		<div class="preview-wrap clearfix">
			<div class="itemInfo-wrap clearfix">
				<img :src="__imgserver__ + truckSourceDetail.headPicture" class="driverPic"  @error="errorImg"/>
				<div class="driverInfo">
					<p>
						<span><label>驾驶员：</label>{{truckSourceDetail.realName}}</span><span><label>电话：</label>{{truckSourceDetail.mobile}}</span>
					</p>
					<p><label>车牌号：</label>{{truckSourceDetail.plateNo}}</p>
				</div>
				<div class="truckInfo">
					<p><span><label>车型：</label>{{truckSourceDetail.truckLengthName}}</span><span><label>车长：</label>{{truckSourceDetail.truckTypeName}}</span><span><label>载重：</label>{{truckSourceDetail.loads}}吨</span></p>
					<p><label>位置：</label>{{truckSourceDetail.posAreaName}}</p>
				</div>
				<div class="otherInfo">
					<p><span class="c1"><label>平台承运：</label>{{truckSourceDetail.waybillNum ? truckSourceDetail.waybillNum : '0'}}笔</span><span class="c1"><label>累计里程：</label>{{truckSourceDetail.mileage ? truckSourceDetail.mileage : '0'}}km</span><span class="c1"><label>好评率：</label>{{truckSourceDetail.feedbackRate}}%</span></p>
				</div>
				<router-link :to="{name: 'SendGoods',query: {memID: truckSourceDetail.memIDStr}}" class="pushBtn" v-if="isLogin && truckSourceDetail.certifyStatus =='Y'">推送货源</router-link>
			</div>
		</div>
		<!-- 车源详情 Start-->
		<div class="detail mt clearfix">
			<ul class="hd">
				<li :class="{'on':tab==1}" @click="tab = 1">车辆位置</li>
				<li :class="{'on':tab==2}" @click="tab = 2">常跑路线</li>
				<li :class="{'on':tab==3}" @click="getAuthenticationInfo">认证信息</li>
			</ul>
			<div class="bd">
				<div class="tabCon" v-show="tab==1">
					<baidu-map class="map"
						:center="{lng: lng, lat: lat}"
						:zoom="15">
						<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
						<bm-marker :position="{lng: lng, lat: lat}"></bm-marker>
						<bm-info-window :position="{lng: lng, lat: lat}" title="详细地址：" :show="true">
					      	<strong v-text="truckSourceDetail.posAreaName"></strong>
					    </bm-info-window>
					</baidu-map>
				</div>
				<div class="tabCon clearfix"  v-show="tab==2">
					<ul class="oftenLine">
						<li v-for="item in truckSourceDetail.recentlineList" key="item" ><p class="lineInfo fl"><span class="start">{{item.areaFromName}}</span><span class="arrow"></span><span class="end">{{item.areaToName}}</span></p></li>
					</ul>
				</div>
				<div class="tabCon clearfix" v-show="tab==3">
					<ul class="attentionInfo text-right fl">
						<li>
							<label>身份证</label>
							<p>
								<span class="attention" v-if="AuthenticationInfo.iDCardAuditStatus=='N'">未认证</span>
								<span class="attentioned" v-else>已认证</span>
							</p>
						</li>
						<li>
							<label>驾驶证</label>
							<p>
								<span class="attention" v-if="AuthenticationInfo.driverLicenseAuditStatus=='N'">未认证</span>
								<span class="attentioned" v-else>已认证</span>
							</p>
						</li>
						<li>
							<label>行驶证</label>
							<p>
								<span class="attention" v-if="AuthenticationInfo.drivingLicenseAuditStatus=='N'">未认证</span>
								<span class="attentioned" v-else>已认证</span>
							</p>
						</li>
					</ul>
					<ul class="attentionInfo text-right fr">
						<li>
							<label>从业资格证</label>
							<p>
								<span class="attention" v-if="AuthenticationInfo.qualificationAuditStatus=='N'">未认证</span>
								<span class="attentioned" v-else>已认证</span>
							</p>
						</li>
						<li>
							<label>道路运输许可证</label>
							<p>
								<span class="attention" v-if="AuthenticationInfo.transportLicenceAuditStatus=='N'">未认证</span>
								<span class="attentioned" v-else>已认证</span>
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
                truckSourceDetail: {},
                lng: 0,
                lat: 0,
                AuthenticationInfo: {},
                isAuth: false
            }
        },
        computed: {
			isLogin () {
				return localStorage.getItem('memberInfo') && localStorage.getItem('authorization')
			}
		},
        created() {
        	this.getTruckDetail();
        },
        http: {
		    headers: {
		      'Authorization': localStorage.getItem('authorization')||''
		    }
		},
        methods: {
        	errorImg (e) {
                e.target.src = defaultImg
                e.target.onerror = null
            }, 
            getAuthenticationInfo() {
            	this.tab =3
            	if (this.isAuth) {
            		return
            	}
            	this.isAuth =true
            	let URL = ''
				if(this.isLogin){
					URL = this.__webserver__ + 'mem/certifyPerson/findByMemId'
				}
				else{
					URL = this.__webserver__ + 'adv/mem/certifyPerson/findByMemId'
				}
				let params = {
					"memID": this.$route.query.memID
				}
				this.$http.get(URL,{params:params}).then(
					(res) => {
						if (res.body.code == 200) {
							this.AuthenticationInfo = res.body.data
							// console.log(res.body.data)
						}
					}
				)
            },
        	getTruckDetail() {
        		let URL = ''
				if(this.isLogin){
					URL = this.__webserver__ + 'truck/fleet/findByMemID'
				}else{
					URL = this.__webserver__ + 'adv/truck/detail'
				}
				let params = {
					"memID": this.$route.query.memID
				}
				this.$http.get(URL,{params:params}).then((res) => {
					if (res.body.code == 200) {
						this.truckSourceDetail = res.body.data;
						this.$nextTick(() => {
							this.lng = this.truckSourceDetail.lng
							this.lat = this.truckSourceDetail.lat
						})
						// console.log(res.body.data)
					}
				})
			}
        },
		components: {
			ImagePerview
		}
	}
</script>
<style lang="stylus" scoped>
	.lside
		width 950px
		.preview-wrap
			border 1px solid #f0f0f0
			padding 10px 10px 20px 170px
			background #fff
			border-radius 4px
			min-height 162px
			position relative
			color #585757
			.driverPic
				width 140px
				height 140px
				border-radius 4px
				position absolute
				left 10px
				top 10px
			p
				line-height 30px
				height 30px
				font-size 14px
				overflow hidden
				span
					margin-right 40px
				label
					color #afafaf
			.truckInfo
				padding 10px 0
			.otherInfo
				padding-bottom 20px
			.pushBtn
				padding 0 20px 0 30px
				height 28px
				line-height 28px
				display inline-block
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
							color #f60
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