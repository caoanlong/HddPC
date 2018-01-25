<template>
	<div class="slideWrap">
		<ul>
			<transition-group name="fade">
				<li class="swiper" v-for="(pic,i) in picList" :key="i" v-show="index === i" >
					<img :src="pic.url" />
				</li>
			</transition-group>
		</ul>
		<div class="prev" @click="prev()"></div>
		<div class="next" @click="next()"></div>
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
			},
			picList: {
				type: Array
			},
			cur: {
				type:Number
			}
		},
		data() {
			return {
				pics: [],
				index: 0,
				timer: {}
			}
		},
		watch: {
			cur(newVal) {
				this.index = newVal
				// console.log(this.index)
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
				if (this.index == this.picList.length) {
					this.index = 0;
				}
				// console.log(this.index, this.picList.length)
				this.$emit('ievent',this.index);
			},
			prev() {
				this.index--;
				if (this.index == -1) {
					this.index = this.picList.length-1;
				}
				this.$emit('ievent',this.index);
			},
			gotoPage(i) {
				this.index = i;
			},
			autoGoto() {
				this.timer = setInterval(() => {
					this.next();
				},this.autoPlayTime)
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.slideWrap
		width 162px
		height 287px	
		position absolute
		left 248px
		top 44px
		ul
			overflow hidden
			width 162px
			height 287px
			position relative
			li
				position absolute
				top 0
				left 0
				width 162px
				height 287px
		.prev
			position absolute
			top 110px
			left -160px
			width 60px
			height 60px
			cursor pointer
			&:before
				position absolute
				top 15px
				left 20px
				display block
				content ''
				width 26px
				height 26px
				border-top 3px solid #c2ebeb
				border-left 3px solid #c2ebeb
				transform rotate(-45deg)
		.next
			position absolute
			top 110px
			right -160px
			width 60px
			height 60px
			cursor pointer
			&:before
				position absolute
				top 15px
				right 20px
				display block
				content ''
				width 26px
				height 26px
				border-top 3px solid #c2ebeb
				border-right 3px solid #c2ebeb
				transform rotate(45deg)
	.fade-enter-active
	.fade-leave-active
		transition: all .3s
	.fade-enter
	.fade-leave-to
		transform: translateX(50px)
		opacity: 0
</style>