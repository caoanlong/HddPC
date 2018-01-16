<template>

	<div class="item">			
		<div class="pic">
			<img src='../../assets/img/defaultImg.svg'/>
		</div>
		<div class="personnel">
			<p class="name">罗凯<span class="nickName">Rocky</span></p>
			<p>高级产品经理</p>
		</div>
		<div class="des">
			<p>罗凯是中国知名老司机,毕业于国家司机大学,活跃在云南,湖北,广东等地.致力于拯救国内各种迷茫女士,拯救她们于水深火热之中。</p>
			<p>代表作品有《我与阿娇不得不说的故事》、《论驾驶技巧》、《生命在于运动》等畅销书籍。</p>
		</div>
	</div>

</template>
<script>

</script>
<style lang="stylus" scoped>
	.item
		padding 10px 10px 10px 110px
		position relative
		min-height 120px
		border-bottom 1px solid #f0f0f0
		.pic
			position absolute
			left 0
			top 10px
			width 100px
			height 100px
			img
				width 100px
				height 100px
		.personnel
			border-left 3px solid #c1c1c1
			padding-left 10px
			p
				font-size 16px
				color #999
			.name
				color #585757
				font-size 24px
				span
					margin-left 10px
					font-size 16px
					color #999
		.des
			line-height 20px
			p
				padding 5px 0 0
		
</style>