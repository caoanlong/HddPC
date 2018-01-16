<template>
	<div class="con">
		<div class="tit tit1">
			<p>我们能解决</p>
			<p class="titdes">WE CAN SOLVE IT</p>
		</div>
		<ul>
			<li>智能管理-解决物流企业“管理难”。</li>
			<li>降本增效-为企业降低物流成本、提高物流运作效率。</li>
			<li>联网共享-运力资源共享，联网互通。</li>
			<li>物流金融-提供灵活的物流金融服务方案，解决物流企业的“钱袋子”难题。</li>
		</ul>
		<div class="tit">
			<p>服务流程</p>
			<p class="titdes">SERVICE PROCESS</p>
		</div>
		<img src="../../../static/img/solve_step.png" />
	</div>
</template>
<script>
	export default {
		components: {

		}
	}
</script>
<style lang="stylus" scoped>
	.con
		padding 60px 320px 40px 40px
		font-size 14px
		color #585757
		background url('../../../static/img/solve.jpg') no-repeat 700px 40px 
		.tit
			color #3a6c97
			font-size 24px
			height 48px
			margin-bottom 20px
			&.tit1
				color #699f5a
				padding-left 58px
				background url('../../../static/img/solve_tit.jpg') no-repeat left center
			.titdes
				color #3a6c97
				font-size 12px
		ul
			padding-left 40px
			margin-bottom 20px
		li
			position relative
			padding-left 18px
			line-height 30px
			color #545555
			&:before
				content ''
				width 10px
				height 10px
				border-radius 5px
				background #3a6c97
				display block
				position absolute
				left 0
				top 10px
</style>