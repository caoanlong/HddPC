<template>
	<div>
		<div class="tit">项目团队</div>
		<div class="con">	
			<TeamItem v-for="i in 10" key="i"></TeamItem>
		</div>
	</div>
</template>
<script>
	import TeamItem from './TeamItem'
	export default {
		components: {
			TeamItem
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