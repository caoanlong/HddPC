<template>
	<span class="checkbox" :class="{'checked':isCheck}" @click.stop="Checked()"></span>
</template>
<script>
	export default {
		props: {
			value: {
				type: Object
			},
			isCheck: {
				type: Boolean
			}
		},
		methods: {
			Checked() {
				this.$emit('isChecked',this.value,this.isCheck);
			},
		}
	}
</script>
<style lang="stylus" scoped>
	.checkbox
		width 24px
		height 24px
		display block
		cursor pointer
		background url('../../assets/img/select.svg') no-repeat center 
		background-size cover
		&.checked
			background-image url('../../assets/img/selected.svg')
</style>