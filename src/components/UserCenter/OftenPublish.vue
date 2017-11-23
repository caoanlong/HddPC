<template>
	<div>			
		<div class="tit">常发货源</div>
		<div class="con">
			<div v-if="oftenPublishList.length > 0">
				<div class="listItem clearfix" v-for="item in oftenPublishList">
					<div class="lineInfo fl">
						<p class="start" :title="item.areaFromBaseArea.fullName|clearComma">{{item.areaFromBaseArea.fullName|clearComma}}</p>
						<p class="end" :title="item.areaToBaseArea.fullName|clearComma">{{item.areaToBaseArea.fullName|clearComma}}</p>
					</div>
					<div class="userInfo fl">
						<p class="goods" v-text="item.cargoDesc" :title="item.cargoDesc"></p>
						<p class="vehicleInfo" v-text="item.truckDesc" :title="item.truckDesc"></p>
					</div>
					<div class="handle fr">
						<router-link tag="span" :to="{name: 'PublishInfo',query:{id:item.frequentConcernID}}" class="editBtn">修改</router-link>
						<span class="delBtn">删除</span>
					</div>
				</div>
				<div class="listFooter text-center">
					<Paging></Paging>
				</div>
			</div>
			<div v-if="oftenPublishList.length == 0">
				<Empty type="noData"></Empty>
			</div>
		</div>
	</div>
</template>
<script>
	import Paging from '../commonComponents/Paging'
	import Empty from '../commonComponents/Empty'
	export default {
		data() {
			return {
				oftenPublishList: []
			}
		},
		computed: {
			memID() {
				return this.$store.state.memberInfo.memID
			}
		},
		created() {
			this.getOftenPublishList();
		},
		methods: {
			getOftenPublishList() {
				let URL = this.__webserver__ + 'frequent/pageList';
				var params = {
					memID: this.memID
				};
				this.$http.get(URL,{params:params}).then(
					(res) => {
						if (res.body.code == 200) {
							this.oftenPublishList = res.body.data.list;
							console.log(JSON.stringify(this.oftenPublishList));
						}
					},
					(res) => {
						console.log(JSON.stringify(res));
					}
				)
			}
		},
		components: {
			Paging,
			Empty
		}
	}
</script>
<style lang="stylus" scoped>
	.tit
		color #878787
		font-weight bold
		height 40px
		line-height 40px
		padding 0 20px
		border-bottom 1px solid #f0f0f0
		font-size 14px
	.con
		padding 20px
		.listItem
			border-bottom 1px solid #f0f0f0
			padding 10px 0
			p
				height 30px
				line-height 30px
			.lineInfo
				padding 0 20px 0 10px
				width 275px
				p
					background-repeat no-repeat
					padding-left 30px
					&.start
						background-image url('../../../static/img/start_icon.png')
					&.end
						background-image url('../../../static/img/end_icon.png')
					&.pos
						background-image url('../../../static/img/pos_icon.png')
						color #afafaf
						font-size 12px
			.handle
				padding 15px 20px
				border-left 1px solid #f0f0f0
				height 60px
				span
					line-height 30px
					height 30px
					display inline-block
					padding-left 18px
					margin 0 10px
					cursor pointer
					&.editBtn
						background url('../../assets/img/edit_icon.svg') no-repeat left center
						background-size auto 50%
						color #20a0ff
					&.delBtn
						background url('../../assets/img/del_icon.svg') no-repeat left center
						background-size auto 50%
						color #ff5d44
</style>