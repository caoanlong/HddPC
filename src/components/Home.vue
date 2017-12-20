<template>
	<div>
		<Swiper :autoPlay="true" :auto-play-time="3000"></Swiper>
		<div class="advantage">
        	<div class="tit"><span>我们的优势</span></div>
			<div class="page-w">
				<div class="item">
					<img src="../../static/img/advantage_icon1.png" />
					<p class="title">开通放心付</p>
					<p>开通担保交易</p>
				</div>
				<div class="item">
					<img src="../../static/img/advantage_icon2.png" />
					<p class="title">海量货源车源</p>
					<p>快速找车发货</p>
				</div>
				<div class="item">
					<img src="../../static/img/advantage_icon3.png" />
					<p class="title">真实身份</p>
					<p>交易安全</p>
				</div>
				<div class="item">
					<img src="../../static/img/advantage_icon4.png" />
					<p class="title">LBS定位</p>
					<p>快速调车</p>
				</div>
			</div>
        </div>
        <div class="appDownload">
            <div class="tit"><span>货多多APP下载</span></div>
            <div class="page-w">
                <div class="item fl">
                	<img src="../../static/img/app1.png" class="pic" />
                    <p class="title">货主端 - 发货，找车，管车、跟踪</p>
                    <p class="des">货多多为广大企业提供了海量真实车源信息，物流企业可以发布自己货源给司机，司机接单后系统实时监控在途运输货源状 态，让您的轻轻松松调度管理车辆。</p>
                </div>
                <div class="item fr">
                	<img src="../../static/img/app2.png" class="pic" />
                    <p class="title">司机端 - 量身打造的赚钱工具</p>
                    <p class="des">广大货车司机可以通过货多多找到海量实时货源信息，并承接运输任务，也可发布自己的求货信息，货多多会第一时间帮您联系有需要的货主，让您轻轻松松赚大钱。</p>
                </div>
            </div>
        </div>
	</div>
</template>
<script>
	import Swiper from './commonComponents/Swiper'
	export default {
		created() {
			this.$store.commit({type:'selectChange',selected:-1})
			let url = this.__webserver__ + 'area/tree'
			this.$http.get(url).then(res => {
				console.log(JSON.stringify(res.body.data))
			})
		},
		components: {
			Swiper
		}
	}
</script>
<style lang="stylus" scoped>
	.advantage
		background #fff
		padding 50px 0 30px
		height 300px
		.tit
			border-top 1px solid #d9dce4
			width 1200px
			margin 0 auto
			position relative
			span
				background #fff
				width 180px
				display block
				height 30px
				position absolute
				left 50%
				margin-left -90px
				top -16px 
				color #6cc
				text-align center
				line-height 30px
				font-size 18px
		.item
			width 320px
			float left
			text-align center
			padding:30px 0 20px
			p
				color #999
				line-height 20px
			.title
				color:#6cc
				font-size 16px
				font-weight bold
	.appDownload
		background #4a4f5f
		padding:50px 0 30px
		height 260px
		.tit
			border-top 1px solid #5b6174
			width 1200px
			margin:0 auto
			position relative
			span
				background #4a4f5f
				width:180px
				display block
				height 30px
				position absolute
				left 50%
				margin-left -90px
				top -16px 
				color #828aa6
				text-align center
				line-height 30px
				font-size 18px
		.item
			width 540px
			padding:30px 80px 0 200px
			position relative
			height 160px
			.title
				color #fff
				font-size 16px
			.pic
				position absolute
				left 80px
			.des
				color:#868c9e
				line-height 24px
				margin-top 15px
</style>