<template>
	<div class="recommend">
		<div class="tit">推荐车辆</div>
			<div @click="linkToDetail(truck.memIDStr)" class="recommendItem" v-for="truck in TruckFieldSourceList" :key="truck.memIDStr">
				<div class="pic fl">
					<img :src="__imgserver__ + truck.headPicture" @error="errorImg"/>
				</div>
				<div class="vehicleInfo fl">
				<p><span>{{truck.realName}}</span><span>{{truck.plateNo}}</span></p>
				<p v-html="truck.truckLengthName+'&nbsp;'+truck.loads+'吨'+'&nbsp;'+truck.truckTypeName"></p>
				<!-- <p>高低平板全挂 17.5米 35吨</p> -->
				</div>
			</div>
	</div>
</template>
<script>
	import {defaultImg} from '../../assets/icons'
	export default {
		props: {
			truckStatus:{
				type: Number,
				default:3
			}
		},
		data() {
			return {
				TruckFieldSourceList: []
			}
		},
		created() {
			this.getTruckList(1)
		},
		methods: {
			getTruckList(pageNum) {
				let URL = this.__webserver__ + 'adv/truck/list'
				let params = {
					"pageSize": this.PAGESIZE,
					"pageNum": pageNum
				}
				this.$http.get(URL,{params: params}).then(
					(res) => {
						if (res.body.code == 200) {
							this.TruckFieldSourceList = res.body.data.list
							// console.log(JSON.stringify(res.body.data))
						}else if (res.body.code ==10006){
							localStorage.removeItem('memberInfo')
							localStorage.removeItem('authorization')
							this.$router.push({name:'Login'})
						}
					}
				)
			},
			linkToDetail (id) {
				this.$router.push({name: 'TruckDetail', query:{memID: id}})
			},
			errorImg (e) {
				e.target.src = defaultImg
				e.target.onerror = null
			}
		},
		components: {
		}
	}
</script>
<style lang="stylus" scoped>
	.recommend
		background #fff
		border 1px solid #f0f0f0
		border-radius 4px
		padding:20px 20px 15px
		.tit
			background url('../../../static/img/recommend_tit_icon.png') no-repeat left center
			padding-left 30px
			height 34px
			line-height 34px
			display block
			color #6cc
			font-size 14px
			font-weight bold
		.recommendItem
			padding 10px 0 10px 60px
			height 70px
			border-bottom 1px solid #f0f0f0
			position relative
			display block
			background url('../../../static/img/viewBtn_icon.png') no-repeat right center
			cursor pointer
			&.last,&:last-child
				border-bottom none                      
			p
				line-height 24px
				color #666
			.pic
				width 50px
				height 50px
				position absolute
				left 0
				top 10px
				img
					width 50px
					height 50px
					border-radius 8px
</style>