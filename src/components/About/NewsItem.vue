<template>
	<router-link :to="{name:'NewsDetail',query:{'cur':2}}" tag="div" class="NewsItem" >			
		<img src='../../assets/img/defaultNewsImg.svg' class="newsPic" />
		<p class="newsTitle">深圳前海微服大数据科技有限公司正式成立</p>
		<p class="date">2017-05-03 深圳</p>
	</router-link>
</template>
<script>

</script>
<style lang="stylus" scoped>
	.NewsItem
		width 320px
		height 300px
		margin 10px 15px 0 0
		float left
		cursor pointer
		&:nth-child(3n)
			margin-right 0
		.newsPic
			width 320px
			height 240px
		p
			line-height 30px
			color #999
			&.newsTitle
				font-size 14px
				color #585757
				width 320px
				height 30px
				text-overflow ellipsis
				white-space nowrap
				overflow hidden

</style>