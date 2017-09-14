<template>
	<span class="checkbox" :class="{'checked':checked}" @click.stop="Checked()" v-text="content"></span>
</template>
<script>
	export default {
		props: {
			content: {
				type: String
			}
		},
		data() {
			return {
				checked: false
			}
		},
		methods: {
			Checked() {
				this.checked = !this.checked;
				this.$emit('isChecked',this.checked);
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.checkbox
		height 24px
		line-height 24px
		display block
		float left
		padding-left 24px
		cursor pointer
		position relative
		&:before
			content ''
			border 1px solid #dddee1
			width 16px
			height 16px
			position absolute
			left 0
			top 4px
			border-radius 4px
		&.checked
			&:before
				border-color #6cc
				background url(../../../static/img/checked.png) center #6cc
</style>