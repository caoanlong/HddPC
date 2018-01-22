<template>
	<ul class="multiple fl">
		<li v-for="option in optionList" v-text="option.name" :class="{'selected': selectedList.map(item => item.name).includes(option.name)}" @click.stop="selectChange(option)" :key="option.name"></li>
	</ul>
</template>
<script>
	export default {
		props: {
			defaultOption: {
				type: Array
			},
			optionList: {
				type: Array
			}
		},
		data() {
			return {
				selectedList: this.defaultOption
			}
		},
		methods: {
			selectChange (obj) {
				let names = this.selectedList.map(item => item.name)
				// 如果选择的选项已经勾选
				if (names.includes(obj.name)) {
					this.selectedList.splice(names.indexOf(obj.name), 1)
					return
				// 如果选择的选项没有勾选
				} else {
					// 如果选择不限
					if (obj.name == '不限') {
						this.selectedList = []
						this.selectedList.push(obj)
					// 如果勾选的是“其他”
					} else {
						// 如果包含不限
						if (names.includes('不限')) {
							this.selectedList = []
							this.selectedList.push(obj)
						} else {
							if (this.selectedList.length == 3) {
								this.msg('最多选择3个车长！')
								return
							}
							this.selectedList.push(obj)
						}
					}
					this.$emit('multipleSelect', this.selectedList)
				}
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.multiple
		li
			padding 0 10px
			height 30px
			line-height 30px
			float left
			margin 5px 10px 5px 0
			cursor pointer
			border 1px solid transparent
			border-radius 4px
			&.selected
				color #20a0ff
				background #fff
				border-color #20a0ff			
</style>