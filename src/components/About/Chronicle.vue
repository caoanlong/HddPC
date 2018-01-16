<template>
	<div class="con">
		<div class="timLine">
			<div class="item">
				<p><span class="month">2017年12月</span>
				泰国微服项目启动</p>
				<p><span class="month">2017年8月</span>
				“浩宏物流”APP正式上线</p>
				<p><span class="month">2017年6月</span>
				“云交智运”APP上线新闻发布会</p>
				<p><span class="month">2017年5月</span>
				无车承运人平台上线运营</p>
			</div>
		</div>
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
		padding 80px 20px 20px 620px
		height 580px
		background url('../../../static/img/Chronicle.jpg') no-repeat bottom center
		font-size 14px
		color #585757
		.timLine
			.year
				color #6cc
				font-size 30px
			.item
				position relative
				border-left 1px dashed #bad294
				p
					height 50px
					line-height 50px
					padding-left 20px
					position relative
					color #155d95
					.month
						font-size 12px
						position absolute
						padding-left 16px
						width 100px
						text-align right
						padding-right 10px
						left -110px
						top 0
						&:after
							content ''
							width 16px
							height 16px
							display block
							background #62a731
							border-radius 8px
							position absolute 
							right -18px
							top 18px
</style>