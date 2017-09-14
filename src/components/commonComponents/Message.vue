<template>
<transition name="fade">
	<div v-if="isMsgShow">
		<div class="Message" v-text="content"></div>
	</div>
</transition>
</template>
<script>
	export default {
		computed: {
			isMsgShow() {
				return this.$store.state.isMsgShow
			},
			content() {
				return this.$store.state.MsgContent
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.Message
		position fixed
		top 50%
		left 50%
		z-index 1000
		transform translate(-50% , -50%)
		padding 15px 30px
		background rgba(0, 0, 0, .7)
		color #fff
		font-size 14px
		border-radius 4px
</style>