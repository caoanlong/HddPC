<template>
	<div>
		<!-- <Swiper :autoPlay="true" :auto-play-time="3000"></Swiper> -->
		<div class="banner">
			<img src="../../static/img/banner_01.jpg" />
			<img src="../../static/img/banner_02.jpg" />
			<img src="../../static/img/banner_03.jpg" />
			<img src="../../static/img/banner_04.jpg" />
			<img src="../../static/img/banner_05.jpg" />
			<img src="../../static/img/banner_06.jpg" />
		</div>
		<div class="partner">
			<div class="page-w">
				<div class="partnerHeader">
					<p class="title">合作伙伴</p>
					<p class="subtit">partner</p>
				</div>
				<div class="partnerList">
					<ul>
						<router-link to="" tag="li"><img src="../../static/img/partner/zabx.png"></router-link>
						<router-link to="" tag="li"><img src="../../static/img/partner/hxyy.png"></router-link>
						<router-link to="" tag="li"><img src="../../static/img/partner/hhjt.png"></router-link>
						<router-link to="" tag="li"><img src="../../static/img/partner/tgbx.png"></router-link>
						<router-link to="" tag="li"><img src="../../static/img/partner/kmjy.png"></router-link>
						<router-link to="" tag="li"><img src="../../static/img/partner/ynwl.png"></router-link>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// import Swiper from './commonComponents/Swiper'
	export default {
		created() {
			this.$store.commit({type:'selectChange',selected:-1})
			// let url = this.__webserver__ + 'area/tree'
			// this.$http.get(url).then(res => {
			// 	console.log(JSON.stringify(res.body.data))
			// })
		},
		components: {
			// Swiper
		}
	}
</script>
<style lang="stylus" scoped>
	.banner
		img
			width 100%
			vertical-align top
	.partner
		background #f4f4f4
		height 380px
		color #868c9e
		text-align center
		.partnerHeader		
			position relative			
			padding-bottom 30px 0
			&:before
			&:after
				content ''
				height 1px
				width 400px
				display block
				position absolute
				top 50%
				left 120px
				background #bdc0c9
			&:after
				right 120px
				left auto
			.title
				font-size 24px
			.subtit
				font-size 14px
		.partnerList
			width 840px
			margin 40px auto 0
			li
				margin 15px
				display inline-block
				cursor pointer
</style>