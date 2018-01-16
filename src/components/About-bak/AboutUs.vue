<template>
	<div class="con">
		<p class="des">云南微服物流大数据运营有限公司成立于2013年，致力于结合传统物流业务运作，嫁接互联网的创新思维为云南物流行业从业者提供专业、深入、全面的物流供应链服务，是专业为物流供应链上下游提供智能物流运输信息化解决方案的服务商。</p>
		<p><label>公司理念：</label>服务,无微不至
		<p><label>公司目标：</label>全球最专业的物流信息化服务商
		<p><label>公司愿景：</label>科技让物流更简单</p>
		<div class="timLine">
			<div class="item">
				<span class="year">2017大事记</span>
				<p class="month">2017年12月</p>
				<p>泰国微服项目启动</p>
				<p class="month">2017年8月</p>
				<p>“浩宏物流”APP正式上线</p>
				<p class="month">2017年6月</p>
				<p>“云交智运”APP上线新闻发布会</p>
				<p class="month">2017年5月</p>
				<p>无车承运人平台上线运营</p>
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
		padding 20px 20px 100px
		font-size 14px
		color #585757
		p
			line-height 30px
			text-indent 2em
			label
				font-weight bold
				color #3480b1
		.timLine
			.item
				padding 60px 0 20px 70px
				position relative
				border-bottom 1px solid #f0f0f0
				&:last-child
					border-bottom none
				.year
					color #6cc
					font-size 30px
					position absolute
					left 30px
					top 20px
				p
					padding-bottom 10px
					&.month
						font-size 12px
						color #a3a3a3
						padding 10px 0
</style>