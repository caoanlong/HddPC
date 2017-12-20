<template>
	<div>
		<div class="content">
			<div class="page-w">
				<router-view></router-view>
				<div class="rside fr">
					<RecommendGoods></RecommendGoods>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import RecommendGoods from './RecommendGoods'
	export default {
		data(){
			return{
			}
		},
		created() {
			this.$store.commit({type:'selectChange',selected:3})
		},
		components: {
			RecommendGoods,
		}
	}
</script>
<style lang="stylus" scoped>
.content
	padding:10px 0 30px
	.rside
		width 320px
</style>