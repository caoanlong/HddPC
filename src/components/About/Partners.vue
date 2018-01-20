<template>
	<div class="con">
		<div class="tit">合作伙伴</div>
		<ul>
			<li>云南交通运输有限责任公司</li>
			<li>昆明交通运输集团有限公司</li>
			<li>云南浩宏物流有限公司</li>
			<li>华夏银行股份有限公司</li>
			<li>泰国奔象国际物流有限公司</li>
			<li>深圳市时通物流有限公司</li>
			<li>云南万龙投资有限公司</li>
		</ul>
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
		padding 40px 640px 40px 20px 
		font-size 14px
		color #585757
		height 570px
		background url('../../../static/img/partner1.jpg' ) no-repeat 410px 20px 
		.tit
			color #74bc43
			text-align center
			font-size 24px
			margin-bottom 20px
		ul
			padding-left 20px
			li
				position relative
				padding-left 18px
				line-height 40px
				color #999
				&:before
					content ''
					width 10px
					height 10px
					border-radius 5px
					background #74bc43
					display block
					position absolute
					left 0
					top 15px
</style>