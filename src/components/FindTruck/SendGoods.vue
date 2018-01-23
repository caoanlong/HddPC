<template>
	<div>
		<div class="sendGoods fl">
			<div class="tit">推送货源<CheckBoxCircle :value="null" :isCheck="isCheckAll" @isChecked="checkAll"></CheckBoxCircle></div>
			<div class="goodsList">
				<div class="listItem" v-for="goodsLi in GoodsList">
					<span class="businessModels businessModels1" v-if="goodsLi.cargoFreightType=='Fix'">定价</span>
					<span class="businessModels businessModels2" v-else-if="goodsLi.cargoFreightType=='Talk'">议价</span>
					<span class="businessModels businessModels3" v-else-if="goodsLi.cargoFreightType=='Agent'">中介</span>
					<div class="lineInfo fl">
						<p class="start" :title="goodsLi.fromAreaName|clearComma">{{goodsLi.fromAreaName|clearComma}}</p>
						<p class="end" :title="goodsLi.toAreaName|clearComma">{{goodsLi.toAreaName|clearComma}}</p>
					</div>
					<div class="goodsInfo fl">
						<p class="goods">{{goodsLi.cargoDesc}}</p>
						<p class="vehicleInfo">{{goodsLi.truckDesc}}</p>
					</div>
					<div class="loadingTime fl">
						<p class="title">装货时间：</p>
						<p class="time">
							<span>{{goodsLi.loadingDate}}</span>
							<span v-if="goodsLi.loadingTimeSlot=='NoLimit'">全天</span>
							<span v-else-if="goodsLi.loadingTimeSlot=='AM'">上午</span>
							<span v-else-if="goodsLi.loadingTimeSlot=='PM'">下午</span>
							<span v-else-if="goodsLi.loadingTimeSlot=='Night'">晚上</span>
							<span v-else-if="goodsLi.loadingTimeSlot=='Limit'"></span>
						</p>
					</div>
					<CheckBoxCircle :value="goodsLi" :isCheck="(selectedList.indexOf(goodsLi)>-1)" @isChecked="checkOne"></CheckBoxCircle>
				</div>
				<div class="listFooter clearfix">
					<div class="fl">
						<Paging :pagecount="pagecount" :pageindex="pageIndex"></Paging>
					</div>
					<button class="btn fr">推送货源</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import CheckBoxCircle from '../commonComponents/CheckBoxCircle'
	import Paging from '../commonComponents/Paging'
	export default {
		data() {
			return {
				total: 1,
				pageIndex: 1,
				GoodsList: [],
				selectedList: []
			}
		},
		props: {
			businessModels:{
				type: Number,
				default: 1
			}
		},
		computed: {
			truckSourceID() {
				return this.$route.query.truckSourceID
			},
			pagecount() {
				return Math.ceil(this.total/this.PAGESIZE);
			},
			isCheckAll() {
				for(let i = 0; i < this.GoodsList.length; i++){
			       	if(this.selectedList.indexOf(this.GoodsList[i]) == -1) {
			       		return false;
			       	}
			    }
			    return true;
			}
		},
		created() {
			this.getGoodsList(1);
		},
		methods: {
			getGoodsList(pageIndex) {
				let URL = this.__webserver__ + 'cargoSource/findByCondition';
				var params = {
					// endIndex: pageIndex,
					pageSize: this.PAGESIZE
				};
				this.$http.get(URL,{params:params}).then((res) => {
					if (res.body.code == 200) {
						this.total = res.body.data.total
						this.GoodsList = res.body.data.list
						// console.log(JSON.stringify(res.body.data.list));
					}
				})
			},
			checkAll(value,isChecked) {
				if (!isChecked) {
					//如果没有全选，应将剩余未选的子项添加进来
					for (let i = 0; i < this.GoodsList.length; i++) {
						let index = this.selectedList.indexOf(this.GoodsList[i])
						if (index == -1) {
							this.selectedList.push(this.GoodsList[i])
						}
					}
				}else {
					//如果全选，则从已选的项去除当前页所有的项
					for (let j = 0; j < this.GoodsList.length; j++) {
						let index = this.selectedList.indexOf(this.GoodsList[j])
						if (index > -1) {
							this.selectedList.splice(index,1)
						}
					}
				}
			},
			checkOne(value,isChecked) {
				if (!isChecked) {
					this.selectedList.push(value);
				}else {
					let index = this.selectedList.indexOf(value)
					if (index > -1) {
						this.selectedList.splice(index,1)
					}
				};
				// console.log(JSON.stringify(this.selectedList))
			}
		},
		components: {
			CheckBoxCircle,
			Paging
		}
	}
</script>
<style lang="stylus" scoped>
	.sendGoods
		width 950px
		background #fff
		border 1px solid #f0f0f0
		border-radius 4px
		padding 20px 20px 10px
		.tit
			height 34px
			line-height 34px
			padding 0 20px
			font-size 14px
			position relative
			color #6cc
			font-weight bold
			border-bottom 1px solid #f0f0f0
			.checkbox
				position absolute
				right 20px
				top 7px
		.listItem
			height 80px
			padding 10px 0 10px 60px
			position relative
			border-bottom 1px dashed #f0f0f0
			.checkbox
				position absolute
				right 20px
				top 25px
			p
				line-height 30px
			.businessModels
				position absolute
				left 20px
				top 18px
				border-radius 4px
				padding:1px 4px
				border 1px solid transparent
				background #fff
				&.businessModels1
					color #6cc
					border-color #6cc
				&.businessModels2
					color #5182e5
					border-color #5182e5
				&.businessModels3
					color #fcab20
					border-color #fcab20
			.lineInfo
				padding 0 20px 0 10px
				width 275px
				p
					background-repeat no-repeat
					width 245px
					text-overflow ellipsis
					white-space nowrap
					overflow hidden
					&.start
						&:before
							content '始'
							color #6cc
							margin-right 10px
					&.end
						&:before
							content '终'
							color #ec4c4f
							margin-right 10px
			.goodsInfo
				padding:0 20px
				width 260px
				height 60px
				border-left 1px solid #f0f0f0
				border-right 1px solid #f0f0f0
				p
					background-repeat no-repeat
					padding-left 20px
					text-overflow ellipsis
					white-space nowrap
					overflow hidden
					&.user
						background-image url('../../../static/img/user_icon.png')
					&.vehicleInfo
						background-image url('../../../static/img/vehicle_icon.png')
					&.goods
						background-image url('../../../static/img/goods_icon.png')
					&.company_name
						background-image url('../../../static/img/company_icon.png')
						color #6cc
			.loadingTime
				padding-left 30px
				width 200px
				p
					background-repeat no-repeat
					padding-left 20px
					&.title
						background-image url('../../../static/img/clock_icon.png')
					&.time
						color #6cc
						background none
		.listFooter
			padding:0 20px
			.btn
				background rgba(102,204,204,1)
				color #fff
				padding:0 20px
				height 28px
				line-height 28px
				border-radius 4px
				margin-top 20px
				cursor pointer
				&:hover
					background rgba(102,204,204,.9)
				&:active
					background rgba(102,204,204,.95)
				&[disabled]
					border 1px solid #dddee1
					background #f7f7f7
					cursor not-allowed
					color #ddd
</style>