<template>
	<div class="preview fl" @mouseover="showBtn(true)" @mouseout="showBtn(false)">
		<div class="spec-img posr">
			<div class="truckPic">
				<img :src="__imgserver__ + data.frontPic" @error="errorImg" v-show="index == 0"/>
				<img :src="__imgserver__ + data.sidePic" @error="errorImg" v-show="index == 1"/>
				<img :src="__imgserver__ + data.backPic" @error="errorImg" v-show="index == 2"/>
			</div>
			<div class="Status">
				<img src="../../../static/img/attentioned.png" v-show="data.certifyStatus=='Success'"/>
				<span class="truckStatus truckStatus1" v-if="data.transStatus=='OnWay'&&data.isReturn=='Y'">运输中<b>回</b></span>
				<span class="truckStatus truckStatus2" v-else-if="data.transStatus=='OnWay'&&data.isReturn!='Y'">运输中</span>
				<span class="truckStatus truckStatus3" v-else-if="data.transStatus=='Empty'&&data.isReturn=='Y'">空车<b>回</b></span>
				<span class="truckStatus truckStatus4" v-else="data.transStatus=='Empty'&&data.isReturn!='Y'">空车</span>
				<span class="truckStatus" v-else="data.transStatus==''"></span>
			</div>
			<div class="prev" @click="prev()" v-show="isShowBtn"></div>
			<div class="next" @click="next()" v-show="isShowBtn"></div>
		</div>
		<div class="spec-list">
			<ul>
				<!-- <li v-for="(imgLi,i) in imgList" :class="{'active':index == i}">
					<img :src="imgLi.url" v-if="imgLi.url"/>
				</li> -->
				<li :class="{'active':index == 0}" @click="selectedImg(0)"><img :src="__imgserver__ + data.frontPic" @error="errorImg"/></li>
				<li :class="{'active':index == 1}" @click="selectedImg(1)"><img :src="__imgserver__ + data.sidePic" @error="errorImg"/></li>
				<li :class="{'active':index == 2}" @click="selectedImg(2)"><img :src="__imgserver__ + data.backPic" @error="errorImg"/></li>
			</ul>
		</div>
	</div>
</template>
<script>
	import {defaultImg} from '../../assets/icons'
	export default {
		props: {
			data: {
				type: Object
			}
		},
		data() {
			return {
				index: 0,
				isShowBtn: true,
				imgList: []
			}
		},
		methods: {
			next() {
				this.index++;
				if (this.index == 3) {
					this.index = 0;
				}
			},
			prev() {
				this.index--;
				if (this.index == -1) {
					this.index = 2;
				}
			},
			showBtn(bool) {
				this.isShowBtn = bool;
			},
			errorImg (e) {
                e.target.src = defaultImg
                e.target.onerror = null
            },
            selectedImg(i) {
            	this.index = i
            }
		},
		components: {
		}
	}
</script>
<style lang="stylus" scoped>
	.preview
		border 1px solid #f0f0f0
		padding 10px
		border-radius 4px
		width 342px;
		background #f6f6f6
		.spec-img
			.truckPic
				width 320px
				height 240px
				background-image url('../../assets/img/defaultImg.svg')
				background-size 100%
				border-radius 4px
				overflow hidden
				img
					width 100%
					height 100%
			.Status
				position absolute
				bottom 0
				height 38px
				padding: 10px
				width 320px
				left 0
				text-align right
				background rgba(255,255,255,.5)
				img
					margin-left 5px
				.truckStatus
					border 1px solid transparent
					border-radius 4px
					margin-left 5px
					background #fff;
					&.truckStatus1
						border-color #20a0ff
						color #20a0ff
						padding:1px 20px 1px 5px
						position relative
						b
							color #fff
							background #20a0ff
							font-style normal
							height 16px
							line-height 16px
							display inline-block
							width 16px
							text-align center
							position absolute
							font-weight normal
							right 0
							top 0
							border-radius 0 4px 4px 0
					&.truckStatus2
						border-color #20a0ff
						color #20a0ff
						padding:1px 13px
					&.truckStatus3
						border-color #6cc
						color #6cc
						padding:1px 26px 1px 11px
						position relative
						b
							color #fff
							background #6cc
							font-style normal
							height 16px
							line-height 16px
							display inline-block
							font-weight normal
							width 16px
							text-align center
							position absolute
							right 0
							top 0
							border-radius 0 4px 4px 0
					&.truckStatus4
						border-color #6cc
						color #6cc
						padding:1px 19px
		.spec-list
			height 75px
			margin-top 10px
			ul
				height 75px
				overflow hidden
				li
					width 100px
					height 75px
					float left
					opacity .5
					cursor pointer
					background-image url('../../assets/img/defaultImg.svg')
					background-size 100%
					border-radius 4px
					overflow hidden
					&:nth-child(2)
						margin 0 9px
					&.active
						opacity 1
				img
					width 100%
					height 100%
		.prev
			position absolute
			top 100px
			left 0
			width 20px
			height 60px
			background-color rgba(0, 0, 0, .3)
			cursor pointer
			border-radius 0 10px 10px 0
			&:before
				position absolute
				top 25px
				left 5px
				display block
				content ''
				width 10px
				height 10px
				border-top 3px solid #fff
				border-left 3px solid #fff
				transform rotate(-45deg)
		.next
			position absolute
			top 100px
			right 0
			width 20px
			height 60px
			background-color rgba(0, 0, 0, .3)
			cursor pointer
			border-radius 10px 0 0 10px
			&:before
				position absolute
				top 25px
				right 5px
				display block
				content ''
				width 10px
				height 10px
				border-top 3px solid #fff
				border-right 3px solid #fff
				transform rotate(45deg)
</style>