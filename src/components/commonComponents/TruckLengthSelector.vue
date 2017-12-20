<template>
	<ul class="multiple fl">
		<li v-for="option in optionList" v-text="option.name" :class="{'selected':selectedList.map(item => item.code).includes(option.code)}" @click.stop="selectChange(option)" :key="option.code"></li>
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
            selectChange (option) {
                // 如果选择不限
                if (option.code == 100000044) {
                    this.selectedList = []
                    this.selectedList.push(option)
                } else {
                    if (this.selectedList.map(item => item.code).includes(option.code)) {
                        this.selectedList.splice(this.selectedList.map(item => item.code).indexOf(option.code), 1)
                        return
                    }
                    if (this.selectedList.map(item => item.code).includes(100000044)) {
                        this.selectedList.splice(this.selectedList.map(item => item.code).indexOf(100000044), 1)
                    }
                    if (this.selectedList.length == 3) {
                        this.msg('最多选择3个车长')
                        return
                    }
                    this.selectedList.push(option)
                }
                this.$emit('multipleSelect', this.selectedList)
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