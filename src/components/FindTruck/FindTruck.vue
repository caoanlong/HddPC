<template>
	<div class="content">
		<div class="page-w">
			<router-view></router-view>
			<div class="rside fr">
				<RecommendTruck></RecommendTruck>
			</div>
		</div>
	</div>
</template>
<script>
	import RecommendTruck from './RecommendTruck'
	export default {
		created() {
			this.$store.commit({type:'selectChange',selected:2})
		},
		components: {
			RecommendTruck,
		}
	}
</script>
<style lang="stylus" scoped>
	.content
		padding:10px 0 30px
	.rside
		width 320px
</style>