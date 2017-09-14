<template>
	<div class="imgPerview clearfix">
		<div class="imgLi" :style="{'width':width+'px','height':height+'px'}">
			<img :src="fileUrl" v-show="fileUrl">
			<img src="../../assets/img/defaultImg.svg" v-show="!fileUrl">
			<div class="controller">
				<div class="controllerBtn">
					<div class="perviewBtn" @click.stop="isShowImgModal = true"></div>
				</div>
			</div>
			<CustomModal title="查看图片" :width="500" :height="400" v-if="isShowImgModal" @closeModal="closeImgModal">
				<img :src="fileUrl" v-show="fileUrl">
				<img src="../../assets/img/defaultImg.svg" v-show="!fileUrl">
			</CustomModal>
		</div>
	</div>
</template>
<script>
	import CustomModal from './CustomModal'
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
		data() {
			return {
				isShowImgModal: false
			}
		},
		methods: {
			closeImgModal() {
				this.isShowImgModal = false;
			}
		},
		components: {
			CustomModal
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