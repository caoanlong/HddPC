<template>
	<div class="lside fl">
		<!-- 筛选 -->
		<FilterTruck findType="goods" @search="findGoods"></FilterTruck>
		<!-- 筛选 -->
		<!-- 列表 -->
		<div class="list">
			<div class="tit"><span>货源列表</span></div>
			<div class="tab">
				<div class="hd">
					<ul>
					<li class="hall" :class="{'on':tabs==1}" @click="room(1)">配货大厅</li>
					<li class="mine" :class="{'on':tabs==2}" @click="mine(2)" v-if="isLogin">我的货源</li>
					</ul>
					<router-link :to="{name: 'PublishInfo',query:{active: 21}}" class="publishBtn fr" v-if="isLogin">发布货源</router-link>
				</div>
				<div class="tabCon" v-show="tabs==1">
					<div v-if="GoodsList.length > 0">
						<GoodsList v-for="Goods in GoodsList" :key="Goods.cargoSourceID" :data="Goods"></GoodsList>
						<div class="listFooter text-center">
							<Paging :pagecount="pagecount" :pageindex="pageNum" @getpaging="getGoodsList"></Paging>
						</div>
					</div>
					<div v-if="GoodsList.length == 0">
						<Empty type="noGoods"></Empty>
					</div>
				</div>
				<div class="tabCon" v-show="tabs==2">
					<div v-if="myGoodsList.length > 0">
						<GoodsList v-for="Goods in myGoodsList" :key="Goods.cargoSourceID" :data="Goods"></GoodsList>
						<div class="listFooter text-center">
							<Paging :pagecount="pagecount" :pageindex="pageNum" @getpaging="getMyGoodsList"></Paging>
						</div>
					</div>
					<div v-if="myGoodsList.length == 0">
						<Empty type="noPublishGoods"></Empty>
					</div>
				</div>
			</div>
		</div>
		<!-- 列表 -->
	</div>
</template>
<script>
	import FilterTruck from '../commonComponents/FilterTruck'
	import GoodsList from './GoodsList'
	import Paging from '../commonComponents/Paging'
	import Empty from '../commonComponents/Empty'
	export default {
		data() {
			return {
				tabs: 1,
				pageNum: 1,
				pagecount: 1,
				GoodsList: [],
				myGoodsList: [],
			}
		},
		computed: {
			isLogin () {
				return localStorage.getItem('memberInfo') && localStorage.getItem('authorization')
			}
		},
		created() {
			this.getGoodsList();
		},
		http: {
		    headers: {
		      'Authorization': localStorage.getItem('authorization')||''
		    }
		},
		methods: {
			room(i) {
				if (this.tabs == i) {return};
				this.tabs = i;
				this.getGoodsList();
			},
			mine(i) {
				if (this.tabs == i) {return};
				this.tabs = i;
				this.getMyGoodsList();
			},
			getGoodsList(pageNum, bool) {
				if (bool) return
				let URL = ''
				if(this.isLogin){
					URL = this.__webserver__ + 'cargoSource/findByCondition'
				}else{
					URL = this.__webserver__ + 'adv/cargoSource/list'
				}
				let params = {
					"areaFrom": this.areaFrom,
					"areaTo": this.areaTo,
					"length": this.length,
					"type": this.type,
					"pageSize": this.PAGESIZE,
					"pageNum": pageNum
				}
				this.$http.get(URL,{params:params}).then(
					(res) => {
						console.log(JSON.stringify(res.body.message))
						if (res.body.code == 200) {
							this.pagecount = res.body.data.pages
							this.pageNum = res.body.data.pageNum
							this.GoodsList = res.body.data.list
							console.log(JSON.stringify(res.body.data.list))
						}
					},
					(res) => {
						console.log(JSON.stringify(res.body.message));
					}
				)
			},
			getMyGoodsList(pageNum, bool) {
				if (bool) return
				let URL = this.__webserver__ + 'cargoSource/myList'
				let params = {
					"areaFrom": this.areaFrom,
					"areaTo": this.areaTo,
					"length": this.length,
					"type": this.type,
					"pageSize": this.PAGESIZE,
					"pageNum": pageNum
				}
				this.$http.get(URL,{params:params}).then(
					(res) => {
						console.log(JSON.stringify(res.body.message))
						if (res.body.code == 200) {
							this.pagecount = res.body.data.pages
							this.pageNum = res.body.data.pageNum
							this.myGoodsList = res.body.data.list
							console.log(JSON.stringify(res.body.data.list))
						}
					},
					(res) => {
						console.log(JSON.stringify(res.body.message));
					}
				)
			},
			findGoods(param) {
				if (this.tabs == 1) {
					this.getGoodsList(param);
				}else {
					this.getMyGoodsList(param);
				}			
			}
		},
		components: {
			FilterTruck,
			GoodsList,
			Paging,
			Empty
		}
	}
</script>
<style lang="stylus" scoped>
	.lside
		width 950px
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
				min-height 34px
				
				.option
					border-bottom 1px dashed #f0f0f0
					padding-bottom 10px
					ul
						width 770px
						overflow hidden
					.more
						color #666
						height 34px
						line-height 34px
						display block
						padding 0 20px 0 10px
						background url('../../../static/img/arrow_down.png') no-repeat right center
						&.fold
							background-image url('../../../static/img/arrow_up.png')
				.labels
					width 75px
					height 34px
					line-height 34px
					padding-right 5px
					position absolute
					left 0
					top 0
					color #8c8c8c
					text-align right
				input[type="text"]
					padding 6px 12px
					height 18px
					line-height 18px
					outline none
					border 1px solid #f0f0f0
					border-radius 4px
				li
					padding 0 10px
					height 24px
					line-height 24px
					float left
					margin 5px 10px 5px 0
					cursor pointer
					&.selected
						border 1px solid #5182e5
						padding 0 9px
						border-radius 4px
						height 22px
						line-height 22px
				.multiple
					li
						&.selected
							color #5182e5
							background #fff
				.single
					li
						&.selected
							color #fff
							background #5182e5
			.filter-btn
				background #ffc426
				color #fff
				border-radius 4px
				height 34px
				line-height 34px
				width 110px
				text-align center
				display block
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
						height 28px
						line-height 28px
						color #fff
						background #6cc
						display block
						padding 0 20px
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
					padding 0 15px
			.listFooter
				background #fff;
				padding 20px 0
				border-radius 0 0 4px 4px
</style>