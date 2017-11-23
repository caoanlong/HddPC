<template>
	<div>			
		<div class="tit">熟车<div class="search fr">
			<SearchFilter></SearchFilter>
		</div></div>
		<div class="con">
			<div v-if="truckList.length > 0">
				<TruckList v-for="truck in truckList" :key="truck.memID" :dataDetail="truck"></TruckList>
				<div class="listFooter text-center">
					<Paging :pagecount="pagecount" :pageindex="pageIndex"></Paging>
				</div>
			</div>
			<div v-if="truckList.length == 0">
				<Empty type="noData"></Empty>
			</div>
		</div>
	</div>
</template>
<script>
	import TruckList from '../FindTruck/TruckList'
	import SearchFilter from './SearchFilter'
	import Paging from '../commonComponents/Paging'
	import Empty from '../commonComponents/Empty'
	export default {
		data() {
			return {
				total: 1,
				pageIndex: 1,
				truckList: []
			}
		},
		computed: {
			pagecount() {
				return Math.ceil(this.total/this.PAGESIZE);
			}
		},
		created() {
			this.getFleetTruckList()
		},
		methods: {
			getFleetTruckList() {
				let URL = this.__webserver__ + 'truck/fleet/findPage';
				var params = {
					focusType: 'Familiar'
					// pageSize: this.PAGESIZE,
				};
				this.$http.post(URL,params).then(
					(res) => {
						console.log(JSON.stringify(res.body.message));
						if (res.body.code == 200) {
							this.truckList = res.body.data.list;
							console.log(JSON.stringify(res.body.data.list));
						}
					},
					(res) => {
						console.log(JSON.stringify(res));
					}
				)
			},
		},
		components: {
			TruckList,
			Paging,
			SearchFilter,
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
</style>