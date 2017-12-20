<template>
	<div>
		<div class="modal-mask" v-show="isShow"></div>
		<transition name="fade">
			<div class="modal" :style="{width: width}" v-show="isShow">
				<div class="modal-title" v-text="title"></div>
				<span class="modal-close" @click="closeModal"></span>
				<div class="modal-content">
					<span class="icon" :class="'icon'+icon" v-show="icon"></span>
					<div class="content" v-html="content"></div>
				</div>
				<div class="modal-btn">
					<span class="btn" :class="btn[0].class" @click="sureClick" v-text="btn[0].text"></span>
					<span class="btn" :class="btn[1].class" @click="cancelClick" v-text="btn[1].text" v-if="btn[1]"></span>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
	export default {
		name: 'modal',
		props: {
			width: {
				type: String,
				default: '260px'
			},
			title: {
				type: String,
				default: '信息'
			},
			content: String,
			icon: String,
			btn: {
				type: Array,
				default() {
					return [
						{
							text:'确定',
							class: 'primary'
						},
						{
							text:'取消',
							class: 'default'
						}
					]
				}
			},
			sure: Function,
			cancel: Function
		},
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			closeModal() {
				this.isShow = false;
				document.body.style.position = 'static'
				delete window.$modal
			},
			sureClick() {
				this.closeModal();
				if (this.sure) {
					this.sure();
				}
			},
			cancelClick() {
				this.closeModal();
				if (this.cancel) {
					this.cancel();
				}
			},
		}
	}
</script>
<style type="text/css" scoped>
	* {
		box-sizing: content-box;
	}
	.modal-mask {
		position: absolute;
		top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background-color: rgb(0, 0, 0);
	    opacity: 0.3;
	}
	.modal {
		position: fixed;
		top: 50%;
		left: 50%;
		z-index: 1000;
		transform: translate(-50% , -50%);
		-webkit-transform: translate(-50% , -50%);
		-ms-transform: translate(-50% , -50%);
		-moz-transform: translate(-50% , -50%);
		-o-transform: translate(-50% , -50%);
		background-color: #fff;
		border-radius: 2px;
	    box-shadow: 1px 1px 50px rgba(0,0,0,.3);
	    min-width: 260px;
	}
	.modal .modal-title {
	    padding: 0 80px 0 20px;
	    height: 42px;
	    line-height: 42px;
	    border-bottom: 1px solid #eee;
	    font-size: 14px;
	    color: #333;
	    overflow: hidden;
	    background-color: #F8F8F8;
	    border-radius: 2px 2px 0 0;
	}
	.modal .modal-close {
	    position: absolute;
	    right: 15px;
	    top: 15px;
	    width: 16px;
	    height: 16px;
	    background-image: url(icons/icon.png);
	    background-repeat: no-repeat;
	    background-position: 1px -40px;
	    cursor: pointer;
	}
	.modal .modal-content {
		display: flex;
	    position: relative;
	    padding: 20px;
	    line-height: 24px;
	    word-break: break-all;
	    font-size: 14px;
	    overflow-x: hidden;
	    overflow-y: auto;
	    max-height: 600px;
	}
	.modal .modal-content .icon {
		display: block;
		flex: 0 0 30px;
		height: 30px;
		margin-right: 10px;
		background-image: url(icons/icon.png);
	    background-repeat: no-repeat;
	}
	.icon1 {
		background-position: 0px 0px;
	}
	.icon2 {
		background-position: -30px 0px;
	}
	.icon3 {
		background-position: -60px 0px;
	}
	.icon4 {
		background-position: -90px 0px;
	}
	.icon5 {
		background-position: -120px 0px;
	}
	.icon6 {
		background-position: -150px 0px;
	}
	.icon7 {
		background-position: -180px 0px;
	}
	.modal .modal-content .content {
		flex: 1;
	}
	.modal .modal-btn {
		text-align: right;
	    padding: 0 15px 12px;
	    pointer-events: auto;
	    user-select: none;
	    -webkit-user-select: none;
	}
	.modal .modal-btn .btn {
	    display: inline-block;
    	vertical-align: top;
	    height: 28px;
		line-height: 28px;
		margin: 5px 5px 0;
		padding: 0 15px;
		border: 1px solid #dedede;
		background-color: #fff;
		color: #333;
		border-radius: 2px;
		font-weight: 400;
		cursor: pointer;
		text-decoration: none;
	}
	.modal .modal-btn .default {
	    border-color: #dedede;
    	background-color: #fff;
    	color: #333;
	}
	.modal .modal-btn .primary {
	    border-color: #1E9FFF;
    	background-color: #1E9FFF;
    	color: #fff;
	}
	.modal .modal-btn .success {
	    border-color: #4cae4c;
    	background-color: #5cb85c;
    	color: #fff;
	}
	.modal .modal-btn .warning {
	    border-color: #eea236;
    	background-color: #f0ad4e;
    	color: #fff;
	}
	.modal .modal-btn .danger {
	    border-color: #d43f3a;
    	background-color: #d9534f;
    	color: #fff;
	}
	.fade-enter-active,.fade-leave-active {
	  	opacity: 1;
	  	transition: opacity linear 0.2s;
	}
	.fade-enter, .fade-leave-to {
	  	opacity: 0;
	}
</style>