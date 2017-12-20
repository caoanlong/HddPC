<template>
	<div>			
		<div class="tit">用户信息</div>

		<div class="con">
			<div class="authenticationStatus">认证状态：<span class="c1">认证成功!</span> 您已认证成功，可进行发货找货相关操作，有任何疑问可拨打客服热线：400-xxx-xxxx</div>
			<!-- <p class="error_tips">这段红字为认证失败的原因描述，由后台传输给前台展示</p> -->
			<div class="title">基本信息</div>
			<div class="info-con">
				<div class="form-item">
		        	<span class="labels">本人正面照片</span>
					<ImagePerview :width="100" :height="100" :fileUrl="frontFaceImg"></ImagePerview>
		        </div>
				<div class="form-item">
		        	<span class="labels">真实姓名</span>
					<p v-text="memberBaseInfo.person.realName"></p>
		        </div>
		        <div class="form-item">
		        	<span class="labels">身份证号</span>
					<p v-text="memberBaseInfo.person.iDCardNum"></p>
		        </div>
		        <div class="form-item">
		        	<span class="labels">身份证正面</span>
					<ImagePerview :width="100" :height="100" :fileUrl="frontIDCardImg"></ImagePerview>
		        </div>
		        <div class="form-item">
		        	<span class="labels">角色</span>
					<p v-if="memberBaseInfo.member.type == 'NoTruck'">无车承运人</p>
					<p v-else-if="memberBaseInfo.member.type == '3PL'">物流企业</p>
					<p v-else-if="memberBaseInfo.member.type == 'InfoDept'">物流信息部</p>
					<p v-else-if="memberBaseInfo.member.type == 'IndShipper'">个人货主</p>
					<p v-else-if="memberBaseInfo.member.type == 'Driver'">司机</p>
					<p v-else-if="memberBaseInfo.member.type == 'Staff'">员工</p>
		        </div>
			</div>
			<div class="title">企业信息</div>
			<div class="info-con">
				<div class="form-item">
		        	<span class="labels">公司名称</span>
					<p v-text="memberBaseInfo.enterprice.companyname"></p>
		        </div>
		        <div class="form-item">
		        	<span class="labels">所在区域</span>
					<p>{{memberBaseInfo.enterprice.baseArea.fullName|clearComma}}</p>
		        </div>
		        <div class="form-item">
		        	<span class="labels">详细地址</span>
					<p v-text="memberBaseInfo.enterprice.gpsaddress"></p>
		        </div>
		        <div class="form-item">
		        	<span class="labels">门头照</span>
					<ImagePerview :width="100" :height="100" :fileUrl="doorImg"></ImagePerview>
		        </div>
		        <div class="form-item">
		        	<span class="labels">营业执照</span>
					<ImagePerview :width="100" :height="100" :fileUrl="licenseImg"></ImagePerview>
		        </div>
		        <div class="form-item">
		        	<span class="labels">道路运输许可证</span>
					<ImagePerview :width="100" :height="100" :fileUrl="roadTransPermitImg"></ImagePerview>
		        </div>
		        <div class="form-item">
		        	<router-link :to="{name:'CompleteInfo',query:{active:31}}" tag="button" type="button" class="authenticationBtn">重新认证</router-link>
		        </div>
			</div>
		</div>
	</div>
</template>
<script>
	import ImagePerview from '../commonComponents/ImagePerview'
	export default {
		data() {
			return {
				memberBaseInfo: {
					"enterprice": {
						"baseArea": {}
					},
					"person": {
						"memCertifyPersonPicture": {}
					},
					"member": {}
				},
				frontFaceImg: '',
				frontIDCardImg: '',
				doorImg: '',
				licenseImg: '',
				roadTransPermitImg: '',
			}
		},
		computed: {
			memberInfo() {
				return this.$store.state.memberInfo;
			}
		},
		created() {
			this.getMemberBaseInfo();
		},
		methods: {
			getMemberBaseInfo() {
				let URL = this.__webserver__ + 'certify/enterprice/detail';
				var params = {
					memID: this.memberInfo.memID
				};
				this.$http.get(URL,{params:params}).then((res) => {
					if (res.body.code == 200) {
						// console.log(JSON.stringify(res.body.data));
						this.memberBaseInfo = res.body.data;
						this.$nextTick(() => {
							if (this.memberBaseInfo.person.memCertifyPersonPicture.pictureFront) {
								this.frontFaceImg = this.__imgserver__ + this.memberBaseInfo.person.memCertifyPersonPicture.pictureFront;
							};
							if (this.memberBaseInfo.person.memCertifyPersonPicture.iDCardFrontPic) {
								this.frontIDCardImg = this.__imgserver__ + this.memberBaseInfo.person.memCertifyPersonPicture.iDCardFrontPic;
							};
							if (this.memberBaseInfo.memCertifyEnterpricePicture.companyFacadePic) {
								this.doorImg = this.__imgserver__ + this.memberBaseInfo.memCertifyEnterpricePicture.companyFacadePic;
							};
							if (this.memberBaseInfo.memCertifyEnterpricePicture.businessLicensePic) {
								this.licenseImg = this.__imgserver__ + this.memberBaseInfo.memCertifyEnterpricePicture.businessLicensePic;
							};
							if (this.memberBaseInfo.memCertifyEnterpricePicture.transportationLicensePicID) {
								this.roadTransPermitImg = this.__imgserver__ + this.memberBaseInfo.memCertifyEnterpricePicture.transportationLicensePicID;
							};
						})
					}else {
						this.showMsg(this,{msg: res.body.message,delay: 1000});
					}
				})
			},
		},
		components: {
			ImagePerview
		}
	}
</script>
<style lang="stylus" scoped>
	.tit
		color #878787
		font-weight bold
		height 40px
		line-height 40px
		padding 0 20px
		border-bottom 1px solid #f0f0f0
		font-size 14px
	.con
		padding 20px
		.authenticationStatus
			padding: 10px 15px
			background #f6f6f6
			border-radius 4px
			color #878787
		.error_tips
			color #ff5d44
			padding: 10px 15px
		.title
			font-size 14px
			font-weight bold
			padding: 10px 15px
			color #666
		.info-con
			padding-left 100px
		.form-item
			padding-left 140px
			position relative
			margin-bottom 15px
			min-height 40px
			.labels
				width 130px
				padding-right 5px
				position absolute
				left 0
				top 0
				height 40px
				line-height 40px
				text-align right
				color #6cc
			p
				line-height 40px

			img
				width 96px
				height 96px
				border-radius 4px
		.authenticationBtn
			background rgba(102,204,204,1)
			color #fff
			border none
			height 40px
			line-height 40px
			border-radius 4px
			font-size 14px
			padding:0 20px
			outline none
			cursor pointer
			&:hover
				background rgba(102,204,204,.9)
			&:active
				background rgba(102,204,204,.95)
			&[disabled]
				border 1px solid #dddee1
				background #f7f7f7
				cursor not-allowed
				color #ddd
</style>