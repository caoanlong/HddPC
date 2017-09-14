<template>
	<div>
		<div class="fullMask" @click.stop="closeModal()"></div>
		<div class="GetLocationModal" :style="{'width':width+'px','height':height+'px','margin-top':(-height/2)+'px','margin-left':(-width/2)+'px'}">
			<div class="modal-title">地址定位<span class="closeBtn" @click.stop="closeModal()"></span></div>
			<div class="modal-body" :style="{'height':(height-40)+'px'}">
				<div class="search">
		            <input type="text" placeholder="请输入搜索关键字" class="text-input searchInput" v-model="keyword" />
					<div class="list mt">
						<div class="item" :class="'tag'+i" v-for="(result,i) in results" @click.stop="openInfoWindow(result,i)">
							<p class="f14 title" v-text="result.title"></p>
							<p class="address f12" v-text="result.address"></p>
						</div>
					</div>
					<div class="text-center mt">
						<button type="button" class="confirmBtn" :disabled="!selectedArea" @click.stop="closeModal(true)">确定选择</button>
					</div>
			  	</div>
				<baidu-map class="map"
					:center="{lng: locationPosition.lng, lat: locationPosition.lat}"
					:scroll-wheel-zoom="true"
					:zoom="14">
					<bm-local-search :keyword="keyword" :auto-viewport="true" :location="locationCity" :panel="false" :pageCapacity="10" @searchcomplete="showResult"></bm-local-search>
					<bm-info-window :position="{lng: locationPosition.lng, lat: locationPosition.lat}" :title="'<strong>'+infoWindow.title+'</strong>'" :show="infoWindow.show" :autoPan="true" @close="infoWindowClose" @open="infoWindowOpen">
				      	<p v-text="infoWindow.contents"></p>
				    </bm-info-window>
					<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
					<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" @locationSuccess="getLocation"></bm-geolocation>
				</baidu-map>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			width: {
				type: Number,
				default: 100
			},
			height: {
				type: Number,
				default: 50
			},
			area: {
				type: Object
			},
			isShowMapModel: {
				type: Boolean
			}
		},
		data() {
			return {
				locationPosition: {
					lng: 113.950723,
					lat: 22.558888
				},
				infoWindow: {
			        show: false,
			        title: '',
			        contents: ''
			    },
				locationCity: '',
				keyword: '',
				results: [],
				selectedArea: null,
				index: -1
			}
		},
		watch: {
			area: {
				handler: function(newVal) {
					this.locationCity = newVal.city.value;
					let URL = 'http://api.map.baidu.com/geocoder/v2/?ak=AjsVKu7N9iBX2klb9ktqGfAvA5dkfRBs&output=json'+'&address='+encodeURIComponent((newVal.city.value+newVal.dist.value+newVal.province.value)||(newVal.city.value+newVal.province.value)||newVal.province.value);
					this.$http.jsonp(URL).then(
						(res) => {
							console.log(res.body.result.location);
							this.locationPosition = res.body.result.location;
							console.log(this.locationPosition);
						},
						(res) => {
							console.log(res)
						}
					)
				},
				deep: true
			},
			// 自动定位
			// isShowMapModel(newVal) {
			// 	if (newVal) {
			// 		let x = common.getElementsClass('BMap_geolocationIcon');
			// 		//触发定位按钮的click事件
			// 		common.trigger(x[1]);
			// 	}
			// }
		},
		methods: {
			closeModal(Boolean) {
				if (Boolean) {
					if (this.selectedArea) {
						this.$emit('closeModal',this.selectedArea);
					}else {
						return
					}
				};
				this.$emit('closeModal');
			},
			getLocation(e) {
				this.locationPosition = e.point;
				this.locationCity = e.addressComponent.city;
				console.log(e);
				console.log(e.addressComponent);
			},
			showResult(obj) {
				if (obj) {
					this.results = obj.vr;
				}else {
					this.results = '';
				}
			},
			openInfoWindow(obj,i) {
				this.index = i;
				this.locationPosition = obj.point;
				this.infoWindow = {'show':true,'title':obj.title,'contents':obj.address};
				this.selectedArea = obj;
			},
			infoWindowClose (e) {
		      	this.infoWindow.show = false;
		    },
		    infoWindowOpen (e) {
		      	this.infoWindow.show = true;
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
	.GetLocationModal
		position fixed
		top 50%
		left 50%
		z-index 1000
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
			padding 10px 10px 10px 340px
			box-sizing border-box
			background #f6f6f6
			border-radius 0 0 4px 4px
			position relative
			.map
				height 100%
				width 100%
			.search
				width 320px
				position absolute
				left 10px
				top 10px
			.confirmBtn
				background rgba(102,204,204,1)
				color #fff
				border none
				height 40px
				line-height 40px
				display block
				width 100%
				border-radius 4px
				font-size 14px
				outline none
				cursor pointer
				&:hover
					background rgba(102,204,204,.9)
				&:active
					background rgba(102,204,204,.95)
				&[disabled]
					border 1px solid #dddee1
					background #f7f7f7
					cursor not-allowed
					color #666
			.list
				background #fff
				border 1px solid #f0f0f0
				padding 10px
				border-radius 4px
				overflow hidden
				height 362px
				overflow-y auto
				.item
					position relative
					padding 10px 5px 10px 30px
					color #878787
					border-top 1px solid #f0f0f0
					cursor pointer
					&:before
						content ''
						width 21px
						height 25px
						display block
						background url('../../../static/img/markers.png') no-repeat
						position absolute
						left 0
						top 10px
					&:first-child
						border-top none
					&:hover,&.on
						background #dce7fb
					.title
						color #585757
						font-size 14px
					.address
						height 20px
						line-height 20px
						width 258px
						display block
						font-size 12px
						text-overflow ellipsis
						overflow hidden
						white-space nowrap
					&.tag0
						&:before
							background-position 0 0
					&.tag1
						&:before
							background-position 0 -25px
					&.tag2
						&:before
							background-position 0 -50px
					&.tag3
						&:before
							background-position 0 -75px
					&.tag4
						&:before
							background-position 0 -100px
					&.tag5
						&:before
							background-position 0 -125px
					&.tag6
						&:before
							background-position 0 -150px
					&.tag7
						&:before
							background-position 0 -175px
					&.tag8
						&:before
							background-position 0 -200px
					&.tag9
						&:before
							background-position 0 -225px						
</style>