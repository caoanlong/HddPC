<template>
	<div>
		<div class="content">
			<div class="page-w posr">
				<div class="accountBox">
					<div class="accountForm">
						<div class="tab">
							<div class="hd">
								<ul>
									<li :class="{'on':isLogin}" @click="tabLoginRegister(true)">登录</li>
									<li :class="{'on':!isLogin}" @click="tabLoginRegister(false)">注册</li>
								</ul>
							</div>
							<div class="bd">
								<!--登录注册-->
								<div class="tabCon">
								    <div class="form-item">
								    	<input type="text" placeholder="请输入手机号" class="text-input phone" v-model="mobile" :maxlength="11"/>
								    </div>
								    <div class="form-item">
								    	<input type="text" placeholder="手机验证码" class="text-input VcodeInput" v-model="vCode" :maxlength="6"/>
								    	<button :disabled="$v.mobile.$invalid||isGetVCode" v-text="getVcodeText" @click.stop="getVcode()" class="GetVcode"></button>
								    </div>
								    <div class="form-item checkboxItem" v-show="isLogin">
										<CheckBox content="一个月内记住登录状态"></CheckBox>
									</div>
								    <div class="form-item checkboxItem" v-show="!isLogin">
							        	<CheckBox content="我已阅读并同意" @isChecked="agreement"></CheckBox>
							        	<span class="c2 agreementBtn" @click="showRegisterRule">《货多多注册条款》</span>
							        </div>
								    <div class="form-item">
										<button :disabled="$v.validationGroup.$invalid" type="button" v-show="isLogin" @click.stop="signin()" class="btn loginBtn">登录</button>
										<button :disabled="$v.validationGroup.$invalid||!isAgree" type="button" v-show="!isLogin" @click="register()" class="btn regBtn">注册</button>
								    </div>
									<div class="tips" v-show="isLogin">
										<ul>
											<li>登录后，您将可以：</li>
											<li>1. 发布货源信息，让客户主动来找您。</li>
											<li>2. 管理自己的车队。</li>
											<li>3. 查询海量真实车源。</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="page-w">
			<div class="partner">
				<div class="tit"><span>合作伙伴</span></div>
				<div class="partnerList text-center">
					<img src="../../static/img/partner.jpg" />
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import CheckBox from './commonComponents/CheckBox'
	import { required,minLength,maxLength } from 'vuelidate/lib/validators'
	export default {
		data() {
			// const validateMobile = (rule, value, callback) => {
   //              if (value === '') {
   //              	this.isCorrectMobile = false;
   //                  callback(new Error('手机号不能为空'));
   //              } else {
   //                  if(!(/^1[34578]\d{9}$/.test(value))){
   //                  	this.isCorrectMobile = false;
   //                  	callback(new Error('手机号格式不正确')); 
			// 	    }else {
			// 	    	this.isCorrectMobile = true;
			// 	    }
   //                  callback();
   //              }
   //          };
   //          const validateVCode = (rule, value, callback) => {
   //              if (value === '') {
   //              	this.isCorrectVCode = false;
   //                  callback(new Error('验证码不能为空'));
   //              } else {
   //                  if(!(/^\d{6}$/.test(value))){
   //                  	this.isCorrectVCode = false;
   //                  	callback(new Error('验证码格式不正确')); 
			// 	    }else {
			// 	    	this.isCorrectVCode = true;
			// 	    }
   //                  callback();
   //              }
   //          };
			return {
				mobile: '',
                vCode: '',
				isLogin: true,
				getVcodeText: '点击获取',
				isGetVCode: false,
				wait: 30,
				isAgree: false
			}
		},
		validations: {
		    mobile: {
		      	required
		    },
		    vCode: {
		      	required
		    },
		    validationGroup: ['mobile', 'vCode']
		},
		created() {
			this.$store.commit({type:'selectChange',selected:-1});
		},
		methods: {
            tabLoginRegister(boolean) {
            	this.isLogin = boolean;
            	this.mobile = '';
            	this.vCode = '';
            },
            agreement(boolean) {
            	this.isAgree = boolean;
            },
			getVcode() {
				if (this.isGetVCode) {
					return
				};
				this.timeGo();
				let URL = this.__webserver__ + 'verifyCode';
				var params = {
					"mobile": this.mobile
				};
				this.$http.post(URL, params).then(
					(res) => {
						this.msg('短信验证码：'+ res.body.data);
						console.log(JSON.stringify(res.body));
					},
					(res) => {
						console.log(JSON.stringify(res.body));
					}
				)
			},
			register() {
				let URL = this.__webserver__ + 'register';
				var params = {
					"mobile": this.mobile,
					"verifyCode": this.vCode
				};
				this.$http.post(URL,params).then(
					(res) => {
						if (res.body.code == 200) {
							//存入缓存
							this.$store.commit('login',JSON.stringify(res.body.data));
							//判断是否认证
							if (res.body.data.certifyStatus == 'Y') {
								this.msg({
									content:'注册成功',
									time: 1000
								});
								this.$router.push({name:'Home'});
							}else {
								let that = this;
								this.modal({
									width: '320px',
									title: '提示',
									content: `<strong>注册成功</strong>
											<p>为了方便您的后续操作</p>
											<p>请完善资料</p>`,
									icon: '2',
									btn: ['完善资料','继续逛逛'],
									sure: function() {
										that.$router.push({name:'CompleteInfo',query:{active:32}});
									},
									cancel: function() {
										that.$router.push({name:'Home'});
									},
								})
							}
						}else {
							this.msg({
								content: res.body.message,
								time: 1000
							});
						}
					},
					(res) => {
						this.msg({
							content:'请求失败',
							time: 1000
						});
						console.log(JSON.stringify(res.body));
					}
				)
			},
			signin() {
				let URL = this.__webserver__ + 'signin';
				var params = {
					"mobile": this.mobile,
					"verifyCode": this.vCode
				};
				this.$http.post(URL,params).then(
					(res) => {
						console.log(res.headers.get('authorization'));
						if (res.body.code == 200) {
							//存入缓存
							// 18627208285
							console.log(res.headers)
							// console.log(res.body.data)
							localStorage.setItem('authorization',res.headers.get('authorization'))
							// localStorage.setItem('memInfo',JSON.stringify(res.body.data))
							this.$store.commit('login',JSON.stringify(res.body.data));
							//判断是否认证
							if (res.body.data.certifyStatus == 'Y') {
								this.msg({
									content:'登录成功',
									time: 1000
								});
								this.$router.push({name:'Home'});
							}else {
								let that = this;
								this.modal({
									width: '320px',
									title: '提示',
									content: `<strong>登录成功</strong>
											<p>为了方便您的后续操作</p>
											<p>请完善资料</p>`,
									icon: '2',
									btn: [
										{
											text:'完善资料',
											class: 'primary'
										},{
											text:'继续逛逛',
											class: 'default'
										}
									],
									sure: function() {
										that.$router.push({name:'CompleteInfo',query:{active:32}});
									},
									cancel: function() {
										that.$router.push({name:'Home'});
									},
								})
							}
						}else {
							this.msg({
								content: res.body.message,
								time: 1000
							});
						}
					},
					(res) => {
						this.msg({
							content:'请求失败',
							time: 1000
						});
						console.log(JSON.stringify(res.body));
					}
				)
			},
			timeGo() {
				if (this.wait == 0) {
					this.getVcodeText = '点击获取';
					this.isGetVCode = false;
					this.wait = 30;
					return;
				} else {
					var that = this;
					this.isGetVCode = true;
					this.getVcodeText = this.wait+'s';
					this.wait--;
					setTimeout(function() {
						that.timeGo();
					}, 1000)
				}
			},
			showRegisterRule() {
				let that = this;
				this.modal({
					content: `<p>一、前言</p>
					<p>本合作协议内容包括合作协议正文、《货多多纠纷处理规则（司机被放空保障）》、《货多多消费规则》及将来可能发布的各类规则或补充协议。所有规则为合作协议不可分割的一部分，与合作协议正文具有同等法律效力，当您点击鼠标确认或通过访问、注册、预定或以任何方式进入货多多或使用货多多服务均表示您已充分阅读、理解并同意接受本协议，接受了以下协议的约束。</p>
					<p>二、 定义</p>
					<p>1、【货多多】：是中国公路物流行业领导者深圳前海微服大数据科技有限公司（以下简称货多多或货多多平台）旗下针对长途货运市场设计的物流信息交易平台。该平台努力打造以配货为功能核心，以支付为盈利点，以增值服务扩展功能的全国运力平台，逐步成为长途司机服务第一入口，又称“货多多平台”。</p>
					<p>2、【认证会员】：物流企业（个人会员）要求两证（个人身份证、本人名片）认证通过，并且上传真实头像。物流企业（企业会员）要求（法人身份证、营业执照）认证通过。司机要求三证（身份证、驾驶证、行驶证）认证通过，并且上传真实头像</p>
					<p>3、【司机】：承载货物运输的个人或企业。</p>
					<p>4、【物流企业】：委托货物运输的个人或企业。</p>
					<p>5、【交易争议处理】：认证会员一方或双方在使用货多多交易的过程中产生交易争议，因无法自行协商或协商不能达成一致，一方或双方申请提交货多多进行协商处理。</p>
					<p>6、【投诉方】：指在货多多上发起交易争议处理诉求的用户。</p>
					<p>7、【被投诉方】：指投诉方投诉的对象（自然人、法人和其他组织）。</p>
					<p>8、【黑名单】：货多多构建的物流行业诚信体系内的一项重要内容，主要针对物流行业内的行为主体所发生的一系列纠纷、拖欠运费、欺诈等不诚信行为所作出的名单公示，将不诚信企业或个人的信息列入诚信体系内以示警惕 ，防止不诚信行为的再次发生，规范行业秩序。</p>`,
					width: '500px',
					title: '《货多多注册条款》',
					btn: [{
						text:'确定',
						class: 'primary'
					}]
				})
			}
		},
		components: {
			CheckBox
		}
	}
</script>
<style lang="stylus" scoped>
	.content
		background url('../../static/img/login_bg.jpg') no-repeat top center
		width 100%
		height 734px
		.accountBox
			position absolute
			top 130px
			right 120px
			width 416px
			padding 18px
			background rgba(102,204,204,0.7)
			border-radius 10px
			height 506px
			.accountForm
				background #fff
				width 380px
				height 470px
				padding 0 20px 20px
				border-radius 10px
				.phone
					background url('../assets/img/phone.png') no-repeat 10px center
					padding-left 36px
				.VcodeInput
					width 216px
					margin-right 20px
					background url('../assets/img/vcode.png') no-repeat 12px center
					padding-left 36px
				.GetVcode
					height 40px
					line-height 40px
					display inline-block
					border 1px solid #dddee1
					background #f7f7f7
					cursor pointer
					border-radius 4px
					color #666
					width 100px
					outline none
					&:hover
						background #fff
						color #6cc
						border-color #6cc
					&[disabled]
						border 1px solid #dddee1
						background #f7f7f7
						cursor not-allowed
						color #ddd
						&:hover
							background #f7f7f7
							border-color #dddee1
							color #ddd
					
				.tips
					border-top 1px dashed #d4d4d4
					padding 10px 0
					margin-top 20px
					color #c2c0c0
					line-height 24px
				.hd
					height 60px
					border-bottom 1px solid #f0f0f0
					margin-bottom 20px
					li
						float left
						width 50%
						text-align center
						font-size 18px
						line-height 58px
						border-bottom 2px solid transparent
						cursor pointer
						&.on
							color #6cc
							border-bottom 2px solid #6cc
		.form-item
			margin-bottom 24px
			min-height 40px
			&.checkboxItem
				height 24px
				min-height 24px
			.btn
				background rgba(102,204,204,1)
				color #fff
				border none
				height 40px
				line-height 40px
				display block
				width 100%
				border-radius 4px
				font-size 14px
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
	.partner
		padding 30px 50px 20px
		.tit
			border-top 1px dashed #ebebeb
			position relative
			padding-bottom 30px
			span
				width 100px
				height 30px
				line-height 30px
				font-size 16px
				text-align center
				color #999
				background #fff;
				display inline-block
				position absolute
				left 50%
				margin-left -50px
				top 50%
				top -15px
	.agreementBox
		height 300px
		overflow-y auto
	.agreementBtn
		cursor pointer
		line-height 24px
	.fade-enter-active
	.fade-leave-active
		transition opacity .5s
	.fade-enter
	.fade-leave-to
		opacity 0
</style>