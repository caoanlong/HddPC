<template>
	<ul class="single fl" v-if="styleClass == 1">
		<li :class="{'selected': index == i}" @click.stop="selectChange(option,i)" v-for="(option,i) in optionList" v-text="option.name"></li>
	</ul>
	<ul class="hd" v-else-if="styleClass == 2">
		<li :class="{'on': index == i}" @click.stop="selectChange(option,i)" v-for="(option,i) in optionList" v-text="option.name"></li>
	</ul>
	<ul class="single2 fl" v-else-if="styleClass == 3">
		<li :class="{'selected': index == i}" @click.stop="selectChange(option,i)" v-for="(option,i) in optionList" v-text="option.name"></li>
	</ul>
</template>
<script>
	export default {
		props: {
			defaultOption: {
				type: Number
			},
			optionList: {
				type: Array
			},
			styleClass: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				index: this.defaultOption
			}
		},
		methods: {
			selectChange(option,i) {
				this.index = i;
				this.$emit('simpleSelect',option);
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.single
		li
			padding 0 10px
			height 30px
			line-height 30px
			float left
			margin 5px 10px 5px 0
			cursor pointer
			border-radius 4px
			border 1px solid transparent
			&.selected
				color #fff
				background #20a0ff
				border-color #20a0ff
	.hd
		height 60px
		padding 10px 0 20px
		text-align center
		li
			line-height 30px
			display inline-block
			color #20a0ff
			padding 0 10px
			margin 0 10px
			border-radius 4px
			cursor pointer
			&.on
				background #20a0ff
				color #fff;
	.single2
		li
			padding 0 10px
			height 26px
			line-height 26px
			float left
			margin 5px 10px 5px 0
			cursor pointer
			border-radius 4px
			border 1px solid transparent
			background #ddd
			&.selected
				color #fff
				background #20a0ff
				border-color #20a0ff
</style>