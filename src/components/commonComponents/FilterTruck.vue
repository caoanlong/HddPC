<template>
	<div class="filter" v-if="findType=='truck'">
		<div class="tit" >找车条件</div>
		<div class="con clearfix">
			<div class="form-item">
				<span class="labels">车长：</span>
				<div class="optionBox clearfix">
				<div class="option clearfix" :class="{'height-auto':moreTruckLength}">
					<MultipleSelector :optionList="truckLengthList" :defaultOption="selectTruckLengthIndex" @multipleSelect="selectTruckLength"></MultipleSelector>
					<span class="more fr" :class="{'fold': moreTruckLength}" v-text="moreText1" @click.stop="more('moreTruckLength')"></span>
				</div>
				</div>
			</div>
			<div class="form-item">
				<span class="labels">车型：</span>
				<div class="optionBox clearfix">
					<div class="option clearfix" :class="{'height-auto':moreTruckClass}">
						<SimpleSelector :styleClass="1" :optionList="truckTypeList" :defaultOption="selectedTruckClass" @simpleSelect="selectTruckClass"></SimpleSelector>
						<span class="more fr" :class="{'fold': moreTruckClass}" v-text="moreText2" @click.stop="more('moreTruckClass')"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="text-right mt clearfix">
			<button class="filter-btn fr" @click.stop="find()">立即找车</button>
		</div>
	</div>
	<div class="filter" v-else-if="findType=='goods'">
		<div class="tit">找货条件</div>
		<div class="con clearfix">
			<div class="form-item Start">
				<span class="labels">始发地：</span>
				<div class="text-input AreaSelect" @click.stop="selectStartArea($event)">
		        	<span class="selectTips" v-if="startArea.province.key">
						<span v-text="startArea.province.value"></span>
						<span v-text="startArea.city.value"></span>
						<span v-text="startArea.dist.value"></span>
					</span>
		        </div>
				<AreaSelector :option="selectStartAreaOption" @selectArea="getStartArea"></AreaSelector>
			</div>
			<div class="form-item End">
				<span class="labels">目的地：</span>
				<div class="text-input AreaSelect" @click.stop="selectEndArea($event)">
			        <span class="selectTips" v-for="endArea in endAreaList" v-if="endArea.province.key">
						<span v-text="endArea.province.value"></span>
						<span v-text="endArea.city.value"></span>
						<span v-text="endArea.dist.value"></span>
						<span class="close-icon" title="关闭" @click.stop="closeTips(endArea.province.key)"></span>
					</span>
				</div>
		        <AreaSelectorMultiple :option="selectEndAreaOption" @selectArea="getEndArea"></AreaSelectorMultiple>
			</div>
		</div>
		<div class="text-right mt clearfix">
			<button class="filter-btn fr" @click.stop="find()">立即找货</button>
		</div>
	</div>
</template>
<script>
	import AreaSelector from './AreaSelector'
	import AreaSelectorMultiple from './AreaSelectorMultiple'
	import MultipleSelector from './MultipleSelector'
	import SimpleSelector from './SimpleSelector'
	import CheckBox from './CheckBox'
	import common from '../../common/common'
	export default {
		props: {
			findType: {
				type: String,
				default: 'truck'
			}
		},
		data() {
			return {
				moreTruckLength: false,
				moreTruckClass: false,
				truckLengthList: [],
				truckTypeList: [],
				startArea: {
					"province": {
						"key": '',
						"value": '',
					},
					"city": {
						"key": '',
						"value": '',
					},
					"dist": {
						"key": '',
						"value": '',
					},
				},
				selectStartAreaOption: {
					isShow: false,
					width: 0,
					left: 0,
					top: 0
				},
				endAreaList: [],
				selectEndAreaOption: {
					isShow: false,
					width: 0,
					left: 0,
					top: 0
				},

				selectTruckLengthList: '',
				selectTruckLengthIndex: [0],
				selectTruckClassLi: '',
				selectedTruckClass: 0,
				selectTruckStatusLi: ''
			}
		},
		computed: {
			moreText1() {
				if (this.moreTruckLength) {
					return '收起'
				}else {
					return '更多'
				}
			},
			moreText2() {
				if (this.moreTruckClass) {
					return '收起'
				}else {
					return '更多'
				}
			},
			selectedStartArea() {
				return this.startArea.dist.key || this.startArea.city.key || this.startArea.province.key
			},
			selectedEndArea() {
				return this.areaArrToStr(this.endAreaList);
			}
		},
		created() {
			this.getConst('TruckLength');
			this.getConst('TruckType');
		},
		methods: {
			more(type) {
				if (type == 'moreTruckLength') {
					this.moreTruckLength = !this.moreTruckLength;
				}else if (type == 'moreTruckClass') {
					this.moreTruckClass = !this.moreTruckClass;
				}
			},
			isReturn(boolean) {
				this.isComeBack = boolean?'Y':'N';
			},
			selectStartArea(e) {
				common.trigger(document);
				this.selectStartAreaOption = {
					isShow: true,
					left: e.target.offsetLeft+'px',
					top: (e.target.offsetHeight+4)+'px'
				};
			},
			getStartArea(obj) {
				this.startArea = obj;
				// console.log(JSON.stringify(this.selectedStartArea));
			},
			selectEndArea(e) {
				common.trigger(document);
				this.selectEndAreaOption = {
					isShow: true,
					left: e.target.offsetLeft+'px',
					top: (e.target.offsetHeight+4)+'px'
				};
			},
			getEndArea(arr) {
				this.endAreaList = arr;
				// console.log(JSON.stringify(this.selectedEndArea));
			},
			//删除已选的标签
			closeTips(key) {
				for (let i in this.endAreaList) {
					if(this.endAreaList[i].province.key == key) {
						this.endAreaList.splice(i,1);
					}
				};
				// console.log(JSON.stringify(this.endAreaList));
			},
			selectTruckLength(obj) {
				this.selectTruckLengthList = this.arrToStr(obj,'code');
				console.log(JSON.stringify(this.selectTruckLengthList));
			},
			selectTruckClass(obj) {
				this.selectTruckClassLi = obj.code;
				// console.log(JSON.stringify(this.selectTruckClassLi));
			},
			find() {
				var params = {
					"areaFrom": this.selectedStartArea,
					"areaTo": this.selectedEndArea,
					"length": this.selectTruckLengthList,
					"type": this.selectTruckClassLi
				};
				this.$emit('search',params);
			}
		},
		components: {
			AreaSelector,
			AreaSelectorMultiple,
			MultipleSelector,
			SimpleSelector,
			CheckBox
		}
	}
</script>
<style lang="stylus" scoped>
	.filter
		background #fff
		border 1px solid #f0f0f0
		border-radius 4px
		padding:20px 20px 10px
		.tit
			height 34px
			line-height 34px
			font-size 14px
			color #66cccc
			font-weight bold
			padding-left 30px
			background url('../../../static/img/filter_tit_icon.png') no-repeat left center
		.con
			border-bottom 1px dashed #f0f0f0
			padding-top 10px
			.filter-tit
				height 34px
				line-height 34px
				color #878787
				font-weight bold
				&.filter-tit-icon1
					padding-left 20px
					background url('../../../static/img/pos_icon.png') no-repeat left center
				&.filter-tit-icon2
					padding-left 20px
					background url('../../../static/img/vehicle_icon1.png') no-repeat left center
		.form-item
			padding-left 80px
			position relative
			margin-bottom 10px
			min-height 45px
			.optionBox
				border-bottom 1px dashed #f0f0f0
				padding-bottom 10px
			.option
				height 40px
				overflow hidden
				&.height-auto
					height auto
				ul
					width 770px
					overflow hidden
				.more
					color #666
					height 40px
					line-height 40px
					display block
					padding 0 20px 0 10px
					background url('../../../static/img/arrow_down.png') no-repeat right center
					cursor pointer
					&.fold
						background-image url('../../../static/img/arrow_up.png')
			.labels
				width 75px
				height 40px
				line-height 40px
				padding-right 5px
				position absolute
				left 0
				top 0
				color #8c8c8c
				text-align right
			li
				padding 0 10px
				height 30px
				line-height 30px
				float left
				margin 5px 10px 5px 0
				cursor pointer
				border 1px solid transparent
				&.selected
					border-color #5182e5
					border-radius 4px
		.filter-btn
			background #ffc426
			color #fff
			border-radius 4px
			height 28px
			font-size 12px
			line-height 28px
			padding 0 20px
			display block
			cursor pointer
</style>