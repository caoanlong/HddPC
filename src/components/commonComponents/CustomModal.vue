<template>
	<div>
		<div class="fullMask" @click.stop="closeModal()"></div>
		<div class="customModal" :style="{'width':width+'px'}">
			<div class="modal-title">{{title}}<span class="closeBtn" @click.stop="closeModal()"></span></div>
			<div class="modal-body" v-if="icon==0">
				<slot></slot>
			</div>
			<div class="modal-body hasIcon" v-else>
				<i class="info" v-if="icon==1"></i>
				<i class="success" v-else-if="icon==2"></i>
				<i class="warning" v-else-if="icon==3"></i>
				<i class="error" v-else="icon==4"></i>
				<slot></slot>
			</div>
			<div class="modal-footer text-center">
				<Button type="button" class="btn btn-primary" @click.stop="doSomething()" v-if="button1">{{button1}}</Button>
				<Button type="button" class="btn btn-link" @click.stop="closeModal()" v-if="button2">{{button2}}</Button>
			</div>
		</div>
	</div>
</template>
<script>
	import common from '../../common/common.js'
	export default {
		props: {
			width: {
				type: Number,
				default: 400
			},
			title: {
				type: String,
				default: '标题'
			},
			content: {
				type: String,
				default: '内容'
			},
			button1: {
				type: String,
			},
			button2: {
				type: String,
			},
			icon:{
				type:Number,
				default:0
			},
		},
		data() {
			return {
			}
		},
		methods: {
			doSomething() {
				this.closeModal();
				this.$emit('doSomething');
			},
			closeModal() {
				this.$emit('closeModal');
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.fullMask
		position fixed
		background rgba(0,0,0,.5)
		top:0
		right:0
		bottom:0
		left 0
		z-index 999
	.customModal
		position fixed
		top 50%
		left 50%
		z-index 1000
		transform: translate(-50% , -50%)
		.modal-title
			padding:0 10px
			height 40px
			line-height 40px
			font-size 14px
			background #6cc
			color #fff
			border-radius 4px 4px 0 0
			.closeBtn
				float right
				cursor pointer
				background url('../../assets/img/closeBtn.svg') center
				background-size cover
				width 18px
				height 18px
				display block
				margin-top 11px
		.modal-body
			width 100%
			padding 20px
			box-sizing border-box
			background #fff
			position relative
			&.hasIcon
				padding 20px 20px 20px 100px	
			i
				position absolute
				left 40px
				top 20px
				width 40px
				height 40px
				background-repeat no-repeat
				background-size cover
				&.success
					background-image url(../../assets/img/success_icon.svg) 
				&.info
					background-image url(../../assets/img/info_icon.svg) 
				&.warning
					background-image url(../../assets/img/warning_icon.svg) 
				&.error
					background-image url(../../assets/img/error_icon.svg) 
		
		.modal-footer
			padding:10px 0 20px
			background #fff;
			border-radius 0 0 4px 4px
			.btn
				border-radius 4px
				padding: 5px 20px
				&.btn-primary
					color #fff
					background #6cc
				&.btn-link
					color #666
					background #fff
</style>