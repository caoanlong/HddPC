<template>
	<div>
		<div class="tit">新闻中心</div>
		<div class="con">
			<p class="NewsTit text-center">云交智运上线新闻发布中心</p>
			<div class="date text-center">2017-08-18 云南昆明</div>
			<div class="newsCon">
				<p>货多多是一款免费的手机配货软件，是中国目前广受欢迎的返程车找货源、货主找车、货车司机找货、空车配货、回程车配货的公路物流调度云平台。基于先进的LBS定位系统和云计算车货数据匹配进行的空车找货、返程车找货、手机配货、在线找车、在线发货，货车司机和货主可以通过手机APP、PC轻松发布空车和货源信息，将货车与货源精准匹配，解决回程车、回头车、返程车、回程货问题，提高中国公路物流运输效率。</p>
				<img src='../../assets/img/defaultNewsImg.svg' width="100%" />
			</div>
			<div class="control clearfix">
				<span class="prev fl">云交智运上线新闻发布中心1</span>
				<span class="next fr">云交智运上线新闻发布中心3</span>
			</div>
		</div>
	</div>
</template>
<script>

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
		padding 30px 20px 100px
		.NewsTit
			font-size 20px
			color #585757
			font-weight bold
		.date
			color #999
			padding 10px 0
		.newsCon
			line-height 30px
			text-indent 2em
		.control
			padding-top 10px
			margin-top 20px
			border-top 1px solid #f0f0f0
			span
				line-height 30px
				position relative
				cursor pointer
				width 40%
				text-overflow ellipsis
				white-space nowrap
				overflow hidden
				&.prev
					&:before
						content '上一篇：'
				&.next
					text-align right
					&:before
						content '下一篇：'
</style>