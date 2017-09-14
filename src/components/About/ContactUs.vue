<template>
<div>
	<div class="tit">
		<span :class="{'on':tabs==1}" @click="tab(1)">云南总部</span>
		<span :class="{'on':tabs==2}" @click="tab(2)">深圳分部</span>
	</div>
	<div class="con">			
		<baidu-map class="map" :center="position" :zoom="18">
			<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
			<bm-marker :position="position"></bm-marker>
			<bm-info-window :position="position" title="详细地址：" :show="true">
		      	<strong v-show="tabs==1">云南省...</strong>
		      	<strong v-show="tabs==2">深圳市南山区易思博大厦1105</strong>
		    </bm-info-window>
		</baidu-map>
		<div class="title">商务合作</div>
		<div class="contactInfo">
			<p>联系人：朱静静</p>
			<p>电话：400-xxx-xxxx</p>
			<p>邮箱：zhujj@vfu56.com</p>
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
		padding 20px 20px 100px
		.map
			width 100%
			height 400px
			margin-bottom 20px
		.title
			height 40px
			line-height 40px
			font-size 20px
			color #6cc
		.contactInfo
			line-height 30px
			color #999
			p
				text-indent 2em
		
</style>