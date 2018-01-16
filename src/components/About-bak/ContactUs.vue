<template>
<div>
	<div class="tit">
		<span :class="{'on':tabs==1}" @click="tab(1)">云南总部</span>
		<span :class="{'on':tabs==2}" @click="tab(2)">深圳分部</span>
	</div>
	<div class="con">
		<div class="mapbox">	
			<baidu-map class="map" :center="position" :zoom="18">
				<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
				<bm-marker :position="position"></bm-marker>
				<bm-info-window :position="position" title="详细地址：" :show="true">
			      	<strong v-show="tabs==1">云南省昆明经开区出口加工区经景路38号</strong>
			      	<strong v-show="tabs==2">广东省深圳市南山区深圳市软件产业基地易思博软件大厦1105室</strong>
			    </bm-info-window>
			</baidu-map>
		</div>	
		<div v-show="tabs==1" class="contactInfo">
			<p class="companyName"><img src="../../assets/img/icon1.png" /><span>云南微服物流大数据运营有限公司</span></p>
			<p><img src="../../assets/img/icon2.png" /><label>网址：</label><span>www.we-service.cn</span></p>
			<p><img src="../../assets/img/icon3.png" /><label>电话：</label><span>0871-67366835</span></p>
			<p><img src="../../assets/img/icon4.png" /><label>传真：</label><span>0871-67366835</span></p>
			<p><img src="../../assets/img/icon5.png" /><label>邮箱：</label><span>we-service@vfu56.com</span></p>
			<p><img src="../../assets/img/icon6.png" /><label>地址：</label><span>云南省昆明经开区出口加工区经景路38号</span></p>
		</div>
		<div v-show="tabs==2" class="contactInfo">
			<p class="companyName"><img src="../../assets/img/icon1.png" /><span>深圳前海微服大数据科技有限公司</span></p>
			<p><img src="../../assets/img/icon2.png" /><label>网址：</label><span>www.we-service.cn</span></p>
			<p><img src="../../assets/img/icon3.png" /><label>电话：</label><span>0755-26607376</span></p>
			<p><img src="../../assets/img/icon5.png" /><label>邮箱：</label><span>qhwf@vfu56.com</span></p>
			<p><img src="../../assets/img/icon6.png" /><label>地址：</label><span>广东省深圳市南山区深圳市软件产业基地易思博软件大厦1105室</span></p>
		</div>
	</div>
</div>
</template>
<script>
	export default {
		data() {
			return {
				tabs: 1,
				position:{
					"lng": 102.772111,
					"lat": 25.006708
				},
			}
		},
		methods: {
			tab(x) {
				this.tabs = x;
				if (x == 1) {
					this.position = {
						"lng": 102.772111,
						"lat": 25.006708
					}
				}else {
					this.position = {
						"lng": 113.945815,
						"lat": 22.52821
					}
				};
				console.log(this.position)
			}
		},
		components: {

		}
	}
</script>
<style lang="stylus" scoped>
	.tit
		border-bottom 1px solid #f0f0f0
		height 40px
		span
			height 40px
			line-height 40px
			padding 0 30px
			font-size 14px
			display inline-block
			cursor pointer
			&.on
				color #6cc
				border-bottom 4px solid #6cc
	.con
		padding 20px 20px 80px
		.mapbox
			height 400px
			width 990px
			overflow hidden
			margin-bottom 20px
			.map
				width 100%
				height 400px
		.contactInfo
			height 200px
			p
				font-size 14px
				color #666
				height 30px
				line-height 30px
				&.companyName
					font-size 24px
					color #3480b1
					height 40px
					line-height 40px
				label
					color #3480b1
					display inline-block
					vertical-align middle
				img
					width 18px
					height 18px
					display inline-block
					vertical-align text-bottom
					margin-right 5px
				span
					display inline-block
					vertical-align middle

</style>