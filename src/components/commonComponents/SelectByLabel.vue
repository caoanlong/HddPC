<template>
	<div class="pannel" v-if="option.isShow" :style="styleOption" @click.stop="stop()">
		<span :class="{'selected': selectedLabels.indexOf(label)>-1}" v-for="label in obj" @click.stop="pushLabel(label)">{{label.name}}</span>
		<p class="text-right">
			<span class="addBtn" @click.stop="showLabelModal">+ 添加常用标签</span>
		</p>
	</div>
</template>
<script>
	import common from '../../common/common'
	export default {
		props: {
			obj: {
				type: Array
			},
			option: {
				type: Object
			},
			selectedLabels: {
				type: Array
			}
		},
		computed: {
			styleOption() {
				return {
					width: this.option.width,
					left: this.option.left,
					top: '100%'
				}
			}
		},
		mounted() {
			document.addEventListener('click',() => {
				this.option.isShow = false;
			},false);
		},
		methods: {
			stop() {
				return false
			},
			pushLabel(obj) {
				let index = this.selectedLabels.indexOf(obj);
				if (index > -1) {
					this.selectedLabels.splice(index,1);
				}else {
					this.selectedLabels.push(obj);
				}
				this.$emit('pushLabel',this.selectedLabels);
			},
			showLabelModal() {
				this.modal({
					width: '400px',
					title: '添加标签',
					content: `<input type="text" class="text-input" placeholder="请输入..."/>`
				})
			}
		},
	}
</script>
<style lang="stylus" scoped>
	.pannel
		position absolute
		z-index 99
		padding 10px
		background-color #fff
		border 1px solid #ddd
		border-top none;
		border-radius 0 0 4px 4px
		span
			padding 2px 10px
			margin 5px
			cursor pointer
			background-color #ddd
			color #666
			border-radius 4px
			display inline-block
			&:hover
			&.selected
				background-color #6cc
				color #fff
		.addBtn
			background-color #6cc
			color #fff
			height 28px
			padding 0 20px
			line-height 28px
</style>