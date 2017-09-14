<template>
	<div class="SearchFilter">
		<input type="text" placeholder="请输入车牌/姓名搜索" />
		<button type="button" class="searchBtn">搜索</button>
	</div>
</template>
<script>
	export default {
		components: {
		}
	}
</script>
<style lang="stylus" scoped>
	.SearchFilter
		border 1px solid #f0f0f0
		height 30px
		margin 5px 0
		border-radius 4px
		padding 0 2px 0 30px
		background url('../../assets/img/search.png') no-repeat 5px center
		input
			border none
			outline none
			height 28px
			line-height 28px
			vertical-align top
		.searchBtn
			height 24px
			line-height 24px
			vertical-align top
			margin 2px 0
			background #6cc
			color #fff
			border-radius 4px
			
</style>