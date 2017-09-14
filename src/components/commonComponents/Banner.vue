<template>
	<swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
	    <swiper-slide v-for="banner in bannerList" :key="banner.title">
	    	<div class="slide" :style="{'background-image': 'url('+banner.img+')'}"></div>
	    </swiper-slide>
	    <div class="swiper-pagination"  slot="pagination"></div>
	    <div class="swiper-button-prev" slot="button-prev"></div>
	    <div class="swiper-button-next" slot="button-next"></div>
  	</swiper>
</template>
<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default {
		data() {
      		return {
		        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
		        notNextTick: true,
		        swiperOption: {
		          	// swiper optionss 所有的配置同swiper官方api配置
		          	autoplay: 3000,
		          	direction : 'horizontal',
		          	grabCursor : false,
		          	setWrapperSize :true,
		          	autoHeight: true,
		          	loop: true,
		          	pagination : '.swiper-pagination',
		          	paginationClickable :true,
		          	prevButton:'.swiper-button-prev',
		          	nextButton:'.swiper-button-next',
		          	simulateTouch:false,
		          	observeParents:true,
		          	// 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
		          	debugger: true,
		          	// swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
		          	onTransitionStart(swiper){
		            	// console.log(swiper)
		          	}
		        },
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
		        ]
    		}
		},
		// 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
	    computed: {
	      	swiper() {
	        	return this.$refs.mySwiper.swiper
	      	}
	    },
	    mounted() {
	      	// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
	      	// console.log('this is current swiper instance object', this.swiper)
	      	// this.swiper.slideTo(3, 1000, false)
	    },
		components: {
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="stylus">
	.swiper-container
		.slide
			height 383px
			line-height 400px
			font-size 30px
			background-color #aaa
			background-repeat no-repeat
			background-position top center
		.swiper-pagination-bullet-active
			background #fff
</style>