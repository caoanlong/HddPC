<template>
	<ul class="multiple fl">
		<li v-for="(option,i) in optionList" v-text="option.name" :class="{'selected':selectIndex.indexOf(i)>-1}" @click.stop="selectChange(option,i)"></li>
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
				selectIndex: this.defaultOption,
				selectList: []
			}
		},
		methods: {
			selectChange(option,i) {
				let index = this.selectIndex.indexOf(i);
				if (index > -1) {
					this.selectIndex.splice(index,1);
					this.selectList.splice(index,1);
				}else {
					this.selectIndex.push(i);
					this.selectList.push(option);
				}
				this.$emit('multipleSelect',this.selectList);
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