<template>
	<div class="swiper-container" @mouseover="showBtn(true)" @mouseout="showBtn(false)">
		<ul>
			<transition-group name="fade">
				<li class="swiper" v-for="(banner,i) in bannerList" :key="banner.img" :style="{'background-image': 'url('+banner.img+')'}" v-show="index === i"></li>
			</transition-group>
		</ul>
		<div class="paging">
			<span v-for="(banner,i) in bannerList" :key="banner.img" :class="{'cur': index === i}" @click="gotoPage(i)"></span>
		</div>
		<div class="prev" @click="prev()" v-show="isShowBtn"></div>
		<div class="next" @click="next()" v-show="isShowBtn"></div>
	</div>
</template>
<script>
	export default {
		props: {
			autoPlay: {
				type: Boolean,
				default: true
			},
			autoPlayTime: {
				type: Number
			}
		},
		data() {
			return {
				bannerList: [
			        {
			        	img: '../../../static/img/banner1.jpg'
			        },
			        {
			        	img: '../../../static/img/banner2.jpg'
			        },
			        {
			        	img: '../../../static/img/banner3.jpg'
			        },
			        {
			        	img: '../../../static/img/banner4.jpg'
			        },
			        {
			        	img: '../../../static/img/banner5.jpg'
			        }
		        ],
		        index: 0,
		        isShowBtn: false,
		        timer: {}
			}
		},
		mounted() {
			if (this.autoPlay) {
				this.autoGoto();
			}
		},
		beforeDestroy() {
			clearInterval(this.timer);
		},
		methods: {
			next() {
				this.index++;
				if (this.index == this.bannerList.length) {
					this.index = 0;
				}
			},
			prev() {
				this.index--;
				if (this.index == -1) {
					this.index = this.bannerList.length-1;
				}
			},
			gotoPage(i) {
				this.index = i;
			},
			autoGoto() {
				this.timer = setInterval(() => {
					this.next();
				},this.autoPlayTime)
			},
			showBtn(bool) {
				this.isShowBtn = bool;
			}
		}
	}
</script>
<style lang="stylus" scoped>
	pointerSize=10px
	.swiper-container
		position relative
		width 100%
		height 383px
		ul
			width 100%
			height 100%
			.swiper
				position absolute
				top 0
				left 0
				width 100%
				height 100%
				background-color #ccc
				background-repeat no-repeat
				background-position top center
		.prev
			position absolute
			top 180px
			left 10px
			width 60px
			height 60px
			background-color rgba(0, 0, 0, .3)
			cursor pointer
			&:before
				position absolute
				top 15px
				left 20px
				display block
				content ''
				width 26px
				height 26px
				border-top 3px solid #fff
				border-left 3px solid #fff
				transform rotate(-45deg)
		.next
			position absolute
			top 180px
			right 10px
			width 60px
			height 60px
			background-color rgba(0, 0, 0, .3)
			cursor pointer
			&:before
				position absolute
				top 15px
				right 20px
				display block
				content ''
				width 26px
				height 26px
				border-top 3px solid #fff
				border-right 3px solid #fff
				transform rotate(45deg)
		.paging
			position absolute
			left 50%
			transform translateX(-50%)
			bottom 0
			max-width 90%
			height 50px
			span
				position relative
				top 20px
				display inline-block
				width pointerSize
				height pointerSize
				margin 0 5px
				border-radius 5px
				background-color #fff
				opacity .5
				&.cur
					opacity 1
	.fade-enter-active
	.fade-leave-active
		transition: opacity 1.5s
	.fade-enter
	.fade-leave-active
		opacity: 0
</style>