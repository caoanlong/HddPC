<template>
	<ul class="single fl">
		<li :class="{'selected': selectedType.name == option.name}" @click.stop="selectChange(option)" v-for="option in trukcTypeList" v-text="option.name" :key="option.name"></li>
	</ul>
</template>
<script>
	export default {
		props: {
			defaultOption: {
				type: Object
			},
			optionList: {
				type: Array
			}
		},
		data() {
			return {
                trukcTypeList: [{
                    "code": 100000044,
					"name": "不限"
                }],
				selectedType: this.defaultOption
			}
        },
        watch: {
            optionList (newList) {
                this.trukcTypeList.push(...newList)
            }
        },
		methods: {
			selectChange(option) {
				this.selectedType = option
				this.$emit('simpleSelect', option)
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