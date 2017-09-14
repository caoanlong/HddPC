<template>
	<div>
		<div class="tit">新闻中心</div>
		<div class="con clearfix">	
			<NewsItem v-for="i in 10" key="i"></NewsItem>
		</div>
	</div>
</template>
<script>
	import NewsItem from './NewsItem'
	export default {
		components: {
			NewsItem
		}
	}
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
		padding 10px 20px 100px
</style>