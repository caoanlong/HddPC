<template>
	<div class="imgPerview clearfix">
		<div class="imgLi" :style="{'width':width+'px','height':height+'px'}">
			<img :src="__imgserver__ + fileUrl" @error="errorImg">
			<div class="controller">
				<div class="controllerBtn">
					<div class="perviewBtn" @click.stop="showImgModal"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {defaultImg} from '../../assets/icons'
	export default {
		props: {
			width: {
				type: Number,
				default: 100
			},
			height: {
				type: Number,
				default: 100
			},
			fileUrl: {
				type: String
			}
		},
		methods: {
			errorImg (e) {
                e.target.src = defaultImg
                e.target.onerror = null
            },
			showImgModal() {
				this.modal({
					title: '图片详情',
					content: `<img src="${this.__imgserver__ +this.fileUrl}"  @error="${this.errorImg}">`
							
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.imgPerview
		.imgLi
			float left
			border 1px solid #f0f0f0
			border-radius 6px
			text-align center
			position relative
			.controller
				position absolute
				top 0
				left 0
				width 100%
				height 100%
				border-radius 6px
				background-color rgba(0, 0, 0, .5)
				display none
				.controllerBtn
					position absolute
					left 0
					top 0
					right 0
					bottom 0
					margin auto
					height 40px
					cursor pointer
					text-align center
					.perviewBtn
						width 40px
						height 40px
						background-image url('../../assets/img/perview.png')
						background-repeat no-repeat
						background-size 26px
						background-position center
						display inline-block
			img
				display block
				width 100%
				height 100%
				border-radius 4px
			&:hover
				.controller
					display block
</style>