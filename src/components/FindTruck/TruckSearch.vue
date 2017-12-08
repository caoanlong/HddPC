<template>
	<div class="lside fl">
		<!-- 筛选 -->
		<FilterTruck findType="truck" @search="findTruck"></FilterTruck>
		<!-- 筛选 -->
		<!-- 列表 -->
		<div class="list">
			<div class="tit"><span>车源列表</span></div>
			<div class="tab">
				<div class="hd">
					<ul>
						<li class="hall" :class="{'on':tabs==1}" @click="inField(1)">车场</li>
						<li class="mine" :class="{'on':tabs==2}" @click="inFleet(2)">车队</li>
					</ul>
				</div>
				<div class="tabCon" v-if="tabs==1">
					<div v-if="TruckFieldSourceList.length > 0">
						<TruckList v-for="TruckFieldSource in TruckFieldSourceList" :key="TruckFieldSource.truckSourceID" :dataDetail="TruckFieldSource"></TruckList>
						<div class="listFooter text-center">
							<Paging :pagecount="pagecount" :pageindex="pageIndex" @getpaging="getTruckList"></Paging>
						</div>
					</div>
					<div v-if="TruckFieldSourceList.length == 0">
						<Empty type="noTruck"></Empty>
					</div>
				</div>
				<div class="tabCon" v-if="tabs==2">
					<div v-if="TruckFleetSourceList.length > 0">
						<TruckList v-for="TruckFleetSource in TruckFleetSourceList" :key="TruckFleetSource.truckSourceID" :dataDetail="TruckFleetSource"></TruckList>
						<div class="listFooter text-center">
							<Paging :pagecount="pagecount" :pageindex="pageIndex" @getpaging="getTruckList"></Paging>
						</div>
					</div>
					<div v-if="TruckFleetSourceList.length == 0">
						<Empty type="noTruck"></Empty>
					</div>
				</div>
			</div>
		</div>
		<!-- 列表 -->
	</div>
</template>
<script>
	import FilterTruck from '../commonComponents/FilterTruck'
	import TruckList from './TruckList'
	import Paging from '../commonComponents/Paging'
	import Empty from '../commonComponents/Empty'
	export default {
		data() {
			return {
				tabs:1,
				total: 1,
				pageIndex: 1,
				TruckFieldSourceList: [],
				TruckFleetSourceList: [],
			}
		},
		computed: {
			pagecount() {
				return Math.ceil(this.total/this.PAGESIZE);
			}
		},
		created() {
			this.getTruckList();
		},
		methods: {
			inField(i) {
				if (this.tabs == i) {return};
				this.tabs = i;
				this.getTruckList();
			},
			inFleet(i) {
				if (this.tabs == i) {return};
				this.tabs = i;
				this.getFleetTruckList();
			},
			getTruckList(param) {
				let URL = this.__webserver__ + '/adv/truck/list';
				if (param) {
					var params = {
						// "areaFrom": param.areaFrom,
						// "areaTo": param.areaTo,
						"length": param.length,
						"type": param.type,
						// "transStatus": param.transStatus,
						// "isReturn": param.isReturn,
						"pageSize": this.PAGESIZE,
					};
				}else {
					var params = {
						"pageSize": this.PAGESIZE,
					};
				};
				console.log(JSON.stringify(params));
				this.$http.get(URL,{params: params}).then(
					(res) => {
						console.log(JSON.stringify(res.body.message));
						if (res.body.code == 200) {
							this.total = res.body.data.total;
							this.TruckFieldSourceList = res.body.data.list;
							// console.log(JSON.stringify(res.body.data.list));
						}
					},
					(res) => {
						console.log(JSON.stringify(res));
					}
				)
			},
			getFleetTruckList(param) {
				let URL = this.__webserver__ + 'truck/fleet/findPage';
				if (param) {
					var params = {
						// "areaFrom": param.areaFrom,
						// "areaTo": param.areaTo,
						"length": param.length,
						"type": param.type,
						// "transStatus": param.transStatus,
						// "isReturn": param.isReturn,
						// focusType: 'Selft'
						// "pageSize": this.PAGESIZE,
					};
				}else {
					var params = {
						// focusType: 'Selft'
						// "pageSize": this.PAGESIZE,
					};
				};
				this.$http.post(URL,params).then(
					(res) => {
						console.log(JSON.stringify(res.body.message));
						if (res.body.code == 200) {
							this.total = res.body.data.total;
							this.TruckFleetSourceList = res.body.data.list;
							console.log(JSON.stringify(res.body.data));
						}
					},
					(res) => {
						console.log(JSON.stringify(res));
					}
				)
			},
			findTruck(param) {
				if (this.tabs == 1) {
					this.getTruckList(param);
				}else {
					this.getFleetTruckList(param);
				}			
			}
		},
		components: {
			FilterTruck,
			TruckList,
			Paging,
			Empty
		}
	}
</script>
<style lang="stylus" scoped>
	.lside
		width 950px
		.list
			margin-top 10px
			.tit
				height 34px
				line-height 34px
				font-size 14px
				color #fff
				background #66cccc
				font-weight bold
				border-radius 4px 4px 0 0
				padding 0 10px
				span
					background url('../../../static/img/list_tit_icon.png') no-repeat left center 
					padding-left 30px
					height 34px
					line-height 34px
					display block
			.tab
				padding 5px
				background #f2f2f2
				.hd
					height 40px
					.publishBtn
						height 30px
						line-height 30px
						color #fff
						background #6cc
						display block
						width 110px
						text-align center
						border-radius 4px
						margin 5px 15px 0 0 
					li
						height 31px
						line-height 31px
						float left
						padding:0 20px
						background #eaeaea
						color #bababa
						margin-top 9px
						border 1px solid #f0f0f0
						border-bottom none
						font-size 14px
						cursor pointer
						&.on
							background #fff
							color #6cc
							height 32px
							border-radius 4px 4px 0 0
							border-bottom-color #fff;
			.tabCon
				background #fff
				border 1px solid #f0f0f0
				border-radius 0 4px 4px 4px
			.listFooter
				background #fff;
				padding 20px 0
				border-radius 0 0 4px 4px
</style>