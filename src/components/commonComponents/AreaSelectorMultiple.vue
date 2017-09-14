<template>
	<div class="AreaSelectModal" ref="AreaSelector" :style="styleOption" v-if="option.isShow">
		<div class="data-tabs">
			<ul>
				<li class="country" @click.stop="showAll()">全部</li>
				<li class="province" v-show="isShowProvince" v-text="selectedArea.province.value" @click.stop="showProvince()"></li>
				<li class="city" v-show="isShowCity" v-text="selectedArea.city.value"></li>
			</ul>
		</div>
        <div class="data-list">
            <ul class="clearfix" ref="province" v-show="showProvinceList">
                <li v-for="(province,i) in provinceList" @click.stop="selectProvince(province,i)">
                	<span v-text="province" :class="{'selected': selectedProvinceClass.indexOf(i)>-1}"></span>
                </li>
            </ul>
            <ul class="clearfix" ref="city" v-show="showCityList">
            	<li class="all-area" @click.stop="hideAreaSelector()">
            		<span v-text="selectedArea.province.value" :class="{'selected': selectedProvinceClass.indexOf(selectedArea.province.key)>-1}"></span>
            	</li>
                <li v-for="(city,i) in cityList" @click.stop="selectCity(city,i)">
                	<span v-text="city" :class="{'selected': selectedCityClass.indexOf(i)>-1}"></span>
                </li>
            </ul>
            <ul class="clearfix" ref="dist" v-show="showDistList">
            	<li class="all-area" @click.stop="hideAreaSelector()">
            		<span v-text="selectedArea.city.value" :class="{'selected': selectedCityClass.indexOf(selectedArea.city.key)>-1}"></span>
            	</li>
                <li v-for="(dist,i) in distList" @click.stop="selectDist(dist,i)">
                	<span v-text="dist" :class="{'selected': selectedDistClass.indexOf(i)>-1}"></span>
                </li>
            </ul>
        </div>
	</div>
</template>
<script>
	import ChineseDistricts from '../../assets/distpicker.data'
	import common from '../../common/common.js'
	export default {
		props: {
			option: {
				type: Object
			}
		},
		data() {
			return {
				isShowProvince: false,
				isShowCity: false,
				showProvinceList: true,
				showCityList: false,
				showDistList: false,
				provinceList: ChineseDistricts['0'],
				cityList: [],
				distList: [],
				//多选
				selectedAreaList: [],
				//单选
				selectedArea: {
					province: {'key': '','value': ''},
					city: {'key': '','value': ''},
					dist: {'key': '','value': ''}
				},
			}
		},
		computed: {
			styleOption() {
				return {
					left: this.option.left,
					top: this.option.top
				}
			},
			selectedProvinceClass() {
				let key = [];
				for (let i = 0; i < this.selectedAreaList.length; i++) {
					key.push(this.selectedAreaList[i].province.key);
				}
				return key;
			},
			selectedCityClass() {
				let key = [];
				for (let i = 0; i < this.selectedAreaList.length; i++) {
					key.push(this.selectedAreaList[i].city.key);
				}
				return key;
			},
			selectedDistClass() {
				let key = [];
				for (let i = 0; i < this.selectedAreaList.length; i++) {
					key.push(this.selectedAreaList[i].dist.key);
				}
				return key;
			},
		},
		mounted() {
			document.addEventListener('click',() => {
				this.hideAreaSelector();
			},false)
		},
		methods: {
			//隐藏选择框
			hideAreaSelector() {
				this.isShowProvince = false;
				this.isShowCity = false;
				this.showProvinceList = true;
				this.showCityList = false;
				this.showDistList = false;
				
				if (this.option.isShow) {
					this.option.isShow = false;
					this.$emit('selectArea',this.selectedAreaList);
				}	
			},
			//点击全部
			showAll() {
				this.isShowProvince = false;
				this.isShowCity = false;
				this.showProvinceList = true;
				this.showCityList = false;
				this.showDistList = false;
			},
			//点击省份
			showProvince() {
				//清空选择的标签
				this.clearArea(false,true,true);

				this.isShowProvince = true;
				this.isShowCity = false;
				this.showProvinceList = false;
				this.showCityList = true;
				this.showDistList = false;
			},
			//选择省份
			selectProvince(obj,i) {
				this.isShowProvince = true;
				this.showProvinceList = false;
				this.showCityList = true;
				this.showDistList = false;

				this.selectedArea = {
					'province':{
						'key': i,
						'value': obj
					},
					'city': {
						'key': '',
						'value': ''
					},
					'dist': {
						'key': '',
						'value': ''
					}
				};
				this.selectedAreaList.push(this.selectedArea);
				this.cityList = ChineseDistricts[i];
			},
			//选择城市
			selectCity(obj,i) {
				this.isShowProvince = true;
				this.isShowCity = true;
				this.showProvinceList = false;
				this.showCityList = false;
				this.showDistList = true;
				
				this.selectedArea.city = {'key': i, 'value': obj};
				this.distList = ChineseDistricts[i];
			},
			//选择区县
			selectDist(obj,i) {
				if (this.selectedDistClass.indexOf(i)>-1) {
					return
				}
				this.isShowProvince = false;
				this.isShowCity = false;
				this.showProvinceList = true;
				this.showCityList = false;
				this.showDistList = false;

				this.selectedArea.dist = {'key': i, 'value': obj};
				this.hideAreaSelector();
			},
			//清空选择
			clearArea(p,c,d) {
				//清除省
				if (p) {
					this.selectedArea.province.key = '';
					this.selectedArea.province.value = '';
				};
				//清除市
				if (c) {
					this.selectedArea.city.key = '';
					this.selectedArea.city.value = '';
				};
				//清除县区
				if (d) {
					this.selectedArea.dist.key = '';
					this.selectedArea.dist.value = '';
				}
			},
		}
	}
</script>
<style lang="stylus" scoped>	
	.AreaSelectModal
		width 600px
		background #fff
		border 1px solid #ddd
		border-radius 4px	
		position absolute
		top 40px
		left 0
		z-index 99
		box-shadow 2px 2px 5px rgba(225,225,225, .75)
		&:before
			content ''
			width 9px
			height 5px
			position absolute
			left 10px
			top -5px
			display block
			background url('../../../static/img/modal_arrow.png') no-repeat
		.data-tabs
			height 38px
			padding-top 8px
			border-bottom 1px solid #ddd
			ul
				padding-left 10px
				li
					float left
					height 30px
					line-height 30px
					border 1px solid #ddd
					border-bottom none
					margin 0 5px 0 0
					padding 0 10px
					background #fff
					border-radius 4px 4px 0 0
					cursor pointer
		.data-list
			padding: 10px
			li
				float left
				margin 0
				height 30px
				line-height 30px
				padding 0
				cursor pointer
				width 25%
				border none
				box-sizing border-box
				&.all-area
					width 100%
				span
					padding 2px 5px
					color #666
					&:hover
						color #6cc
					&.selected
						color #fff
						background #6cc
						border:none				
</style>