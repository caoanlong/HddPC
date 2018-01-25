<template>
	<div class="content">
		<div class="page-w">
			<div class="topic">
				<img src="../../../static/img/appdownload/driverDownloadTopic.jpg" class="topic" />
				<span class="downLoadBtn" @click="scrollTop"><img src="../../../static/img/appdownload/driverDownload.png" title="下载司机端" alt="下载司机端"/></span>
			</div>
			<div class="section1">
				<div class="slideL">
					<SwiperSlide :autoPlay="true" :auto-play-time="4000" :picList="pics" @ievent = "ievent" :cur="cur"></SwiperSlide>
				</div>
				<div class="slideR">
					<div class="desItem" v-show="cur==0">
						<p class="tit">优质货源</p>
						<p class="subTit">找货就是那么简单</p>
						<p class="des">每天2000条新货源,10万司机感谢货多多带来的收入您还在等什么?</p>
					</div>
					<div class="desItem" v-show="cur==1">
						<p class="tit">定制货源线路偏好</p>
						<p class="subTit">推送优质货源</p>
						<p class="des">货多多为你推荐心怡货源，让你不在苦恼异地无法匹配货源，上单运输中就找到下一单回程货源</p>
					</div>
					<div class="desItem" v-show="cur==2">
						<p class="tit">心怡货源参与报价</p>
						<p class="subTit">同时联系多个货主</p>
						<p class="des">对心怡货源报价，让司机与货主沟通更容易，提高司机接单率</p>
					</div>
					<div class="desItem" v-show="cur==3">
						<p class="tit">运单管理简单易用</p>
						<p class="subTit">运输过程尽在掌握</p>
						<p class="des">我们竭力为司机在输环节中的处理带来完美体验：报价、承运、装车、预付运费、运输、运达、到付运费，让你的运费按环节实时结算</p>
					</div>
					<ul class="hd">
						<li v-for="(item,index) in imgIcons" :key="index" :class="{'on':cur==index}" @click="isCur(index)">
							<img :src="item.curSrc" v-show="cur==index"/>
							<img :src="item.defaultSrc" v-show="cur!==index"/>
						</li>
					</ul>
				</div>
			</div>
			<div class="section2">
				<div class="sectionTit">
					<p class="title">安装流程</p>
					<p class="subtit">INSTALLATION PROCESS</p>
				</div>
				<div class="con">
					<div class="item">
						<img src="../../assets/img/appDownload/step1.png"/>
						<p class="title">1.下载软件</p>
						<div class="subtit">
							<p>到官网或应用市场</p>
							<p>下载货多多司机端</p>
						</div>
					</div>
					<div class="item">
						<img src="../../assets/img/appDownload/step2.png"/>
						<p class="title">2.注册并填写资料</p>
						<div class="subtit"><p>打开司机端,注册手机号码</p><p>输入个人信息,车辆信息</p></div>
					</div>
					<div class="item">
						<img src="../../assets/img/appDownload/step3.png"/>
						<p class="title">3.完成认证</p>
						<div class="subtit"><p>货多多工作人员核实您的资料无误后</p><p>您可以立即找货接单赚钱</p></div>
					</div>
				</div>
			</div>
			
		</div>
		<div class="section3">
			<div class="page-w">
				<div class="appDownloadArea">
					<p class="slogan" ><img src="../../assets/img/slogan.png" /></p>
					<p class="qrcode"><img src="../../../static/img/appDownload/DriverQrcode.png" /></p>
					<p class="downloadBtn">
						<router-link to="" title="ios"><img src="../../../static/img/appDownload/iosDownload.png" /></router-link>
						<router-link to="" title="android"><img src="../../../static/img/appDownload/androidDownload.png" /></router-link>
					</p>
				</div>
				
			</div>
		</div>
	</div>
</template>
<script>
import SwiperSlide from '../commonComponents/SwiperSlide'
export default {
	data() {
		return {
			cur:0,
			marginL:0,			
			pics:[
				{
					url: require('../../../static/img/appDownload/yzhy.png')
				},
				{
					url: require('../../../static/img/appDownload/hylx.png')
				},
				{
					url: require('../../../static/img/appDownload/cybj.png')
				},
				{
					url: require('../../../static/img/appDownload/ydgl.png')
				}
			],
			imgIcons:[
				{
					curSrc: require('../../assets/img/appDownload/yzhyy.png'),
					defaultSrc: require('../../assets/img/appDownload/yzhyw.png')
				},
				{
					curSrc: require('../../assets/img/appDownload/hylxy.png'),
					defaultSrc: require('../../assets/img/appDownload/hylxw.png')
				},
				{
					curSrc: require('../../assets/img/appDownload/cybjy.png'),
					defaultSrc: require('../../assets/img/appDownload/cybjw.png')
				},
				{
					curSrc: require('../../assets/img/appDownload/ydgly.png'),
					defaultSrc: require('../../assets/img/appDownload/ydglw.png')
				}
			]
		}	
	},
	created() {
		this.$store.commit({ type: 'selectChange', selected: 5 })
	},
	methods:{
		isCur(i) {		
			if (this.cur == i) {return};
			this.cur = i;
		},
		ievent(i) {
	        this.cur = i
	    },
		scrollTop () {
			document.documentElement.scrollTop = 2000
		}
	},
	components: {
		SwiperSlide
	}
}

</script>
<style lang="stylus" scoped>
.content
	padding:10px 0 0	
	.topic
		border-radius 4px
		position relative
		overflow hidden
		height 444px
		.downLoadBtn
			position absolute
			top 320px
			left 50px
			cursor pointer
	.section1
		background #fff
		margin-top 15px
		border-radius 4px
		padding 30px 0
		height 430px
		.slideL
			padding 0 80px
			width 660px
			float left
			height 380px
			background url('../../assets/img/appDownload/phone.png') no-repeat top center
			position relative
		.slideR
			width 620px
			padding 0 70px
			float right
			height 380px
			.desItem
				height 260px
				.tit
					font-size 42px
					color #6cc
					font-weight bold
				.subTit
					font-size 32px
					color #6cc
					margin-top 10px
				.des
					margin-top 20px
					font-size 18px
					line-height 30px
					color #878787
			.hd
				height 84px
				text-align center
				li
					cursor pointer
					display inline-block
					margin 0 15px
	.section2
		background #f4f4f4
		margin-top 15px
		height 380px
		color #868c9e
		text-align center
		.sectionTit		
			position relative			
			padding 30px 0
			&:before
			&:after
				content ''
				height 1px
				width 400px
				display block
				position absolute
				top 50%
				left 120px
				background #bdc0c9
			&:after
				right 120px
				left auto
			.title
				font-size 36px
			.subtit
				font-size 12px
		.con
			width 1020px
			margin 0 auto
			.item
				width 340px
				float left
				height 220px
				padding-top 30px
				.title
					font-size 18px
					font-weight bold
					margin-top 30px
				.subtit
					font-size 14px
					margin-top 10px
	.section3
		background #4b5660
		height 465px
		.appDownloadArea
			text-align center
			padding-top 40px
			.qrcode
			.downloadBtn
				margin-top 40px
			a
				margin 0 20px
</style>